import {default as _UseKeepStateHook} from "use-keep-state";

declare type RestArgumentTypes<F extends Function> = F extends (_1stArg: any, ...args: infer A) => any ? A : never;

export function useKeepState<IState>(
    initState: IState,
    ...args: RestArgumentTypes<typeof _UseKeepStateHook>
): [
    IState,
    (args: Partial<IState>) => void,
    (namespace?: string) => void,
] {
    const hook = _UseKeepStateHook(initState, ...args);
    const x = hook[0] as IState;
    const y = hook[1] as (args: Partial<IState>) => void;
    const z = hook[2] as (namespace?: string) => void;
    return [x, y, z] as [IState, (args: Partial<IState>) => void, (namespace?: string) => void];
}
