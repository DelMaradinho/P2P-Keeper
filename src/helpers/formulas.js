export const formulaKey = "formula";

export const saveInStorage = (formula) => {
  localStorage.setItem(formulaKey, JSON.stringify(formula));
};

export const getFromStorage = () => {
  return JSON.parse(localStorage.getItem(formulaKey));
};

export const getFormulaCurrentKey = (formula) => {
  const reduxValue = Number(Object.keys(formula)?.length);
  const storageValue = Number(
    Object.keys(JSON.parse(localStorage.getItem(formulaKey)) || {}).length
  );

  if (reduxValue > storageValue) {
    return reduxValue + 1;
  }

  return storageValue + 1;
};
