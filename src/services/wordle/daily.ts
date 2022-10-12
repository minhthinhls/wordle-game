import http from "@/utils/http";

/** Import Pre-Defined Types Helper !*/
import type {NullableProps} from "@types";
/** Import Pre-Defined Types Helper !*/
import type {AxiosResponse} from "axios";
/** Import Pre-Defined Types Helper !*/
import type {IGuessBody} from "./schema";

declare interface IGuessDailyParams extends NullableProps<{
    guess: string;
    size: number; // Default by [5].
}> {
    /* [[Interface Attributes Placeholder]] */
}

/** - Send email to reset password !*/
export function serviceDailyGuess(params: IGuessDailyParams): Promise<AxiosResponse<IGuessBody>> {
    return http.get('/daily', {
        params: params,
    });
}
