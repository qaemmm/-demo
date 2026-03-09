import { useEffect, useMemo, useState } from 'react';

function CountUpNumber({ value, duration = 700, formatter = (v) => v.toLocaleString('en-US') }) {
  const [displayValue, setDisplayValue] = useState(0);
  const target = useMemo(() => Number(value) || 0, [value]);

  useEffect(() => {
    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <span className="number-tabular">{formatter(displayValue)}</span>;
}

export default CountUpNumber;
