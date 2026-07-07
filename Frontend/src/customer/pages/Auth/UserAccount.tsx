import {
  Avatar,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import { logout } from "../../../ReduxToolkit/Features/User/UserAuthSlilce";
import {
  GetuserData,
  GetUserProfile,
} from "../../../ReduxToolkit/Features/User/GetUserData";

const UserAccount = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.userData.userdata);
  const profile = useAppSelector((state) => state.userData.profile);
  const loading = useAppSelector((state) => state.userData.loading);

  useEffect(() => {
    dispatch(GetUserProfile());
    dispatch(GetuserData());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());

    setOpen(true);

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="rounded-3xl overflow-hidden shadow-xl">
          <div className="h-40 bg-linear-to-r from-blue-600 to-indigo-600" />

          <CardContent>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-20">
              <Avatar
                src={profile ? `/uploads/${profile}` : ""}
                alt={`No Profile ${user.name}`}
                sx={{
                  width: 140,
                  height: 140,
                  border: "4px solid white",
                }}
              />

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{user.name}</h1>

                <p className="text-gray-600 mt-1">{user.email}</p>

                <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    {user.accountStatus}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {user.role}
                  </span>
                </div>
              </div>

              <Button
                variant="contained"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Personal Info */}
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>

              <div className="space-y-3">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {user.mobile}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <p>
                  <strong>Status:</strong> {user.accountStatus}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Address</h2>

              {user.address ? (
                <div className="space-y-2">
                  <p>
                    <strong>City:</strong> {user.address.city}
                  </p>

                  <p>
                    <strong>State:</strong> {user.address.state}
                  </p>

                  <p>
                    <strong>Country:</strong> {user.address.country}
                  </p>

                  <p>
                    <strong>Pincode:</strong> {user.address.pincode}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No address added</p>
              )}
            </CardContent>
          </Card>

          {/* Shipping Addresses */}
          <Card className="rounded-2xl shadow-md md:col-span-2">
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Shipping Addresses</h2>

              {user.shippingAddress?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.shippingAddress.map((item: any) => (
                    <div key={item._id} className="border rounded-xl p-4">
                      <p>{item.city}</p>
                      <p>{item.state}</p>
                      <p>{item.country}</p>
                      <p>{item.pincode}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No shipping addresses found</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="success" variant="filled">
          Logged out successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserAccount;
