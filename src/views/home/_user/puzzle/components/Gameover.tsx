import React from "react";
import {__StorageProvider__} from '@/store';
import {__DispatchProvider__} from '@/store';
import {connect} from "react-redux";

import type {ReactFC} from "@/type";

declare interface IProps extends Required<{
  /* [[Mandatory Attributes Placeholder]] */
}>, Partial<{
  /* [[Optional Attributes Placeholder]] */
}> {
  /* [[Default Attributes Placeholder]] */
}

const mapStateToProps = __StorageProvider__((store) => {
  return {
    correctWord: store.puzzle.correctWord,
    isGameOver: store.puzzle.isGameOver,
    attempt: store.puzzle.attempt,
    board: store.puzzle.board,
    win: store.puzzle.win,
  };
});

const mapDispatchToProps = __DispatchProvider__((dispatch, actions) => {
  return {
    onKeyDown: (value: string) => dispatch(actions.Puzzle.onKeyDown(value)),
  };
});

const GameOver: ReactFC<IProps, typeof mapStateToProps, typeof mapDispatchToProps> = function ({
  dispatch,
  history,
  location,
  ...props
}) {
  return (
    <div className="game">
      <h3 className="white">
        {props.win
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h3>
      <h1 className="white">Correct Word: {props.correctWord}</h1>
      <h3 className="white">You guessed in {props.attempt} attempts</h3>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOver) as unknown as React.FC<IProps>;
