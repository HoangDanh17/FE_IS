"use client";
import {
  TextField,
  Typography,
  Grid,
  Box,
  styled,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Div = styled("div")(({ theme }) => ({
  //   ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const FormCreate = () => {
  return (
    <Div>
      <div style={{ textAlignLast: "center" }}>
        <Typography id="transition-modal-title" variant="h4" component="h2">
          Tạo dự án
        </Typography>
      </div>
      <form>
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Tên dự án</Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Tên dự án</Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Tên dự án</Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Tên dự án</Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                color="primary"
                style={{ width: "100%" }}
              >
                Tạo dự án
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Div>
  );
};

export default FormCreate;
