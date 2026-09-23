import { runOnUIAsync, scheduleOnUI } from 'react-native-worklets';

async function waitForUIQueueFlush(): Promise<void> {
  await Promise.resolve();
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
}

describe('web threads implementation', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('executes the rest of the batch when a callback throws', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('boom');
    const calls: string[] = [];

    scheduleOnUI(() => {
      calls.push('first');
    });
    scheduleOnUI(() => {
      throw error;
    });
    scheduleOnUI(() => {
      calls.push('third');
    });
    await waitForUIQueueFlush();

    expect(calls).toEqual(['first', 'third']);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });

  test('flushes the queue in an environment without requestAnimationFrame', async () => {
    // Static rendering and SSR evaluate the web bundle in Node, which has no
    // `requestAnimationFrame`.
    const requestAnimationFrameSpy = jest
      .spyOn(globalThis, 'requestAnimationFrame')
      .mockImplementation(undefined as never);
    // @ts-expect-error The property is not optional in the type definitions.
    delete globalThis.requestAnimationFrame;
    const calls: string[] = [];

    try {
      scheduleOnUI(() => {
        calls.push('ran');
      });
      await waitForUIQueueFlush();
    } finally {
      requestAnimationFrameSpy.mockRestore();
    }

    expect(calls).toEqual(['ran']);
  });

  test('resolves promises returned by runOnUIAsync', async () => {
    await expect(
      runOnUIAsync((a: number, b: number) => a + b, 2, 3)
    ).resolves.toBe(5);
  });

  test('rejects promises returned by runOnUIAsync', async () => {
    const error = new Error('boom');
    await expect(
      runOnUIAsync(() => {
        throw error;
      })
    ).rejects.toBe(error);
  });
});
