import useCreation from './useCreation';
import {debounce} from 'lodash';
import {useRef} from 'react';

interface IDebounceOptions {
    wait?: number;
    leading?: boolean;
    trailing?: boolean;
}

declare type ArrowFunc = (...args: any) => any;

function useDebounceFn<T extends ArrowFunc = ArrowFunc>(fn: T, options?: IDebounceOptions): {
    run: T,
    cancel: () => void,
    flush: () => ReturnType<T> | undefined
} {
    const fnRef = useRef<T>(fn);
    fnRef.current = fn;

    const wait = options?.wait ?? 1000;

    const debounced = useCreation(
        () =>
            debounce<T>(
                ((...args: any[]) => {
                    return fnRef.current(...args);
                }) as T,
                wait,
                options,
            ),
        [],
    );

    return {
        run: (debounced as unknown) as T,
        cancel: debounced.cancel,
        flush: debounced.flush,
    };
}

export default useDebounceFn;
