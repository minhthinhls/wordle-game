import React from "react";
import {connect} from "react-redux";
import {__StorageProvider__} from '@/store';
import {__DispatchProvider__} from '@/store';

import type {ReactFC} from "@/type";

declare interface IProps extends Required<{
  /* [[Mandatory Attributes Placeholder]] */
  /** @description - Key value [a-zA-Z0-9] ~!*/
  value: string;
  disabled: boolean;
}>, Partial<{
  /* [[Optional Attributes Placeholder]] */
  isBig: boolean;
  style: object;
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

const Key: ReactFC<IProps, typeof mapStateToProps, typeof mapDispatchToProps> = function ({
  dispatch,
  history,
  location,
  value,
  isBig,
  disabled,
  ...props
}) {
  const onClick = () => {
    if (props.isGameOver) return;
    props.onKeyDown(value);
  };

  return (
    <div
      className={["key", disabled ? 'disabled' : ''].filter(Boolean).join(" ")}
      onClick={onClick}
      style={{
        ...props.style,
      }}
    >
      {value}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Key) as unknown as React.FC<IProps>;
