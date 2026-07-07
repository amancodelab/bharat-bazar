import { Alert } from "@mui/material";

interface SuccessAlertProps {
  success: string;
}

const SuccessAlert = ({ success }: SuccessAlertProps) => {
  return (
    <div className="min-w-40 flex justify-center items-center">
      <Alert severity="success">{success}</Alert>
    </div>
  );
};

export default SuccessAlert;
