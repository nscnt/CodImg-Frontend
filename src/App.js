import React, { useState, useEffect } from 'react';
import { BlockPicker } from 'react-color';
import './App.css';

const ColorPicker = (props) => {
  const [color, setColor] = useState('#ffffff');
  return (
    <BlockPicker 
      triangle = "hide"
      color = {color}
      onChangeComplete={(color) => {
        document.getElementsByClassName('step')[4].style.background = color.hex;
        setColor(color);
        props.handler(color);
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

const CodeImage = (props) => {
  return (
    <img alt="Write code to make preview appear" src={`https://codimg.xyz/api/image?language=javascript&backgroundColor=%23${props.backgroundColor}&theme=hopscotch&show-background=true&code=${props.code}&padding=10`}></img>
  );
}

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [code, setCode] = useState('');
  const colorHandler = (color) => setBackgroundColor(color.hex.substring(1));
  useEffect(() => setBackgroundColor(backgroundColor), [backgroundColor]);

  return (
    <div className="App">
      <div className="App-body">
        <div className="options">
          <InstructionStep titleText="Choose a background color">
            <ColorPicker handler={colorHandler}/>
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
            <textarea value={code} onChange={(text) => setCode(text.target.value)} spellCheck="false" name="message"></textarea>
          </InstructionStep>
          <InstructionStep>
            <div className="preview">
              {/* <pre>
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
              </pre> */}
              <CodeImage backgroundColor={backgroundColor} code={code} />
            </div>
          </InstructionStep>
        </div>
      </div>
    </div>
  );
}

export default App;
