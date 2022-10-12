import http from "@/utils/http";

/** Import Pre-Defined Types Helper !*/
import type {NullableProps} from "@types";
/** Import Pre-Defined Types Helper !*/
import type {AxiosResponse} from "axios";
/** Import Pre-Defined Types Helper !*/
import type {IGuessBody} from "./schema";

declare interface IGuessWordParams extends NullableProps<{
    guess: string;
    word: string; // Custom Gaming Words.
}> {
    /* [[Interface Attributes Placeholder]] */
}

/** - Send email to reset password !*/
export function serviceWordGuess(params: IGuessWordParams): Promise<AxiosResponse<IGuessBody>> {
    const {word, ...rest} = params;
    return http.get(`/word/${word}`, {
        params: rest,
    });
}
