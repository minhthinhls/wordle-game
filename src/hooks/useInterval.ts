import {useState, useEffect, useRef} from 'react';

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);
    const [countDown, setCountDown] = useState(0);

    // Remember the latest callback if it changes.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        if (delay === null) {
            return;
        }

        setCountDown(Math.ceil(delay / 1000));

        const id = setInterval(() => {
            savedCallback.current();
            setCountDown(Math.ceil(delay / 1000));
        }, delay);

        const id2 = setInterval(() => {
            setCountDown(prevStep => prevStep - 1);
        }, 1000);

        return () => {
            clearInterval(id);
            clearInterval(id2);
        };
    }, [delay]);

    return [countDown];
}

export default useInterval;
