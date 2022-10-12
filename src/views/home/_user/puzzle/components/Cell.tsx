import React from "react";
import {connect} from "react-redux";
import {__StorageProvider__} from '@/store';
import {__DispatchProvider__} from '@/store';

import type {ReactFC} from "@/type";

declare interface IProps extends Required<{
  /* [[Mandatory Attributes Placeholder]] */
  letter: string;
}>, Partial<{
  /* [[Optional Attributes Placeholder]] */
  resolved: "correct" | "almost" | "error";
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
  };
});

const Cell: ReactFC<IProps, typeof mapStateToProps, typeof mapDispatchToProps> = function ({
  dispatch,
  history,
  location,
  ...props
}) {
  return (
    <div className="letter" id={props.resolved}>
      {props.letter}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell) as unknown as React.FC<IProps>;
