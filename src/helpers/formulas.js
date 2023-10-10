export const formulaKey = "formula";

export const saveInStorage = (formula) => {
  localStorage.setItem(formulaKey, JSON.stringify(formula));
};

export const getFromStorage = () => {
  return JSON.parse(localStorage.getItem(formulaKey));
};

export const getFormulaCurrentKey = (formula) => {
  const reduxValue = Number(Object.keys(formula)?.length);

  return reduxValue;
};

export const getFormulaNextKey = (formula) => {
  const reduxValue = Number(Object.keys(formula)?.length);

  return reduxValue + 1;
};
