"use client";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const HeaderWelcomePage = () => {
  const [alignment, setAlignment] = useState("");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="login">
          {" "}
          <Link href="/login">Đăng nhập</Link>
        </ToggleButton>
        <ToggleButton value="register">
          <Link href="/register">Đăng ký</Link>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default HeaderWelcomePage;
