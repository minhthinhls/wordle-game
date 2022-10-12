import "./App.css";
import Board from "./Board";
import Keyboard from "./Keyboard";
import GameOver from "./Gameover";
import React, {useEffect} from "react";
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
    isGameOver: store.puzzle.isGameOver,
    attempt: store.puzzle.attempt,
    board: store.puzzle.board,
  };
});

const mapDispatchToProps = __DispatchProvider__((dispatch, actions) => {
  return {
    onKeyDown: (value: string) => dispatch(actions.Puzzle.onKeyDown(value)),
    setPuzzleWord: (value: string) => dispatch(actions.Puzzle.setPuzzleWord(value)),
    setPuzzleSeed: (value: string) => dispatch(actions.Puzzle.setPuzzleSeed(value)),
  };
});

const App: ReactFC<IProps, typeof mapStateToProps, typeof mapDispatchToProps> = function ({
  dispatch,
  history,
  location,
  ...props
}) {
  useEffect(() => {
    props.setPuzzleWord('begin');
    props.setPuzzleSeed('12345');
  }, []);

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <div className="game">
        <Board />
        {props.isGameOver ? <GameOver/> : <Keyboard/>}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App) as unknown as React.FC<IProps>;
