import { describe, expect, test } from 'tstyche';

import {
  advanceAnimationByFrame,
  advanceAnimationByTime,
  getAnimatedStyle,
  setUpTests,
  withReanimatedTimer,
} from '..';
import type { DefaultStyle } from '../src/hook/commonTypes';

declare const component: { props: Record<string, unknown> };
declare const matchers: jest.Matchers<void>;

describe('jestUtils', () => {
  test('`getAnimatedStyle` returns the style of a component', () => {
    expect(getAnimatedStyle(component)).type.toBe<DefaultStyle>();
  });

  test('the timer helpers accept their arguments', () => {
    expect(setUpTests).type.toBeCallableWith({ fps: 30 });
    expect(withReanimatedTimer).type.toBeCallableWith(() => {});
    expect(advanceAnimationByTime).type.toBeCallableWith(16);
    expect(advanceAnimationByFrame).type.toBeCallableWith(1);
  });

  test('the `toHaveAnimatedStyle` and `toHaveAnimatedProps` matchers are declared', () => {
    expect(matchers.toHaveAnimatedStyle).type.toBeCallableWith(
      { opacity: 1 },
      { shouldMatchAllProps: true }
    );
    expect(matchers.toHaveAnimatedProps).type.toBeCallableWith({ text: 'a' });
  });
});
