import React, {ChangeEvent} from 'react';
import {Input, Tooltip} from 'antd';
import {formatNumber} from "@/utils";

const NumericInput: React.FC<any> = function (props) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const NumericRegExp = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(Number(value)) && NumericRegExp.test(value)) || value === '' || value === '-') {
      props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  const onBlur = () => {
    const {value, onBlur, onChange} = props;
    let valueTemp = value;
    if (!value) return;
    const valueString = value.toString();
    if (valueString.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = valueString.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    if (onBlur) {
      onBlur();
    }
  };

  const {value} = props;
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
  ) : (
    'Input a number'
  );

  return (
    <Tooltip
      trigger={['focus']}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={25}
      />
    </Tooltip>
  );
};

export default NumericInput;
