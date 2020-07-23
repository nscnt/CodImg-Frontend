import React, { useState } from 'react';
import { BlockPicker } from 'react-color';
import './App.css';

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

const generatePicker = (iterable, handler) => {
  return (
    <select onChange={(event) => handler(event.target.value)}>
      {
        iterable.map((item, index) => <option key={index} value={item}>{item}</option>)
      }
    </select>
  );
}

const CodePicker = (props) => {
  const languages = ['c', 'css', 'cpp', 'go', 'html', 'java', 'javascript', 'python', 'rust', 'typescript'];
  return generatePicker(languages, props.handler);
}

const ThemePicker = (props) => {
  const themes = ['a11y-dark', 'atom-dark', 'base16-ateliersulphurpool.light', 'cb','darcula', 'default',
    'dracula', 'duotone-dark', 'duotone-earth', 'duotone-forest', 'duotone-light',
    'duotone-sea', 'duotone-space', 'ghcolors', 'hopscotch', 'material-dark',
    'material-light', 'material-oceanic', 'nord', 'pojoaque', 'shades-of-purple',
    'synthwave84','vs','vsc-dark-plus','xonokai'
  ];
  return generatePicker(themes, props.handler);
}

const InstructionStep = (props) => {
  return (
    <div className='step'>
      <div className='step-header'>
        { props.titleText ? <p>{props.titleText}</p> : null }
      </div>
      {props.children}    
    </div>

  );
}

const CodeImage = (props) => {
  return (
    <img alt='Preview Area' src={props.queryString}></img>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.colorHandler = this.colorHandler.bind(this);
    this.themeHandler = this.themeHandler.bind(this);
    this.languageHandler = this.languageHandler.bind(this);
    this.state = {
      backgroundColor: 'ffffff',
      theme: 'a11y-dark',
      language: 'c',
      code: '',
      queryString: ''
    };
  }

  colorHandler(color) {
    this.setState({ backgroundColor: color.hex.substring(1) });
  }
  
  themeHandler(theme) {
    this.setState({ theme });
  }

  languageHandler(language) {
    this.setState({ language });
  }

  getQueryString() {
    if (this.state.code === '') return '';
    else return `https://codimg.xyz/api/image?language=${this.state.language}&backgroundColor=%23${this.state.backgroundColor}&theme=${this.state.theme}&show-background=true&code=${this.state.code}&padding=10`
  }

  render() {
    return (
      <div className='App'>
        <div className='App-body'>
          <div className='options'>
            <InstructionStep titleText='Choose a background color'>
              <ColorPicker handler={this.colorHandler}/>
            </InstructionStep>        
            <InstructionStep titleText='Select a language'>
              <CodePicker handler={this.languageHandler} />
            </InstructionStep>
            <InstructionStep titleText='Select a theme'>
              <ThemePicker handler={this.themeHandler} />
            </InstructionStep>
          </div>
          <div className='editor'>
            <InstructionStep style={{display: 'flex'}}>
              <textarea placeholder="code here..." value={this.state.code} onChange={(text) => this.setState({ code: text.target.value })} spellCheck='false' name='message'></textarea>
            </InstructionStep>
            <button id='preview-button' onClick={() => this.setState({ queryString: this.getQueryString() })}>generate preview</button>
            <InstructionStep>
              <div className='preview'>
                <CodeImage queryString={this.state.queryString} />
                { this.state.queryString === '' ? null : <p id='link-text'>embed link: {this.state.queryString}</p> }
              </div>
            </InstructionStep>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
