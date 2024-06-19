import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  Divider,
} from "@mui/material";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimeTableItem {
  intern_name: string;
  student_code: string;
  est_start: string;
  est_end: string;
  status: string;
}

const ListTimeTable: React.FC = () => {
  const data: TimeTableItem[] = [
    {
      intern_name: "John Doe",
      student_code: "123456",
      est_start: "09:00 AM",
      est_end: "05:00 PM",
      status: "Processing",
    },
    {
      intern_name: "Jane Smith",
      student_code: "789012",
      est_start: "10:00 AM",
      est_end: "06:00 PM",
      status: "Approved",
    },
    {
      intern_name: "Jane Smith",
      student_code: "789012",
      est_start: "10:00 AM",
      est_end: "06:00 PM",
      status: "Approved",
    },
    {
      intern_name: "Jane Smith",
      student_code: "789012",
      est_start: "10:00 AM",
      est_end: "06:00 PM",
      status: "Approved",
    },
    {
      intern_name: "Jane Smith",
      student_code: "789012",
      est_start: "10:00 AM",
      est_end: "06:00 PM",
      status: "Approved",
    },
    {
      intern_name: "Jane Smith",
      student_code: "789012",
      est_start: "10:00 AM",
      est_end: "06:00 PM",
      status: "Approved",
    },
    {
      intern_name: "Jane Smith",
      student_code: "789012",
      est_start: "10:00 AM",
      est_end: "06:00 PM",
      status: "Approved",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState<{
    [key: number]: string;
  }>({});

  const handleStatusChange = (index: number, value: string) => {
    setSelectedStatus((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const handleSubmit = (index: number) => {
    console.log(
      `Status for item ${index} updated to: ${selectedStatus[index]}`
    );
    // Add your submit logic here
  };

  return (
    <ScrollArea className="h-[350px]">
      <List style={{ width: "1000px" }}>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <div className="flex flex-col">
                      <Typography component="span" variant="body1">
                        {item.intern_name} - {item.student_code}
                      </Typography>
                      <Typography component="span">
                        {item.est_start} - {item.est_end}
                      </Typography>
                    </div>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                      width="50%"
                    >
                      <Typography component="span" style={{ marginLeft: 16 }}>
                        Status: {item.status}
                      </Typography>
                      <Box ml={2} display="flex" alignItems="center">
                        <FormControl
                          size="small"
                          variant="outlined"
                          style={{ marginRight: 8, minWidth: 150 }}
                        >
                          <InputLabel id={`status-select-label-${index}`}>
                            Change Status
                          </InputLabel>
                          <Select
                            labelId={`status-select-label-${index}`}
                            id={`status-select-${index}`}
                            value={selectedStatus[index] || ""}
                            onChange={(e: SelectChangeEvent<string>) =>
                              handleStatusChange(index, e.target.value as string)
                            }
                            label="Change Status"
                          >
                            <MenuItem value="Processing">Processing</MenuItem>
                            <MenuItem value="Denied">Denied</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleSubmit(index)}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < data.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </ScrollArea>
  );
};

export default ListTimeTable;
