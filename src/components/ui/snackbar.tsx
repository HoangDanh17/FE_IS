// Import các thư viện cần thiết
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type AlertSeverity = "error" | "success";

interface CustomeSnackBarType {
  description: string;
  type: AlertSeverity;
}
const CustomSnackbar = ({ description, type }: CustomeSnackBarType) => {
  return (
    <Snackbar autoHideDuration={6000}>
      <Alert severity={type}>{description}</Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
