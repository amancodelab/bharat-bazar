const PaymentOrderServices = require('../services/PaymentOrderServices');
const OrderServices = require('../services/OrderServices');
const TransactionServices = require('../services/TransactionServices');
const SellerReportServices = require('../services/SellerReportServices');
const SellerServices = require('../services/SellerServices');
const Cart = require('../models/Cart');
const errorResponse = require('../utils/response/errorResponse');
const successResponse = require('../utils/response/successResponse');
const CartItem = require('../models/CartItem');

const paymentSuccessHandler = async (req, res) => {
  const user = req.user;

  const { paymentLinkId } = req.query;
  const { paymentId } = req.params;

  try {
    const paymentOrder = await PaymentOrderServices.getPaymentOrderBypaymentLinkId(paymentLinkId);

    const paymentSuccess = await PaymentOrderServices.processPaymentOrder(paymentOrder, paymentId);

    if (paymentSuccess) {
      for (let orderId of paymentOrder.orders) {
        const order = await OrderServices.findOrderById(orderId);
        const transaction = await TransactionServices.createTransaction(order._id);

        const seller = await SellerServices.getSellerById(order.seller);
        //
        const sellerReport = await SellerReportServices.getSellerReport(seller);
        sellerReport.totalOrders += 1;
        sellerReport.totalTransaction += order.totalSellingPrice;
        sellerReport.totalSales += order.orderItems.length;

        const updatedSellerReport = await SellerReportServices.updateSellerReport(sellerReport);

        console.log("Updated Report", updatedSellerReport);

      }

      const cart = await Cart.findOne({ user: user._id });
      console.log("Cart before clear:", cart);

      await Cart.findOneAndUpdate(
        { user: user._id },
        {
          cartItems: [],
          totalItem: 0,
          totalMrp: 0,
          totalSellingPrice: 0,
          totalDiscount: 0,
        },
        { new: true }
      );

      console.log("Cart cleared");

      await CartItem.deleteMany({ cart: cart._id });

      console.log("Cart items deleted");

      return successResponse(res, 200, "Successfully payment done");
    } else {
      return errorResponse(res, 400, "Payment Failed");
    }

  } catch (error) {
    return errorResponse(res, 500, error.message);
  };
}

module.exports = { paymentSuccessHandler };