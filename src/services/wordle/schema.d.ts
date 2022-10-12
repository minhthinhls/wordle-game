export enum VALIDATION {
    ABSENT = "absent",
    PRESENT = "present",
    CORRECT = "correct",
}

/**
 ** - Customized Wrapper for Axios Response.
 ** @see {@link https://axios-http.com/docs/res_schema}
 **/
export declare type IGuessBody = {
    slot: number;
    guess: string;
    result: VALIDATION;
};
