# GRL React DropDown

A flexible React dropdown component that supports both single and multiple selections with customizable styling.
[Github](https://github.com/Imsaksham0204/grl-dropdown)

## Installation

```bash
npm install grl-dropdown
```

## Usage

```jsx
import React from "react";
import GRLDropDown from "grl-dropdown";

const options = [
  { key: "1", description: "Option 1" },
  { key: "2", description: "Option 2" },
];

const App = () => {
  const handleDropdownChange = (selected) => {
    console.log(selected);
  };

  return (
    <div>
      <GRLDropDown
        label="Select an option"
        options={options}
        type="single" // or "multiple"
        onDropDownChange={handleDropdownChange}
        placeholder="Choose..."
      />
    </div>
  );
};

export default App;
```

## Props

| Prop                   | Type         | Required | Default        | Description                               |
| ---------------------- | ------------ | -------- | -------------- | ----------------------------------------- |
| label                  | string       | Yes      | -              | Label text for the dropdown               |
| options                | array        | Yes      | -              | Array of objects with key and description |
| type                   | string       | Yes      | -              | 'single' or 'multiple'                    |
| onDropDownChange       | function     | Yes      | -              | Callback function when selection changes  |
| placeholder            | string       | No       | 'Select items' | Placeholder text                          |
| labelStyles            | object       | No       | {}             | Custom styles for label                   |
| dropdownStyles         | object       | No       | {}             | Custom styles for dropdown                |
| containerStyles        | object       | No       | {}             | Custom styles for container               |
| multipleDropdownStyles | object       | No       | {}             | Custom styles for multiple dropdown       |
| checkboxListStyles     | object       | No       | {}             | Custom styles for checkbox list           |
| checkboxItemStyles     | object       | No       | {}             | Custom styles for checkbox items          |
| initialValue           | object/array | No       | -              | Initial selected value(s)                 |
