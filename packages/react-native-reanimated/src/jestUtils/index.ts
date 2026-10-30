'use strict';
import './matchers';

import type { DefaultStyle } from '../hook/commonTypes';

/*
 * Stubbed for web, where we don't use this file. The signatures match
 * `index.native.ts`, since these are the declarations TypeScript resolves for
 * `react-native-reanimated` while Jest runs the native implementation.
 */

export function withReanimatedTimer(_animationTest: () => void) {
  // NOOP
}

export function advanceAnimationByTime(_time?: number) {
  // NOOP
}

export function advanceAnimationByFrame(_count: number) {
  // NOOP
}

export function setUpTests(_userFramerateConfig = {}) {
  // NOOP
}

export function getAnimatedStyle(_component: {
  props: Record<string, unknown>;
}): DefaultStyle {
  // NOOP
  return {};
}

export { cloneWorklet, worklet } from './common';
