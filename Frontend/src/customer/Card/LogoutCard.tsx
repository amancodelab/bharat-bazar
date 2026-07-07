import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";

const LogoutCard = () => {
  return (
    <div>
      <Button
        variant="contained"
        color="error"
        startIcon={<Logout />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutCard;
