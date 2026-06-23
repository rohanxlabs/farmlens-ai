import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'

interface WeatherData {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  precipitationProbability: number
  weatherCode: number
  isDay: boolean
}

interface FarmAdvisory {
  sprayAdvice: string
  irrigationAdvice: string
  sowingAdvice: string
  alert: string | null
}

interface CityResult {
  name: string
  country: string
  latitude: number
  longitude: number
}

function weatherEmoji(code: number, isDay: boolean): string {
  if (code === 0) return isDay ? '☀️' : '🌙'
  if (code <= 3) return '⛅'
  if (code <= 49) return '🌫️'
  if (code <= 69) return '🌧️'
  if (code <= 79) return '🌨️'
  if (code <= 99) return '⛈️'
  return '🌤️'
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [advisory, setAdvisory] = useState<FarmAdvisory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cityQuery, setCityQuery] = useState('')
  const [cityResults, setCityResults] = useState<CityResult[]>([])

  const loadWeather = async (lat: number, lon: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      if (!res.ok) throw new Error('Weather request failed')
      const data = await res.json()
      setWeather(data.weather)
      setAdvisory(data.advisory)
    } catch {
      setError('Could not load weather. Try searching your city below.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Location not supported. Search your city below.')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      pos => loadWeather(pos.coords.latitude, pos.coords.longitude),
      () => {
        setError('Location permission denied. Search your city below.')
        setLoading(false)
      },
      { timeout: 8000 }
    )
  }, [])

  const handleCitySearch = async () => {
    if (cityQuery.trim().length < 2) return
    try {
      const res = await fetch(`/api/weather/search?city=${encodeURIComponent(cityQuery)}`)
      const data = await res.json()
      setCityResults(data.results || [])
    } catch {
      setCityResults([])
    }
  }

  const selectCity = (city: CityResult) => {
    setCityResults([])
    setCityQuery(city.name)
    loadWeather(city.latitude, city.longitude)
  }

  if (loading) {
    return (
      <div style={cardStyle}>
        <p style={{ color: 'rgba(240,253,244,0.5)', fontSize: '13px', margin: 0 }}>
          Loading weather...
        </p>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      {weather && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '36px' }}>
            {weatherEmoji(weather.weatherCode, weather.isDay)}
          </span>
          <div>
            <p style={{ color: '#F0FDF4', fontSize: '24px', fontWeight: 700, margin: 0 }}>
              {Math.round(weather.temperature)}°C
            </p>
            <p style={{ color: 'rgba(240,253,244,0.5)', fontSize: '12px', margin: '2px 0 0' }}>
              Feels like {Math.round(weather.feelsLike)}° · {weather.humidity}% humidity · {Math.round(weather.windSpeed)} km/h wind
            </p>
          </div>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '12px' }}>
          <p style={{ color: 'rgba(240,253,244,0.5)', fontSize: '12px', margin: '0 0 8px' }}>
            {error}
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={cityQuery}
              onChange={e => setCityQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCitySearch()}
              placeholder="Enter city name"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(74,222,128,0.25)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#F0FDF4',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleCitySearch}
              style={{
                background: 'rgba(74,222,128,0.15)',
                border: '1px solid rgba(74,222,128,0.3)',
                color: '#4ADE80',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </div>
          {cityResults.length > 0 && (
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {cityResults.map((city, i) => (
                <button
                  key={i}
                  onClick={() => selectCity(city)}
                  style={{
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(240,253,244,0.7)',
                    fontSize: '13px',
                    padding: '6px 8px',
                    cursor: 'pointer',
                    borderRadius: '6px'
                  }}
                >
                  {city.name}, {city.country}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {advisory && (
        <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {advisory.alert && (
            <p style={{ color: '#FCA5A5', fontSize: '12px', fontWeight: 600, margin: 0 }}>
              ⚠️ {advisory.alert}
            </p>
          )}
          <p style={{ color: 'rgba(240,253,244,0.7)', fontSize: '12px', margin: 0 }}>
            🌾 Spray: {advisory.sprayAdvice}
          </p>
          <p style={{ color: 'rgba(240,253,244,0.7)', fontSize: '12px', margin: 0 }}>
            💧 Irrigation: {advisory.irrigationAdvice}
          </p>
          <p style={{ color: 'rgba(240,253,244,0.7)', fontSize: '12px', margin: 0 }}>
            🌱 Sowing: {advisory.sowingAdvice}
          </p>
        </div>
      )}
    </div>
  )
}

const cardStyle: CSSProperties = {
  background: 'rgba(6,10,6,0.85)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(74,222,128,0.25)',
  borderRadius: '16px',
  padding: '18px 20px',
  marginBottom: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,222,128,0.1)'
}
