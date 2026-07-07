import { Avatar } from "@mui/material";
import ProfileLabelCard from "../../Common/ProfileLabelCard";
import AddressLableCard from "../../Common/AddressLableCard";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { useEffect } from "react";
import { fetchSellerById } from "../../ReduxToolkit/Features/Seller/SellerSlice";
import Loading from "../../util/Loading";
import ErrorAlert from "../../util/ErrorAlert";

const SellerAccount = () => {
  const jwt = localStorage.getItem("seller_jwt");
  const id = localStorage.getItem("sellerId");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (jwt && id) dispatch(fetchSellerById(id));
  }, [dispatch, jwt, id]);

  // use get seller details
  const seller = useAppSelector((state) => state.seller?.currentSeller);

  const { loading, error } = useAppSelector((state) => state.seller);

  if (loading) {
    return <Loading />;
  }
  console.log("seller :", seller);

  if (error) {
    <ErrorAlert error={error} />;
  }
  return (
    <div className="w-full lg:w-[75%] px-5 md:px-10 py-2 lg:py-4 space-y-2 md:space-y-4 border-2 rounded-lg border-gray-300">
      <h1 className="logo p-2 text-center text-2xl">Personal Details</h1>
      <Avatar
        sx={{ width: "8rem", height: "8rem" }}
        src={seller?.profileImage}
      />
      <div className="p-2 space-y-1 ">
        <ProfileLabelCard label={"Seller Name"} value={seller?.sellerName} />
        <ProfileLabelCard label={"Seller Email"} value={seller?.email} />
        <ProfileLabelCard label={"Seller Mobile"} value={seller?.mobile} />
      </div>
      {/* Business section */}
      <h1 className="logo p-2 text-center text-2xl">Businesss Details</h1>
      <div className="p-2 space-y-1 ">
        <ProfileLabelCard
          label={"Brand Name"}
          value={seller?.businessDetails?.businessName}
        />
        <ProfileLabelCard label={"GSTIN"} value={seller?.GSTIN} />
        <ProfileLabelCard
          label={"Account Status"}
          value={seller?.accountStatus}
        />
      </div>
      {/* Pickup Addresss section */}
      <h1 className="logo p-2 text-center text-2xl">Pickup Address Details</h1>
      <div className="p-2 space-y-1 ">
        <AddressLableCard label={"name"} value={seller?.pickupAddress?.name} />
        <AddressLableCard
          label={"Address"}
          value={seller?.pickupAddress?.address}
        />
        <AddressLableCard
          label={"Mobile"}
          value={seller?.pickupAddress?.mobile}
        />
        <AddressLableCard
          label={"Pincode"}
          value={seller?.pickupAddress?.pincode}
        />
        <AddressLableCard
          label={"State"}
          value={seller?.pickupAddress?.state}
        />
        <AddressLableCard
          label={"Locality"}
          value={seller?.pickupAddress?.locality}
        />
        <AddressLableCard
          label={"Country"}
          value={seller?.pickupAddress?.country}
        />
      </div>
      {/* Bank Details section */}
      <h1 className="logo p-2 text-center text-2xl">Bank Details</h1>
      <div className="p-2 space-y-1 ">
        <ProfileLabelCard
          label={"Bank Name"}
          value={seller?.bankDetails?.bankName}
        />
        <ProfileLabelCard
          label={"Bank Accouonts"}
          value={seller?.bankDetails?.accountNumber}
        />
        <ProfileLabelCard
          label={"Account Holder"}
          value={seller?.bankDetails?.accountHolderName}
        />
        <ProfileLabelCard
          label={"IFSC Code"}
          value={seller?.bankDetails?.ifscCode}
        />
      </div>
    </div>
  );
};

export default SellerAccount;
