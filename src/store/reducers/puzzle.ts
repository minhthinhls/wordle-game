import {VALIDATION} from "@/services/wordle";

declare interface IPuzzleState extends Required<{
    /* [[Mandatory Attributes Placeholder]] */
    isGameOver: boolean;
    correctWord: string;
    board: Array<Array<string>>;
    // Table storing all resolved characters.
    resolved: Array<Array<"correct" | "almost" | "error">>;
    // All characters that been failed.
    disabled: Set<string>;
    // The pointer to insert and delete character.
    currPointer: number;
    // Max try amount.
    height: number;
    // Word length.
    width: number;
    // Current try.
    attempt: number;
    // Random seed to generate random word.
    seed: string | number;
    // Game result.
    win: boolean;
}>, Partial<{
    /* [[Optional Attributes Placeholder]] */
}> {
    /* [[Default Attributes Placeholder]] */
}

const initialState: IPuzzleState = {
    isGameOver: false,
    correctWord: '',
    currPointer: 0,
    board: Array.from({length: 6}).map(() => new Array(5).fill('')),
    resolved: Array.from({length: 6}).map(() => new Array(5).fill('')),
    disabled: new Set(),
    height: 6,
    width: 5,
    attempt: 0,
    seed: 0,
    win: false,
};

function puzzle(state = initialState, action: any): IPuzzleState {
    if (action.type === "RESET_PUZZLE") {
        return initialState;
    }
    if (action.type === "SET_PUZZLE_WORD") {
        return {
            ...state,
            correctWord: action.word,
        };
    }
    if (action.type === "SET_PUZZLE_SEED") {
        state.seed = action.seed;
        return {
            ...state,
            seed: action.seed,
        };
    }
    state.correctWord = state.correctWord.toUpperCase();
    const currRow = state.board[state.attempt];
    switch (action.type.toUpperCase()) {
        case 'ENTER':
            if (!currRow[currRow.length - 1]) {
                return state; // Not yet input all character.
            }
            /*
            if (state.correctWord === currRow.join("")) {
                return {
                    ...state,
                    isGameOver: true,
                    win: true,
                };
            }
            */
            if (state.attempt === state.height - 1) {
                return {
                    ...state,
                    correctWord: '',
                    isGameOver: true,
                    win: false,
                };
            }

            /*
            for (let i = 0; i < state.correctWord.length; i++) {
                const char = state.correctWord[i].toUpperCase();
                const cell = state.board[state.attempt][i];
                if (char === cell) {
                    state.resolved[state.attempt][i] = "correct";
                } else if (state.correctWord.includes(cell)) {
                    state.resolved[state.attempt][i] = "almost";
                } else {
                    state.resolved[state.attempt][i] = "error";
                    state.disabled.add(cell);
                }
            }
            */

            for (let i = 0; i < action.comparators.length; i++) {
                const comparator = action.comparators[i];
                const validator = comparator.result;
                if (validator === VALIDATION.CORRECT) {
                    state.resolved[state.attempt][i] = "correct";
                } else if (validator === VALIDATION.PRESENT) {
                    state.resolved[state.attempt][i] = "almost";
                } else if (validator === VALIDATION.ABSENT) {
                    state.resolved[state.attempt][i] = "error";
                    state.disabled.add(comparator.guess.toUpperCase());
                }
            }

            /* - For testing purposes.
            action.comparators.forEach((compare: any) => {
                compare.result = 'correct';
            });
            */

            if (action.comparators.every((compare: any) => compare.result === 'correct')) {
                return {
                    ...state,
                    correctWord: action.comparators.map((compare: any) => compare.guess).join("").toUpperCase(),
                    isGameOver: true,
                    win: true,
                };
            }

            return {
                ...state,
                currPointer: 0,
                attempt: state.attempt + 1,
            };

        case 'BACKSPACE':
            if (state.currPointer < 1) {
                return state; // Not yet input any character.
            }

            state.board[state.attempt][state.currPointer - 1] = '';

            return {
                ...state,
                board: [...state.board],
                currPointer: state.currPointer - 1,
            };

        /** @description - Handle other characters [A-Z] ~!*/
        default:
            const keyDown = action.type.toUpperCase();
            if (!/^[A-Z]$/g.test(keyDown)) {
                return state;
            }
            if (state.disabled.has(keyDown)) {
                return state;
            }
            if (state.currPointer >= state.width) {
                return state;
            }

            state.board[state.attempt][state.currPointer] = keyDown;

            return {
                ...state,
                board: [...state.board],
                currPointer: state.currPointer + 1,
            };
    }
}

export default puzzle;
