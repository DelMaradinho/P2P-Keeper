import React, { useState } from "react";
import { Input } from "antd";

const InputNumber = (props) => {
  const [value, setValue] = useState(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Разрешаем ввод только цифр, запятых и точек
    const isValidInput = /^[0-9.,]*$/.test(inputValue);

    if (isValidInput) {
      // Заменяем запятые на точки
      const formattedValue = inputValue.replace(/,/g, ".");
      setValue(formattedValue);
    }
  };

  return <Input value={value} onChange={handleChange} {...props} />;
};

export default InputNumber;
