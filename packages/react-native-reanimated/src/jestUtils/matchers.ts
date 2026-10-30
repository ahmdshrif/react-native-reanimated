/* eslint-disable @typescript-eslint/no-namespace */
'use strict';

export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAnimatedStyle(
        style: Record<string, unknown>[] | Record<string, unknown>,
        config?: {
          shouldMatchAllProps?: boolean;
        }
      ): R;
      toHaveAnimatedProps(props: Record<string, unknown>): R;
    }
  }
}
