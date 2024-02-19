import { useState } from "react";
import { filterData } from "../../constants/constants";
import { DatePicker, TreeSelect, Radio, Button } from "antd";
import "./FilterPanel.scss";

const { RangePicker } = DatePicker;
const FilterPanel = ({ onFilterChange }) => {
  const [value, setValue] = useState();
  const [dateRange, setDateRange] = useState([]);
  const [quickDate, setQuickDate] = useState("");

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
    setQuickDate("");
  };

  const handleQuickDateSelect = (quickDateValue) => {
    let newStartDate, newEndDate;

    // Получаем текущую дату и время
    const now = new Date();

    // Определяем начальную и конечную даты в зависимости от выбора пользователя
    switch (quickDateValue) {
      case "day":
        newStartDate = now;
        newEndDate = now;
        break;
      case "week":
        newStartDate = new Date(now.setDate(now.getDate() - 7));
        newEndDate = new Date();
        break;
      case "month":
        newStartDate = new Date(now.setMonth(now.getMonth() - 1));
        newEndDate = new Date();
        break;
      default:
        // Никакие действия не требуются, если не выбраны быстрые даты
        return;
    }

    // Обновляем состояние диапазона дат
    setDateRange([newStartDate, newEndDate]);

    // Обновляем фильтры для передачи в функцию onFilterChange
    const formattedFilter = {
      startDate: newStartDate.toISOString().split("T")[0], // Преобразуем в строку формата YYYY-MM-DD
      endDate: newEndDate.toISOString().split("T")[0],
    };
    setDateRange([]); // Это ключевое изменение
    onFilterChange(formattedFilter);
  };

  const onQuickDateChange = (value) => {
    if (quickDate === value) {
      setQuickDate(""); // Сбросить выбор
      setDateRange([]); // Сбросить даты, если это необходимо
      onFilterChange({}); // Сбросить фильтры, если это необходимо
    } else {
      setQuickDate(value);
      handleQuickDateSelect(value);
    }
  };

  return (
    <div className="filter__container">
      <RangePicker
        value={dateRange?.length > 0 ? dateRange : null} // Если dateRange пуст, передаем null, чтобы сбросить выбор
        onChange={onDateChange}
        placeholder={["Дата начальная", "Дата конечная"]}
        style={{
          width: "290px",
        }}
      />
      {/* <Radio.Group
        onChange={onQuickDateChange}
        value={quickDate}
        style={{
          marginLeft: "10px", // Для отступа, если требуется
        }}
      >
        <Radio.Button value="day">За день</Radio.Button>
        <Radio.Button value="week">За неделю</Radio.Button>
        <Radio.Button value="month">За месяц</Radio.Button>
      </Radio.Group> */}
      <Button
        type={quickDate === "day" ? "primary" : "default"}
        onClick={() => onQuickDateChange("day")}
      >
        За день
      </Button>
      <Button
        type={quickDate === "week" ? "primary" : "default"}
        onClick={() => onQuickDateChange("week")}
      >
        За неделю
      </Button>
      <Button
        type={quickDate === "month" ? "primary" : "default"}
        onClick={() => onQuickDateChange("month")}
      >
        За месяц
      </Button>
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
