import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { buildPetCompatibilityPrompt } from '@/lib/prompts';

const client = new Anthropic();

const bodySchema = {
  validate(body: unknown): body is {
    mbti: string; lifestyle: string[];
    petType: 'dog' | 'cat' | 'any';
    mode: 'current' | 'recommend';
    breed?: string;
  } {
    if (!body || typeof body !== 'object') return false;
    const b = body as Record<string, unknown>;
    if (typeof b.mbti !== 'string') return false;
    if (!Array.isArray(b.lifestyle) || b.lifestyle.length < 5) return false;
    if (!['dog', 'cat', 'any'].includes(b.petType as string)) return false;
    if (!['current', 'recommend'].includes(b.mode as string)) return false;
    return true;
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!bodySchema.validate(body)) {
      return NextResponse.json({ error: '입력값이 올바르지 않습니다.' }, { status: 400 });
    }

    const { system, user } = buildPetCompatibilityPrompt({
      mbti: body.mbti as Parameters<typeof buildPetCompatibilityPrompt>[0]['mbti'],
      lifestyle: body.lifestyle,
      petType: body.petType,
      mode: body.mode,
      breed: body.breed,
    });

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2048,
      system,
      messages: [{ role: 'user', content: user }],
    });

    const textBlock = message.content.find((c) => c.type === 'text');
    const raw = textBlock?.type === 'text' ? textBlock.text : '{}';

    // Strip markdown fences if present
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
