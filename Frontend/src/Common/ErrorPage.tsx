import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            color: "#1976d2",
            fontSize: { xs: "5rem", md: "8rem" },
          }}
        >
          404
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 600, mt: 2 }}>
          Oops! Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2, maxWidth: 500 }}
        >
          The page you're looking for doesn't exist or may have been moved.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{ mt: 5, px: 5 }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
