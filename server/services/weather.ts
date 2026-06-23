const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast'
const GEOCODE_BASE = 'https://geocoding-api.open-meteo.com/v1/search'

export interface WeatherData {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  precipitationProbability: number
  weatherCode: number
  isDay: boolean
}

export interface GeocodeResult {
  name: string
  country: string
  latitude: number
  longitude: number
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    precipitation_probability: number | null
    weather_code: number
    is_day: number
  }
}

interface GeocodeResponse {
  results: Array<{
    name: string
    country: string
    latitude: number
    longitude: number
  }>
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `${OPEN_METEO_BASE}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,is_day&timezone=auto`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }
  const data = (await response.json()) as OpenMeteoResponse
  const current = data.current

  return {
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    precipitationProbability: current.precipitation_probability ?? 0,
    weatherCode: current.weather_code,
    isDay: current.is_day === 1
  }
}

export async function searchCity(query: string): Promise<GeocodeResult[]> {
  const url = `${GEOCODE_BASE}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to search location')
  }
  const data = (await response.json()) as GeocodeResponse
  if (!data.results) return []

  return data.results.map((r) => ({
    name: r.name,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude
  }))
}