import React, { useState } from "react";
import { AutoComplete as AutoCompleteAntD } from "antd";

function AutoComplete({ defaultOptions, handleSelect, defaultValue }) {
  const [options, setOptions] = useState(defaultOptions);
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const handleSearch = (searchText) => {
    setCurrentValue(searchText);
  };

  const handleBlur = () => {
    if (
      currentValue &&
      !options.some((option) => option.value === currentValue)
    ) {
      setOptions((prevOptions) => [...prevOptions, { value: currentValue }]);
    }
  };

  const handleSelectFunc = (value) => {
    setCurrentValue(value);
    console.log(options);
    handleSelect(value);
  };

  return (
    <AutoCompleteAntD
      value={currentValue}
      style={{
        width: "100%",
      }}
      options={options}
      onSelect={handleSelectFunc}
      onSearch={handleSearch}
      onBlur={handleBlur}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      placeholder="USDT"
    />
  );
}

export default AutoComplete;
