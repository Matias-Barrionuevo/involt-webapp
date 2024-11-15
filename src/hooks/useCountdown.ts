import { useCallback, useEffect, useState } from 'react';

const defaultCountdown: number = 5;

export const useCountDown = ({
  initCountDown = defaultCountdown,
  start = true,
  callbackOnFinish = () => {},
}: {
  initCountDown?: number;
  start?: boolean;
  callbackOnFinish?: () => void;
} = {}): [number, () => void, () => void] => {
  const [countdown, setCountdown] = useState<number | null>(initCountDown);
  const resetCountdown = useCallback(
    () => setCountdown(initCountDown),
    [setCountdown, initCountDown]
  );
  const stopCountDown = () => setCountdown(null);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      if (countdown != null) {
        if (countdown > 0) {
          setCountdown((countDown) => (countDown as number) - 1);
        } else {
          callbackOnFinish();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return [countdown ?? 0, resetCountdown, stopCountDown];
};
