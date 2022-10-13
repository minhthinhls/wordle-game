export * from './keep_state';
export * from './helper';
export * from './date';
export * from './number';
export * from './converter';
export * from './core-js';
export * from './sorters';
export * from './timezone';
export * from './validator';
export * from './resources';

export function filterOption(input: string, option: any): boolean {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

/**
 ** @description - Random [Max] Inclusive.
 ** @see {@link https://futurestud.io/tutorials/generate-a-random-number-in-range-with-javascript-node-js}.
 ** @param {number} min - Minimum value on random function.
 ** @param {number} max - Maximum value on random function.
 ** @returns {number}
 **/
export const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
