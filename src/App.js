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
      onChangeComplete={(color) => {
        document.getElementsByClassName('step')[4].style.background = color.hex;
        setColor(color);
      }}
    />
  );
}

const CodePicker = () => {
  return (
    <select>
      <option selected value="js">JS</option>
      <option value="css">CSS</option>
      <option value="html">HTML</option>
      <option value="c++">C++</option>
    </select>
  );
}

const ThemePicker = () => {
  return (
    <select>
      <option selected value="monokai">Monokai</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
}

const InstructionStep = (props) => {
  return (
    <div className="step">
      <div className="step-header">
        { props.titleText ? <p>{props.titleText}</p> : null }
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
          <InstructionStep titleText="Choose a background color">
            <ColorPicker />
          </InstructionStep>        
          <InstructionStep titleText="Select a language">
            <CodePicker />
          </InstructionStep>
          <InstructionStep titleText="Select a theme">
            <ThemePicker />
          </InstructionStep>
        </div>
        <div className="editor">
          <InstructionStep style={{display: 'flex'}}>
            <textarea spellCheck="false" name="message"></textarea>
          </InstructionStep>
          <InstructionStep>
            <div className="preview">
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
            </div>
          </InstructionStep>
        </div>
      </div>
    </div>
  );
}

export default App;
