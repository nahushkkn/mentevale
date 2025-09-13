// backend/routes/api.js
const express = require('express');
const router = express.Router();

// Anthropic API endpoint
router.post('/haiku-generate', async (req, res) => {
  try {
    const { prompt, context } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Your Anthropic API key from environment variables
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
    
    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'Anthropic API key not configured' });
    }

    console.log('🤖 Calling Anthropic API for phase:', context?.currentPhase);

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `You are a wise, compassionate AI guide for storytelling circles called "mentehub". Your role is to facilitate meaningful conversations and help participants connect through shared narratives.

Context: ${JSON.stringify(context, null, 2)}

${prompt}

Please respond in a warm, inclusive tone that creates psychological safety. Keep responses under 100 words and speak directly to the circle participants.`
        }]
      })
    });

    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.text();
      console.error('❌ Anthropic API Error:', errorData);
      return res.status(anthropicResponse.status).json({ 
        error: 'Failed to generate response',
        details: errorData
      });
    }

    const data = await anthropicResponse.json();
    const aiResponse = data.content[0].text;

    // Log for debugging
    console.log('✅ Generated AI response:', aiResponse.substring(0, 100) + '...');

    res.json({
      response: aiResponse,
      metadata: {
        model: 'claude-3-haiku-20240307',
        timestamp: new Date().toISOString(),
        context: context,
        usage: data.usage
      }
    });

  } catch (error) {
    console.error('❌ API Error:', error.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'mentehub-api',
    timestamp: new Date().toISOString(),
    anthropic_configured: !!process.env.ANTHROPIC_API_KEY
  });
});

// Session analytics endpoint (for tracking API usage)
router.post('/session-analytics', (req, res) => {
  const { sessionId, event, data } = req.body;
  
  // Here you would typically log to your analytics service
  console.log('📊 Session Analytics:', { sessionId, event, data });
  
  res.json({ success: true, timestamp: new Date().toISOString() });
});

// Test endpoint to verify everything is working
router.get('/test', (req, res) => {
  res.json({
    message: 'mentehub API is working!',
    endpoints: {
      'POST /api/haiku-generate': 'Generate AI responses',
      'GET /api/health': 'Health check',
      'POST /api/session-analytics': 'Log session events'
    }
  });
});

module.exports = router;