import { Router } from 'express'
import { fetchWeather, searchCity } from '../services/weather'
import { generateAdvisory } from '../services/farmAdvisory'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat as string)
    const lon = parseFloat(req.query.lon as string)

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: 'lat and lon query params are required' })
    }

    const weather = await fetchWeather(lat, lon)
    const advisory = generateAdvisory(weather)

    res.json({ weather, advisory })
  } catch (err) {
    console.error('Weather fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
})

router.get('/search', async (req, res) => {
  try {
    const query = req.query.city as string

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ error: 'city query param is required' })
    }

    const results = await searchCity(query)
    res.json({ results })
  } catch (err) {
    console.error('City search error:', err)
    res.status(500).json({ error: 'Failed to search city' })
  }
})

export default router
