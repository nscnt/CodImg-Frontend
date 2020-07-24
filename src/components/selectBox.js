import React from 'react';
import Select from 'react-select';

const generateSelect = (iterable, handler, placeholder) => {
  const customStyles = {
  option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#121212" : state.isSelected ? "white" : "#121212",
      backgroundColor: state.isFocused ? '#eee' : state.isSelected ? "#121212" : "",
      cursor: "pointer"
    }),
    container: base => ({
      ...base,
      width: "100%"
    }),
    control: base => ({
      ...base,
    }),
    valueContainer: base => ({
      ...base,
      padding: 0,
    })
  };

  const reactSelectProps = iterable.map((item) => ({ value: item, label: item }));
  return (
    <Select 
    options={reactSelectProps}
    className="select-box"
    styles={customStyles}
    placeholder={placeholder}
    onChange={(item) => handler(item.value)}
    menuPlacement="auto" 
    isSearchable
    />
  );
}
  
const CodeSelectBox = (props) => {
  const languages = ['c', 'css', 'cpp', 'go', 'html', 'java', 'javascript', 'python', 'rust', 'typescript'];
  return generateSelect(languages, props.handler, 'select language');
}
  
const ThemeSelectBox = (props) => {
  const themes = ['a11y-dark', 'atom-dark', 'base16-ateliersulphurpool.light', 'cb','darcula', 'default',
    'dracula', 'duotone-dark', 'duotone-earth', 'duotone-forest', 'duotone-light',
    'duotone-sea', 'duotone-space', 'ghcolors', 'hopscotch', 'material-dark',
    'material-light', 'material-oceanic', 'nord', 'pojoaque', 'shades-of-purple',
    'synthwave84','vs','vsc-dark-plus','xonokai'
  ];
  return generateSelect(themes, props.handler, 'select theme');
}

export {
  CodeSelectBox,
  ThemeSelectBox
}

