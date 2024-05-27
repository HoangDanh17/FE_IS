"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLogin from "@/components/auth/AuthLogin";
import Link from "next/link";
import Logo from "@/layout/shared/logo/Logo";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async () => {
    // Giả sử bạn có API để xác thực người dùng
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password }),
    // });

    // if (res.ok) {
    // const data = await res.json();
    // document.cookie = `token=${data.token}; path=/;`; // Lưu token vào cookies
    const data = "12123456";
    document.cookie = `token=${data}; path=/;`;
    // Lưu token vào cookies
    router.push("/homePage"); // Chuyển hướng tới trang homePage
    // } else {
    //   // Xử lý lỗi đăng nhập
    // }
  };

  return (
    <div>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              {/* <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box> */}
              <AuthLogin
                handleClick={handleLogin}
                subtext={
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="textSecondary"
                    mb={1}
                  >
                    LOGIN
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      component={Link}
                      href="/authentication/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LoginPage;
