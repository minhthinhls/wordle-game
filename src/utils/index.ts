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
