import React from "react";
import Cell from "./Cell";
import {connect} from 'react-redux';
import {__StorageProvider__} from '@/store';
import {__DispatchProvider__} from '@/store';

import type {ReactFC} from "@/type";

declare type IProps = {
  /* [[Optional Attributes Placeholder]] */
}

const mapStateToProps = __StorageProvider__((store) => {
  return {
    user: store.user,
    correctWord: store.puzzle.correctWord,
    isGameOver: store.puzzle.isGameOver,
    resolved: store.puzzle.resolved,
    attempt: store.puzzle.attempt,
    board: store.puzzle.board,
    height: store.puzzle.height,
    width: store.puzzle.width,
  };
});

const mapDispatchToProps = __DispatchProvider__((dispatch, actions) => {
  return {
    onKeyDown: (value: string) => dispatch(actions.Puzzle.onKeyDown(value)),
  };
});

const Board: ReactFC<IProps, typeof mapStateToProps, typeof mapDispatchToProps> = function ({
  dispatch,
  history,
  location,
  ...props
}) {
  return (
    <div className="board">
      {
        props.board.map((row, i) => {
          return (
            <div key={i} className="row">
              {
                row.map((cell, j) => {
                  return (<Cell key={`${i}-${j}`} letter={cell} resolved={props.resolved[i][j]}/>);
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Board) as unknown as React.FC<IProps>;
