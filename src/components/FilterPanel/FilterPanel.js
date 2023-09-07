import { TreeSelect } from "antd";
import { useState } from "react";
import { filterData } from "../../constants/constants";
import { DatePicker } from "antd";
import "./FilterPanel.scss";

const { RangePicker } = DatePicker;
const FilterPanel = ({ onFilterChange }) => {
  const [value, setValue] = useState();
  const [dateRange, setDateRange] = useState([]);

  const onChange = (newValue) => {
    // Инициализация formattedValue ключами из filterData и пустыми массивами
    const formattedValue = filterData.reduce((acc, category) => {
      acc[category.value] = [];
      return acc;
    }, {});

    newValue.forEach((currentValue) => {
      // Проверяем, является ли currentValue родительским элементом
      const parent = filterData.find(
        (category) => category.value === currentValue
      );
      if (parent) {
        formattedValue[currentValue] = parent.children.map(
          (child) => child.value
        );
      } else {
        // Если это не родительский элемент, ищем родительскую категорию для текущего элемента
        for (let category of filterData) {
          if (category.children.some((child) => child.value === currentValue)) {
            formattedValue[category.value].push(currentValue);
            break; // Если значение найдено, прекращаем поиск в этой категории
          }
        }
      }
    });

    onFilterChange(formattedValue);
    setValue(newValue);
  };

  const onDateChange = (dates, dateStrings) => {
    setDateRange(dates);
    const formattedFilter = {
      startDate: dateStrings[0] || "",
      endDate: dateStrings[1] || "",
    };
    onFilterChange(formattedFilter);
  };

  return (
    <div className="filter__container">
      <RangePicker
        onChange={onDateChange}
        placeholder={["Дата начальная", "Дата конечная"]}
        style={{
          width: "290px",
        }}
      />
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
    </div>
  );
};
export default FilterPanel;
