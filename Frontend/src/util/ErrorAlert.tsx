import { Alert } from "@mui/material";

interface ErrorAlertProps {
  error: string;
}

const ErrorAlert = ({ error }: ErrorAlertProps) => {
  return (
    <div className="min-w-40 flex justify-center items-center">
      <Alert severity="error">{error}</Alert>
    </div>
  );
};

export default ErrorAlert;
