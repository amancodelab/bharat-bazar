import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { logoutAdmin } from "../../ReduxToolkit/Features/Admin/adminAuthSlice";
import { Button } from "@mui/material";
import adminApi from "../../config/adminApi";

const LogoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const admin = useAppSelector((state) => state.adminAuth.admin);
  const loading = useAppSelector((state) => state.adminAuth.loading);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-2xl text-center">loading.......</h1>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex justify-center items-center w-full h-full flex-col">
        <h1 className="text-2xl text-center text-green-400 my-10">
          Please Login
        </h1>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate("/admin/login");
          }}
        >
          Login
        </Button>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Button
        variant="outlined"
        color="error"
        onClick={async () => {
          try {
            await adminApi.post("/admin/logout");
            dispatch(logoutAdmin());
            navigate("/admin/login");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutPage;
