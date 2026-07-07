import { Button, Snackbar, Alert } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../ReduxToolkit/store";
import { logout } from "../../ReduxToolkit/Features/User/UserAuthSlilce";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());

    setOpen(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={1500}
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
    </>
  );
};

export default LogoutButton;
