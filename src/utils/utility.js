export const getFormattedCost = (expense) => {
  // expense = +expense
  return "₹" + (+expense).toFixed(1).toLocaleString("en-IN");
};
