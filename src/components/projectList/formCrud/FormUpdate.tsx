"use client";
import {
  TextField,
  Typography,
  Grid,
  Box,
  styled,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Div = styled("div")(({ theme }) => ({
  //   ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

interface RowData {
  id: number;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const FormUpdate = ({ row }: { row: RowData }) => {
  return (
    <Div>
      <div style={{ textAlignLast: "center" }}>
        <Typography id="transition-modal-title" variant="h4" component="h2">
          Sửa dự án
        </Typography>
      </div>
      <form>
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Tên dự án</Typography>
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
                defaultValue={row.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Calories</Typography>
              <TextField
                id="calories"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
                defaultValue={row.calories}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Fat (g)</Typography>
              <TextField
                id="fat"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
                defaultValue={row.fat}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Carbs (g)</Typography>
              <TextField
                id="carbs"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
                defaultValue={row.carbs}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Protein (g)</Typography>
              <TextField
                id="protein"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
                defaultValue={row.protein}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="warning"
                startIcon={<EditIcon />}
                style={{ width: "100%" }}
              >
                Sửa dự án
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Div>
  );
};

export default FormUpdate;
