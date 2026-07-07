const razorpayInstance = require('../config/razorpay');
const PaymentOrder = require('../models/PaymentOrder');
const Order = require('../models/Order');
const PaymentStatus = require('../domain/PaymentStatus');
const OrderStatus = require('../domain/OrderStatus');

class PaymentOrderServices {
  async createPaymentOrder(user, orders) {
    try {
      if (!user || !orders?.length) {
        throw new Error('Missing the User or Orders')
      };

      const amount = orders.reduce((sum, order) => sum + order.totalSellingPrice, 0);

      const paymentOrder = await PaymentOrder.create({
        user: user._id,
        amount,
        orders: orders.map((order) => order._id),
      });

      return paymentOrder;

    } catch (error) {
      throw new Error(error.message)
    };
  }



  // get Payment order by Payment order Id
  async getPaymentOrderById(paymentOrderId) {
    try {
      if (!paymentOrderId) {
        throw new Error('Missing the Payment Order Id');
      }

      const paymentOrder = await PaymentOrder.findById(paymentOrderId);

      if (!paymentOrder) {
        throw new Error('Invalid Payment Order Id')
      };

      return paymentOrder;
    } catch (error) {
      throw new Error(error.message)
    };
  }

  // get payment Order by OrderlinkId 

  async getPaymentOrderBypaymentLinkId(paymentLinkId) {
    try {
      if (!paymentLinkId) {
        throw new Error('Missing the Order Link Id');
      }
      const paymentOrder = await PaymentOrder.findOne({ paymentLinkId });

      if (!paymentOrder) {
        throw new Error('Invalid Payment link Id')
      };
      return paymentOrder;

    } catch (error) {
      throw new Error(error.message)
    }
  }

  // To get to create RazorPayPaymentLink 

  async createRazorpayPaymentLink(user, amount, paymentOrderId) {
    try {

      if (!user || !amount || !paymentOrderId) {
        throw new Error(
          'Missing the User, Amount or Payment Order Id'
        );
      }
      const paymentLinkRequest = {
        amount: amount * 100,
        currency: "INR",
        customer: {
          name: user.name,
          email: user.email,
        },
        notify: { email: true },
        callback_url: `http://localhost:5173/payment-success/${paymentOrderId}`,
        callback_method: "get"
      };

      const paymentLink = await razorpayInstance.paymentLink.create(paymentLinkRequest);

      const paymentOrder = await this.getPaymentOrderById(paymentOrderId);

      paymentOrder.paymentLinkId = paymentLink.id;
      paymentOrder.paymentLinkUrl = paymentLink.short_url;
      await paymentOrder.save();

      return paymentLink;

    } catch (error) {
      console.log(error.message);

      throw error
    }
  }

  // how created processing payment process and verify

  async processPaymentOrder(paymentOrder, paymentId) {
    try {
      if (!paymentOrder || !paymentId) {
        throw new Error('Missing the Payment Order and Payment Id')
      };

      // checked the payment Already processed

      if (paymentOrder.status === PaymentStatus.SUCCESS) {
        return {
          success: true,
          message: "Payment already Processed"
        }
      };

      // Check payment already processed
      const payment = await razorpayInstance.payments.fetch(paymentId);

      if (!payment) {
        throw new Error("Invalid Payment Id")
      };

      if (payment.status === "captured") {

        // udpate all related orders 
        await Promise.all(paymentOrder.orders.map(async (orderId) => {
          const order = await Order.findById(orderId);
          if (!order) {
            return;
          }
          order.paymentStatus = PaymentStatus.COMPLETED;
          order.orderStatus = OrderStatus.PLACED;
          await order.save();
        })
        )

        paymentOrder.status = PaymentStatus.SUCCESS;
        await paymentOrder.save();

        return true;
      } else {
        paymentOrder.status = PaymentStatus.FAILED;
        await paymentOrder.save();
        return false;
      }

    } catch (error) {
      throw new Error(error.message)
    };
  }

}


module.exports = new PaymentOrderServices();