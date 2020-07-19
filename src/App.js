import React, { useState } from 'react';
import { BlockPicker } from 'react-color';
import Prism from 'prismjs';
import "./prism.css";
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
      <option value="grapefruit">JS</option>
      <option value="lime">CSS</option>
      <option selected value="coconut">HTML</option>
      <option value="mango">C++</option>
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
        <div className="options">
          <InstructionStep number={1} titleText="Choose a background color">
            <ColorPicker />
          </InstructionStep>        
          <InstructionStep number={2} titleText="Select a language">
            <CodePicker />
          </InstructionStep>
          <InstructionStep number={3} titleText="Select a theme">
            <CodePicker />
          </InstructionStep>
        </div>
        <div className="code-area">
          <InstructionStep number={4} titleText="Write your code">
            {/* <textarea className="text-area" name="message" rows="50" cols="30"></textarea> */}
            <pre>
  <code className="language-javascript">
  {`
    onSubmit(e) {
      e.preventDefault();
      const job = {
        title: 'Developer',
        company: 'Facebook' 
        };
      }
  `}
  </code>
</pre>
          </InstructionStep>
          
        </div>
      </div>
    </div>
  );
}

export default App;
