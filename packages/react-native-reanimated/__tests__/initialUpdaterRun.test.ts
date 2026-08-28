import { withTiming } from '../src';
import {
  IN_STYLE_UPDATER,
  initialUpdaterRun,
} from '../src/animation/utilCommon';

// Mirrors a real-world trigger: a library mutating the value returned by
// `withSpring` throws when that value is a raw number instead of an animation.
function throwingUpdater(): never {
  throw new TypeError("Cannot create property 'onStart' on number '54'");
}

describe('initialUpdaterRun', () => {
  afterEach(() => {
    IN_STYLE_UPDATER.current = false;
  });

  test('returns the updater result and clears IN_STYLE_UPDATER', () => {
    expect(initialUpdaterRun(() => ({ opacity: 1 }))).toEqual({ opacity: 1 });

    expect(IN_STYLE_UPDATER.current).toBe(false);
  });

  test('clears IN_STYLE_UPDATER when the updater throws', () => {
    expect(() => initialUpdaterRun(throwingUpdater)).toThrow(TypeError);

    expect(IN_STYLE_UPDATER.current).toBe(false);
  });

  test('leaves animations working after an updater throws', () => {
    expect(() => initialUpdaterRun(throwingUpdater)).toThrow(TypeError);

    // While IN_STYLE_UPDATER is set, `defineAnimation` returns the raw starting
    // value, so a leaked flag makes every later animation a plain number.
    expect(typeof withTiming(100)).toBe('object');
  });
});
