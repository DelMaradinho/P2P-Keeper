export const filterDataByCriteria = (filter, initialData) => {
  let filteredData = [...initialData];

  // Фильтрация по дате
  if (filter.startDate || filter.endDate) {
    const startDate = filter.startDate ? new Date(filter.startDate) : null;
    const endDate = filter.endDate ? new Date(filter.endDate) : null;

    filteredData = filteredData.filter((item) => {
      const itemDate = new Date(item.date); // предполагая, что дата записи хранится в поле 'date'
      return (
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
  }

  // Фильтрация по другим критериям
  for (let key of Object.keys(filter)) {
    if (key !== "startDate" && key !== "endDate") {
      if (Array.isArray(filter[key])) {
        filteredData = filteredData.filter((item) =>
          filter[key].includes(String(item[key]).toLowerCase())
        );
      }
    }
  }

  return filteredData;
};
