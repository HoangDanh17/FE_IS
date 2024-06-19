"use client";
import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname, useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import authApiRequest from "@/apiRequests/auth";
import { toast } from "@/components/ui/use-toast";
import { useAppContext } from "@/app/app-provider";

const dummyData = [
  { name: "Project A", date: "2024-01-01" },
  { name: "Project B", date: "2024-02-01" },
  { name: "Project C", date: "2024-03-01" },
  { name: "Project D", date: "2024-04-01" },
  { name: "Project E", date: "2024-05-01" },
  { name: "Project F", date: "2024-06-01" },
  { name: "Project G", date: "2024-07-01" },
  { name: "Project H", date: "2024-08-01" },
  { name: "Project I", date: "2024-09-01" },
  { name: "Project J", date: "2024-10-01" },
  { name: "Project K", date: "2024-11-01" },
  { name: "Project L", date: "2024-12-01" },
  { name: "Project M", date: "2025-01-01" },
  { name: "Project N", date: "2025-02-01" },
  { name: "Project O", date: "2025-03-01" },
  { name: "Project P", date: "2025-04-01" },
  { name: "Project Q", date: "2025-05-01" },
  { name: "Project R", date: "2025-06-01" },
  { name: "Project S", date: "2025-07-01" },
  { name: "Project T", date: "2025-08-01" },
  { name: "Project U", date: "2025-09-01" },
  { name: "Project V", date: "2025-10-01" },
  { name: "Project W", date: "2025-11-01" },
  { name: "Project X", date: "2025-12-01" },
];

const ListCardLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useAppContext();

  const handleCardClick = (projectName: string) => {
    router.push("/homePage");
  };

  const handleLogout = async () => {
    try {
      await authApiRequest
        .logoutFromNextClientToNextServer(true)
        .then((res) => {
          toast({
            title: `Đăng xuất thành công`,
            duration: 2000,
            variant: "info",
          });
          router.push(`/login?redirectFrom=${pathname}`);
        });
    } finally {
      setUser(null);
      router.refresh();
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionTokenExpiresAt");
    }
  };

  return (
    <div className="bg-gray-200 h-screen">
      <div
        className="w-full text-center bg-slate-100 shadow-lg"
        style={{ padding: 13, display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <div style={{ flex: 1, textAlign: "center",marginLeft:100 }}>
          <Typography variant="h6" style={{fontWeight:800}}>NEXTBEAN CENTER</Typography></div>
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="primary"
          startIcon={<LogoutIcon />}
          style={{ marginRight: 20 }}
        >
          Logout
        </Button>
      </div>
      <div className="w-full p-5">
        <Typography variant="h5" style={{ marginTop: 20, marginBottom: 20 }}>
          Danh sách các projects
        </Typography>
        <ScrollArea className="h-[550px] rounded-md border p-2 mr-3">
          <Grid container spacing={3}>
            {dummyData.map((project, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  onClick={() => handleCardClick(project.name)}
                  className="hover:scale-105 transition-transform duration-400 ease-in-out cursor-pointer shadow-lg"
                >
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      height: "150px",
                    }}
                  >
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography color="textSecondary">
                      {project.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ListCardLayout;
