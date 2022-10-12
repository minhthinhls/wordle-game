import {serviceRandomGuess} from "@/services";

import type {Dispatch} from "redux";

export function onKeyDown(button: string) {
    return {
        type: button,
    };
}

export function onKeyEnter(comparators: Awaited<ReturnType<typeof serviceRandomGuess>>['data']) {
    return {
        type: "ENTER",
        comparators: comparators,
    };
}

export function setPuzzleWord(word: string) {
    return {
        type: 'SET_PUZZLE_WORD',
        word: word,
    };
}

export function setPuzzleSeed(seed: string) {
    return {
        type: 'SET_PUZZLE_SEED',
        seed: seed,
    };
}

export function resetPuzzle() {
    return {
        type: 'RESET_PUZZLE',
    };
}

import __RootReducer__ from '../reducers';

/**
 ** @description - Dynamically Checking Enter Events with Asynchronous actions.
 **/
export async function onEnter(dispatch: Dispatch, storage: ReturnType<typeof __RootReducer__>) {
    const currRow = storage.puzzle.board[storage.puzzle.attempt];
    if (!currRow[currRow.length - 1]) {
        return void 0; // Not yet input all character.
    }
    const {data: comparators} = await serviceRandomGuess({
        guess: storage.puzzle.board[storage.puzzle.attempt].join(""),
        seed: storage.puzzle.seed,
        size: storage.puzzle.width,
    });
    return dispatch(onKeyEnter(comparators));
}
