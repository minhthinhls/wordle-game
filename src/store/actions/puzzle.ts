export function onKeyDown(button: string) {
    return {
        type: button,
    };
}

export function setPuzzleWord(word: string) {
    return {
        type: 'SET_PUZZLE_WORD',
        word: word,
    };
}

export function resetPuzzle() {
    return {
        type: 'RESET_PUZZLE',
    };
}
