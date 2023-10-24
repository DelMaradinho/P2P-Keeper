import React, { useState } from "react";
import { AutoComplete as AutoCompleteAntD } from "antd";
import { cryptoCurrencies } from "../../constants/constants";

function AutoComplete({
  defaultOptions,
  handleSelect,
  defaultValue,
  ref,
  dropdownRef,
}) {
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
      cryptoCurrencies.push({ value: currentValue });
    }
  };

  const handleSelectFunc = (value) => {
    setCurrentValue(value);
    console.log(options);
    handleSelect(value);
  };

  return (
    <AutoCompleteAntD
      ref={ref}
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
      dropdownRender={(menu) => <div ref={dropdownRef}>{menu}</div>}
    />
  );
}

export default AutoComplete;
