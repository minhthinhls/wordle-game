import http from "@/utils/http";

/** Import Pre-Defined Types Helper !*/
import type {NullableProps} from "@types";
/** Import Pre-Defined Types Helper !*/
import type {AxiosResponse} from "axios";
/** Import Pre-Defined Types Helper !*/
import type {IGuessBody} from "./schema";

declare interface IGuessRandomParams extends NullableProps<{
    guess: string;
    size: number; // Default by [5].
    seed: string | number; // Integer Values for Generate Random Words.
}> {
    /* [[Interface Attributes Placeholder]] */
}

/** - Send email to reset password !*/
export function serviceRandomGuess(params: IGuessRandomParams): Promise<AxiosResponse<IGuessBody>> {
    return http.get('/random', {
        params: params,
    });
}
