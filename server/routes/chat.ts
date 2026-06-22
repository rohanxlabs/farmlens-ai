import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body

    const messages = [
      {
        role: 'system',
        content: `You are an expert AI Farm Advisor with deep knowledge of crop diseases, soil health, irrigation, seasonal farming, pest control, and organic/conventional farming practices.

Keep responses concise (2-4 sentences), practical, and farmer-friendly.

Always give actionable advice.`
      },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'FarmLens AI'
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          messages,
          max_tokens: 300
        })
      }
    )

    const data = (await response.json()) as {
      choices?: { message: { content: string } }[]
      error?: { message: string }
    }

    if (!response.ok) {
      console.error('OpenRouter Error:', data)

      return res.status(response.status).json({
        error: data.error?.message || 'OpenRouter request failed'
      })
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      'Sorry, I could not generate a response.'

    res.json({ reply })
  } catch (err) {
    console.error('Chat error:', err)

    res.status(500).json({
      error: 'Chat failed'
    })
  }
})

export default router