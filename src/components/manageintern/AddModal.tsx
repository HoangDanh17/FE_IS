import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "@/components/css/manageintern/ModalBox.css";
import { useRouter } from "next/navigation";

import { toast } from "../ui/use-toast";
import internApiRequest from "@/apiRequests/intern";
import { CreateInternType } from "@/schemaValidations/intern.schema";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { SelectChangeEvent } from "@mui/material";

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<CreateInternType>({
    address: "",
    avatar: "",
    "date-of-birth": "",
    email: "",
    gender: "",
    "ojt-id": 1,
    password: "",
    "phone-number": "",
    "student-code": "",
    "user-name": "",
  });

  const [errors, setErrors] = useState({
    password: "",
    email: "",
    "phone-number": "",
    gender: "",
    "user-name": "",
    "student-code": "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      if (value.length < 6) {
        setErrors((prev) => ({
          ...prev,
          password: "Mật khẩu phải lớn hơn 6 kí tự",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Email không hợp lệ" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (name === "phone-number") {
      if (value.length < 10 || value.length > 11) {
        setErrors((prev) => ({
          ...prev,
          "phone-number": "Số điện thoại phải đủ 10 đến 11 số",
        }));
      } else {
        setErrors((prev) => ({ ...prev, "phone-number": "" }));
      }
    }

    if (name === "user-name") {
      if (value.length < 4) {
        setErrors((prev) => ({
          ...prev,
          "user-name": "Tên người dùng phải lớn hơn 4 kí tự",
        }));
      } else {
        setErrors((prev) => ({ ...prev, "user-name": "" }));
      }
    }

    if (name === "student-code") {
      if (value.length < 4) {
        setErrors((prev) => ({
          ...prev,
          "student-code": "Mã sinh viên phải lớn hơn 4 kí tự",
        }));
      } else {
        setErrors((prev) => ({ ...prev, "student-code": "" }));
      }
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name: string, date: Dayjs | null) => {
    setFormData({
      ...formData,
      [name]: date ? date.format("YYYY-MM-DD") : "",
    });
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAdd() {
    // Validate all fields before submitting
    let valid = true;
    const newErrors = { ...errors };

    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải lớn hơn 6 kí tự";
      valid = false;
    } else {
      newErrors.password = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (
      formData["phone-number"].length < 10 ||
      formData["phone-number"].length > 11
    ) {
      newErrors["phone-number"] = "Số điện thoại phải đủ 10 đến 11 số";
      valid = false;
    } else {
      newErrors["phone-number"] = "";
    }

    if (formData["user-name"].length < 4) {
      newErrors["user-name"] = "Tên người dùng phải lớn hơn 4 kí tự";
      valid = false;
    } else {
      newErrors["user-name"] = "";
    }

    if (formData["student-code"].length < 4) {
      newErrors["student-code"] = "Mã sinh viên phải lớn hơn 4 kí tự";
      valid = false;
    } else {
      newErrors["student-code"] = "";
    }

    if (!formData.gender) {
      newErrors.gender = "Giới tính không được để trống";
      valid = false;
    } else {
      newErrors.gender = "";
    }

    setErrors(newErrors);

    if (!valid) return;

    setLoading(true);
    const formattedData = {
      ...formData,
      "date-of-birth": formData["date-of-birth"]
        ? dayjs(formData["date-of-birth"]).format("YYYY-MM-DD")
        : "",
    };
    console.log("Form Data:", formattedData);
    try {
      const result = await internApiRequest.createIntern(formattedData);
      toast({
        title: result.payload.message,
        duration: 2000,
        variant: "success",
      });
      console.log(result);
      router.refresh();
      onClose();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessages = error.response.data.message
          .map((err: any) => `${err.field}: ${err["err-message"]}`)
          .join(", ");
        toast({
          title: "Lỗi xác thực",
          description: errorMessages,
          duration: 2000,
          variant: "destructive",
        });
      } else {
        toast({
          title: error.message,
          duration: 2000,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="modal-box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm thực tập sinh mới
        </Typography>
        <FormControl fullWidth>
          <Grid container spacing={2} marginY={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Tên đăng nhập"
                name="user-name"
                value={formData["user-name"]}
                onChange={handleChange}
                error={Boolean(errors["user-name"])}
                helperText={errors["user-name"]}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Mã sinh viên"
                name="student-code"
                value={formData["student-code"]}
                onChange={handleChange}
                error={Boolean(errors["student-code"])}
                helperText={errors["student-code"]}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Mã OJT"
                name="ojt-id"
                value={formData["ojt-id"]}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={Boolean(errors.gender)}>
                <InputLabel>Giới tính</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  label="Giới tính"
                  displayEmpty
                >
                  <MenuItem value="Nam">Nam</MenuItem>
                  <MenuItem value="Nữ">Nữ</MenuItem>
                </Select>
                <FormHelperText>{errors.gender}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone-number"
                value={formData["phone-number"]}
                onChange={handleChange}
                error={Boolean(errors["phone-number"])}
                helperText={errors["phone-number"]}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <DatePicker
                label="Ngày sinh"
                value={
                  formData["date-of-birth"]
                    ? dayjs(formData["date-of-birth"])
                    : null
                }
                onChange={(date) => handleDateChange("date-of-birth", date)}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </Button>
          </Box>
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
};

export default AddModal;
