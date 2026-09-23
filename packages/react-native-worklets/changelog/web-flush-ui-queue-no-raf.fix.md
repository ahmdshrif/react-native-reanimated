Fall back to a timer in `flushUIQueue` when the environment has no `requestAnimationFrame`, so static rendering and SSR no longer fail.
