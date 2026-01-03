const request = require('supertest');

// Mock @google/genai to avoid network calls
jest.mock('@google/genai', () => {
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      chats: {
        create: () => ({
          sendMessage: jest.fn().mockResolvedValue({ text: 'Hello from AI' })
        })
      }
    }))
  };
});

const app = require('../index');

describe('AI Chat API', () => {
  beforeEach(() => {
    // Ensure API_KEY is set for tests
    process.env.API_KEY = 'test-key';
  });

  test('returns 400 when message not provided', async () => {
    const res = await request(app).post('/api/ai-chat').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Message is required');
  });

  test('returns text from mocked AI', async () => {
    const res = await request(app).post('/api/ai-chat').send({ message: 'Hello' });
    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe('Hello from AI');
  });

  test('rate limits after max requests per window', async () => {
    // send AI_MAX_PER_WINDOW + 1 requests
    const max = 11; // server limit is 10 per minute
    let lastRes;
    for (let i = 0; i < max; i++) {
      lastRes = await request(app).post('/api/ai-chat').send({ message: `m ${i}` });
    }
    expect(lastRes.statusCode).toBe(429);
    expect(lastRes.body.error).toMatch(/Rate limit/);
  });
});