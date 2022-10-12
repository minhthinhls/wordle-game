declare type ReverseMap<T extends Record<keyof T, any>> = {
    [V in T[keyof T]]: {
        [K in keyof T]: T[K] extends V ? K : never;
    }[keyof T];
};

export type ObjectValues<Map> = keyof ReverseMap<Map>;
