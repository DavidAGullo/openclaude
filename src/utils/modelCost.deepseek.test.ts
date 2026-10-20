import { expect, test } from 'bun:test'
import type { BetaUsage as Usage } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import { calculateUSDCost } from './modelCost.js'

const usage = {
  input_tokens: 1_000_000,
  output_tokens: 1_000_000,
  cache_read_input_tokens: 1_000_000,
  cache_creation_input_tokens: 0,
} as Usage

test('deepseek-v4-flash uses DeepSeek pricing, not the unknown-model default', () => {
  expect(calculateUSDCost('deepseek-v4-flash', usage)).toBeCloseTo(0.3 + 1.2 + 0.006)
})

test('deepseek-v4-pro uses DeepSeek pricing', () => {
  expect(calculateUSDCost('deepseek-v4-pro', usage)).toBeCloseTo(1.32 + 3.96 + 0.044)
})
