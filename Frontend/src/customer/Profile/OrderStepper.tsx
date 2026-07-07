interface OrderStepperProps {
  orderStatus: string;
  paymentStatus: string;
  orderDate: string;
  deliveryDate: string;
}

const OrderStepper = ({
  orderStatus,
  paymentStatus,
  orderDate,
  deliveryDate,
}: OrderStepperProps) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");

  if (paymentStatus === "PENDING" || orderStatus === "PENDING") {
    return (
      <div className="p-4 rounded-lg border border-yellow-300 bg-yellow-50">
        <h2 className="font-semibold text-yellow-700">Waiting for Payment</h2>

        <p className="text-sm text-gray-600 mt-2">
          Your order will be placed after successful payment.
        </p>
      </div>
    );
  }

  const steps = [
    "PLACED",
    "PACKED",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  const labels: Record<string, string> = {
    PLACED: "Order Placed",
    PACKED: "Packed",
    SHIPPED: "Shipped",
    OUT_FOR_DELIVERY: "Out for Delivery",
    DELIVERED: "Delivered",
  };

  const currentStatus = steps.indexOf(orderStatus);

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStatus;
        const isCurrent = index === currentStatus;

        let date = "";

        if (step === "PLACED") {
          date = formatDate(orderDate);
        } else if (step === "DELIVERED") {
          date = formatDate(deliveryDate);
        }

        return (
          <div key={step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2
                ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isCurrent
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`w-0.5 h-10 ${
                    index < currentStatus ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>

            <div className="pb-8">
              <h3
                className={`font-medium ${
                  isCurrent
                    ? "text-blue-600"
                    : isCompleted
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {labels[step]}
              </h3>

              {date && <p className="text-sm text-gray-500">{date}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStepper;
