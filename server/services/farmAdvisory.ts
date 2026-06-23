import { WeatherData } from './weather'

export interface FarmAdvisory {
  sprayAdvice: string
  irrigationAdvice: string
  sowingAdvice: string
  alert: string | null
}

export function generateAdvisory(weather: WeatherData): FarmAdvisory {
  const { temperature, windSpeed, precipitationProbability, humidity } = weather

  let sprayAdvice = 'Conditions are favorable for spraying pesticide or fertilizer.'
  if (windSpeed > 15) {
    sprayAdvice = 'Wind speed is high — avoid spraying today, drift risk is significant.'
  } else if (precipitationProbability > 50) {
    sprayAdvice = 'Rain is likely — delay spraying, it will wash off before absorption.'
  }

  let irrigationAdvice = 'Soil moisture should be checked manually before watering.'
  if (precipitationProbability > 60) {
    irrigationAdvice = 'Rain is expected — skip irrigation today.'
  } else if (temperature > 32 && humidity < 40) {
    irrigationAdvice = 'Hot and dry conditions — increase irrigation frequency.'
  }

  let sowingAdvice = 'Conditions are stable for sowing most crops.'
  if (precipitationProbability > 70) {
    sowingAdvice = 'Heavy rain expected — postpone sowing to avoid seed wash-out.'
  } else if (temperature < 10) {
    sowingAdvice = 'Low temperature — only sow cold-tolerant crop varieties.'
  }

  let alert: string | null = null
  if (windSpeed > 30) {
    alert = 'Strong wind warning — secure greenhouse covers and young plants.'
  } else if (precipitationProbability > 80) {
    alert = 'Heavy rainfall expected — check drainage to prevent waterlogging.'
  }

  return { sprayAdvice, irrigationAdvice, sowingAdvice, alert }
}
