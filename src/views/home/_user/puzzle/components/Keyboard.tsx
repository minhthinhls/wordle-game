import React, {useCallback, useEffect} from "react";
import {connect} from "react-redux";
import {__StorageProvider__} from '@/store';
import {__DispatchProvider__} from '@/store';
import Key from "./Key";

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
    store: store,
    user: store.user,
    isGameOver: store.puzzle.isGameOver,
    resolved: store.puzzle.resolved,
    disabled: store.puzzle.disabled,
    attempt: store.puzzle.attempt,
    board: store.puzzle.board,
    seed: store.puzzle.seed,
  };
});

const mapDispatchToProps = __DispatchProvider__((dispatch, actions) => {
  return {
    onKeyDown: (value: string) => dispatch(actions.Puzzle.onKeyDown(value)),
    onEnter: actions.Puzzle.onEnter.bind(null, dispatch),
  };
});

const Keyboard: ReactFC<IProps, typeof mapStateToProps, typeof mapDispatchToProps> = function ({
  dispatch,
  history,
  location,
  ...props
}) {
  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER"],
    ["Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  /* - Since `props.store` need to fetch the latest value, do not put inside useCallback for memoization.
  const handleKeyboard = useCallback(async (event) => {
    if (event.key === "Enter") {
      return props.onEnter(props.store);
    }
    return props.onKeyDown(event.key);
  }, []);
  */
  const handleKeyboard = async (event: KeyboardEvent | any) => {
    if (event.key === "Enter") {
      return props.onEnter(props.store);
    }
    return props.onKeyDown(event.key);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      {
        keyboard.map((row, i) => {
          return (
            <div key={i} className={`line${i + 1}`}>
              {
                row.map((label, j) => {
                  if (label === "BACKSPACE") {
                    return (<Key key={`${i}-${j}`} value={label} disabled={props.disabled.has(label)} style={{width: 150}}/>);
                  }
                  if (label === "ENTER") {
                    return (<Key key={`${i}-${j}`} value={label} disabled={props.disabled.has(label)} style={{width: 100}}/>);
                  }
                  return (<Key key={`${i}-${j}`} value={label} disabled={props.disabled.has(label)}/>);
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard) as unknown as React.FC<IProps>;
