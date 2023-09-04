import { TreeSelect } from "antd";
import { useState } from "react";
import { filterData } from "../../constants/constants";

const FilterPanel = ({ onFilterChange }) => {
  const [value, setValue] = useState();

  const onChange = (newValue) => {
    const formattedValue = newValue.reduce((acc, currentValue) => {
      // Проверяем, является ли currentValue родительским элементом
      const parent = filterData.find(
        (category) => category.value === currentValue
      );
      if (parent) {
        acc[currentValue] = parent.children.map((child) => child.value);
      } else {
        // Если это не родительский элемент, ищем родительскую категорию для текущего элемента
        for (let category of filterData) {
          if (category.children.some((child) => child.value === currentValue)) {
            if (!acc[category.value]) {
              acc[category.value] = [];
            }
            acc[category.value].push(currentValue);
            break; // Если значение найдено, прекращаем поиск в этой категории
          }
        }
      }
      return acc;
    }, {});

    onFilterChange(formattedValue);
    setValue(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{
        width: "200px",
      }}
      value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: "auto",
      }}
      placeholder="Выберите фильтр"
      allowClear
      multiple
      treeDefaultExpandAll
      onChange={onChange}
      treeData={filterData}
      treeCheckable={true}
    />
  );
};
export default FilterPanel;
