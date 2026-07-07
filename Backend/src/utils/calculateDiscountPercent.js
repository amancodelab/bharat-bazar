const calculateDiscountPercent = (mrp, sellingPrice) => {

  // check mrp and selling price
  if (mrp === 0 && sellingPrice === 0) {
    return 0
  };
  // check MRP
  if (mrp <= 0) {
    throw new Error("MRP must be greater than 0");
  }


  // check selling price
  if (sellingPrice > mrp) {
    throw new Error("Selling price cannot be greater than MRP");
  }

  // calculate discount percentage
  const discount = ((mrp - sellingPrice) / mrp) * 100;

  return Math.round(discount);
};

module.exports = calculateDiscountPercent;