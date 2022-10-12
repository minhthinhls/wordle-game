import http from "@/utils/http";

/** Import Pre-Defined Types Helper !*/
import type {IResponse, NullableProps} from "@types";
/** Import Pre-Defined Types Helper !*/
import type {IGuessBody} from "./schema";

declare interface IGuessDailyParams extends NullableProps<{
    guess: string;
    size: number; // Default by [5].
}> {
    /* [[Interface Attributes Placeholder]] */
}

/** - Send email to reset password !*/
export function serviceDailyGuess(params: IGuessDailyParams): IResponse<IGuessBody> {
    return http.get('/daily', {
        params: params,
    });
}
