import React, { useState } from 'react';
import { BlockPicker } from 'react-color';
import Select from 'react-select'
import './App.css';

const ColorPicker = () => {
  const [color, setColor] = useState('#ffffff');
  return (
    <BlockPicker 
      triangle = "hide"
      color = {color}
      onChangeComplete={ (color) => setColor(color) }
    />
  );
}

const CodePicker = () => {
  return (
    <select>
      <option value="grapefruit">Grapefruit</option>
      <option value="lime">Lime</option>
      <option selected value="coconut">Coconut</option>
      <option value="mango">Mango</option>
    </select>
  );
}

const InstructionStep = (props) => {
  return (
    <div className="step">
      <div className="step-header">
        <div className="circle">
          {`${props.number}`}
        </div>
        <p>{props.titleText}</p>
      </div>
      {props.children}    
    </div>

  );
}

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <InstructionStep number={1} titleText="Choose a background color">
          <ColorPicker />
        </InstructionStep>
        <InstructionStep number={2} titleText="Select a language">
          <CodePicker />
        </InstructionStep>
        <InstructionStep number={1} titleText="Choose a background color">
          <ColorPicker />
        </InstructionStep>
      </div>
    </div>
  );
}

export default App;
