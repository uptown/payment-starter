function asyncOnce<T, V extends any[] = []>(
  loader: (...args: V) => Promise<T>,
  interval = 50,
): (...args: V) => Promise<T> {
  async function wrappedFunction(...args: V): Promise<T> {
    if (wrappedFunction.isExecuted) {
      return wrappedFunction.instance;
    }
    if (wrappedFunction.isLoading) {
      return new Promise<T>((resolve, reject) => {
        const timer = setInterval(() => {
          if (wrappedFunction.instance) {
            clearInterval(timer);
            resolve(wrappedFunction.instance);
          } else if (wrappedFunction.error) {
            clearInterval(timer);
            reject(wrappedFunction.error);
          }
        }, interval);
      });
    }
    wrappedFunction.isLoading = true;
    try {
      wrappedFunction.instance = await loader(...args);
      wrappedFunction.isExecuted = true;
      wrappedFunction.isLoading = false;
    } catch (e) {
      wrappedFunction.isLoading = false;
      wrappedFunction.error = e;
      throw e;
    }
    return wrappedFunction.instance;
  }

  wrappedFunction.isLoading = false;
  wrappedFunction.isExecuted = false;
  wrappedFunction.instance = undefined as any;
  wrappedFunction.error = undefined as any;
  return wrappedFunction;
}

export default asyncOnce;
