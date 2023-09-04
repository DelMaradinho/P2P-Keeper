export const filterDataByCriteria = (data, filter, initialData) => {
  // Проверка на пустой объект фильтра
  if (Object.keys(filter).length === 0) {
    return initialData;
  }

  return initialData.filter((item) => {
    for (let key of Object.keys(filter)) {
      if (Array.isArray(filter[key])) {
        if (!filter[key].includes(String(item[key]).toLowerCase())) {
          return false;
        }
      }
    }
    return true;
  });
};
