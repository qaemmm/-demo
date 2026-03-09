import { useState } from 'react';

function randomDelay(min = 1000, max = 1500) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useLoading() {
  const [loading, setLoading] = useState(false);

  const withLoading = async (callback, options = {}) => {
    const { min = 1000, max = 1500 } = options;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, randomDelay(min, max)));
    let result;
    if (typeof callback === 'function') {
      result = await callback();
    }
    setLoading(false);
    return result;
  };

  return { loading, withLoading, setLoading };
}
