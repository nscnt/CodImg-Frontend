import React, { useState } from 'react';
import { BlockPicker } from 'react-color';

const ColorPicker = (props) => {
  const [color, setColor] = useState('#ffffff');
  return (
    <BlockPicker 
      triangle = 'hide'
      color = {color}
      onChangeComplete={(color) => {
        document.getElementsByClassName('step')[4].style.background = color.hex;
        setColor(color);
        props.handler(color);
      }}
    />
  );
}

export default ColorPicker;