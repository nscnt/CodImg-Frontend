import React from 'react';
import { CodeSelectBox, ThemeSelectBox } from './components/selectBox';
import ColorPicker from './components/colorPicker';
import './App.css';

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
              <CodeSelectBox handler={this.languageHandler} />
            </InstructionStep>
            <InstructionStep titleText='Select a theme'>
              <ThemeSelectBox handler={this.themeHandler} />
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
