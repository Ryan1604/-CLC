import React from 'react';
import {Text} from 'react-native';
import NumberFormat from 'react-number-format';

const Number = ({number, style, prefix}) => {
  if (prefix === 'RM ') {
    return (
      <NumberFormat
        value={number}
        thousandSeparator=","
        displayType="text"
        prefix={prefix}
        renderText={(value) => <Text style={style}>{value}</Text>}
      />
    );
  } else {
    return (
      <NumberFormat
        value={number}
        thousandSeparator="."
        decimalSeparator=","
        displayType="text"
        prefix={prefix}
        renderText={(value) => <Text style={style}>{value}</Text>}
      />
    );
  }
};

export default Number;
