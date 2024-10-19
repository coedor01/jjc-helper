import { useState } from "react";

function useDebounce(
  callback: (event: React.ChangeEvent<HTMLInputElement>) => void,
  delay: number
) {
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = window.setTimeout(() => {
      callback(event);
    }, delay);

    setTimeoutId(newTimeoutId);
  };
}

export default useDebounce;
