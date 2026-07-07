import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../ReduxToolkit/store";
import { logout, logoutSeller } from "../../ReduxToolkit/Features/AuthSlilce";
import { Button } from "@mui/material";
import SuccessAlert from "../../util/SuccessAlert";

const SellerLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState<boolean>(false);
  useEffect(() => {
    const jwt = localStorage.getItem("seller_jwt");

    if (!jwt) {
      navigate("/auth/seller/register", { replace: true });
      return;
    }
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutSeller()).unwrap();
      setLogoutMessage(true);
      setTimeout(() => {
        navigate("/auth/seller/register");
      }, 2000);
    } catch (error) {
      console.log(error);
      navigate("/auth/seller/register", { replace: true });
    } finally {
      dispatch(logout());
    }
  };

  return (
    <div className="flex justify-center items-center h-96 flex-col ">
      {logoutMessage ? <SuccessAlert success="Successfully Logut" /> : null}
      <h1 className="py-4">Click to Logout </h1>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </div>
  );
};

export default SellerLogout;
