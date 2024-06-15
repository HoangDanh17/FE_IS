"use client";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { handleErrorApi } from "@/lib/utils";
import authApiRequest from "@/apiRequests/auth";
import Link from "next/link";
import { useAppContext } from "@/app/app-provider";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    router.push("/homePage");
    // if (loading) return;
    // setLoading(true);
    // try {
    //   const result = await authApiRequest.login(values);

    //   await authApiRequest.auth({
    //     sessionToken: result.payload.data.token,
    //   });
    //   toast({
    //     title: `Chào mừng đăng nhập ${result.payload.data.account_info.user_name}`,
    //     duration: 2000,
    //     variant: "info",
    //   });
    //   setUser(result.payload.data.account_info);
    //   console.log(result);
    //   router.push("/homePage");
    // } catch (error: any) {
    //   handleErrorApi({
    //     error,
    //     setError: form.setError,
    //   });
    // } finally {
    //   setLoading(false);
    // }
  }

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
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "600px" }}
            >
              <Typography
                variant="h5"
                textAlign="center"
                color="textSecondary"
                mb={1}
              >
                NEXTBEAN CENTER
              </Typography>
              <Stack>
                <Box>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
                      noValidate
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                style={{ marginBottom: 14 }}
                                type="email"
                                {...field}
                                placeholder="Nhập email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                              <Input
                                style={{ marginBottom: 14 }}
                                type="password"
                                {...field}
                                placeholder="Nhập password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                        disabled={loading}
                      >
                        Đăng nhập
                      </Button>
                    </form>
                  </Form>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      component={Link}
                      href="/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Tạo tài khoản
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LoginForm;
