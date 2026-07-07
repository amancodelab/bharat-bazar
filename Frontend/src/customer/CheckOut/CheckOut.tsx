import { Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import ChoosePayment from "./ChoosePayment";
import Loading from "../../util/Loading";
import ErrorAlert from "../../util/ErrorAlert";

import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { GetuserData } from "../../ReduxToolkit/Features/User/GetUserData";

const CheckOut = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetuserData());
  }, [dispatch]);

  const {
    userdata: user,
    loading,
    error,
  } = useAppSelector((state) => state.userData);

  const [open, setOpen] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  // selected address id
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleShowAddress = () => {
    setShowAddress((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <h1>Please Login First</h1>
      </div>
    );
  }

  const savedAddresses =
    user.shippingAddress?.length > 0
      ? user.shippingAddress
      : user.address
        ? [user.address]
        : [];

  const displayedAddresses = showAddress
    ? savedAddresses
    : savedAddresses.slice(0, 3);

  return (
    <div className="py-2 md:py-4 px-5 md:px-30 lg:px-40 grid lg:grid-cols-3 grid-cols-1 lg:gap-x-4 gap-2 min-h-screen">
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Select Your Address</h1>

          <Button variant="outlined" onClick={handleOpen}>
            Add New Address
          </Button>
        </div>

        <div className="mt-5 space-y-4">
          {displayedAddresses.map((item: any) => (
            <AddressCard
              key={item._id}
              item={item}
              value={item._id}
              selectedValue={selectedAddress}
              handleChange={handleChange}
            />
          ))}
        </div>

        {savedAddresses.length > 3 && (
          <Button onClick={handleShowAddress} sx={{ mt: 2 }}>
            {showAddress ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>

      <div className="lg:col-span-1">
        <ChoosePayment addressId={selectedAddress} />
      </div>

      <Modal open={open} onClose={handleClose}>
        <div
          className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          bg-white
          rounded-xl
          p-6
          w-[95%]
          md:w-[70%]
          lg:w-[40%]
          max-h-[90vh]
          overflow-y-auto"
        >
          <AddressForm handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default CheckOut;
