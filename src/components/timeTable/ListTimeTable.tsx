import React, { useEffect, useState } from "react";
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
import dayjs, { Dayjs } from "dayjs";
import timetableApiRequest from "@/apiRequests/timetable";
import { TimeTableResType } from "@/schemaValidations/timetable.schema";
import { toast } from "@/components/ui/use-toast";

interface TimeTableItem {
  intern_name: string;
  student_code: string;
  est_start: string;
  est_end: string;
  status: string;
}

const ListTimeTable = ({
  status,
  selectedDay,
}: {
  status: string;
  selectedDay: Dayjs | null| undefined;
}) => {
  const [dataModal, setDataModal] = useState<TimeTableResType | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          status: status === "all" ? "" : status,
          "office-time-from": dayjs(selectedDay).format("YYYY-MM-DD"),
          "office-time-to": dayjs(selectedDay).format("YYYY-MM-DD"),
        };
        const { payload } = await timetableApiRequest.getTimeTable(body);
        setDataModal(payload);

        // Initialize selectedStatus based on fetched data
        const initialSelectedStatus = payload.data.reduce(
          (acc: any, item: any, index: number) => {
            acc[index] = item.status;
            return acc;
          },
          {}
        );
        setSelectedStatus(initialSelectedStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [status, selectedDay, refreshKey]);

  const [selectedStatus, setSelectedStatus] = useState<{
    [key: number]: string;
  }>({});

  const handleStatusChange = (index: number, value: string) => {
    setSelectedStatus((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(id: string, index: number) {
    setLoading(true);

    const body = { status: selectedStatus[index] };
    try {
      const result = await timetableApiRequest.approveTimeTable(id, body);
      toast({
        title: `${result.payload.message}`,
        duration: 2000,
        variant: "success",
      });
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error: any) {
      toast({
        title: `${error}`,
        duration: 2000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollArea className="h-[370px] scale-15 shadow-2xl p-4 rounded-lg border">
      <List style={{ width: "1000px" }}>
        {dataModal?.data.length ? (
          dataModal.data.map((item, index) => (
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
                          Tên thực tập: {item.intern_name} -{" "}
                          {item["student-code"]}
                        </Typography>
                        <Typography component="span">
                          Thời gian: {item["est-start"]} - {item["est-end"]}
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
                                handleStatusChange(
                                  index,
                                  e.target.value as string
                                )
                              }
                              label="Change Status"
                            >
                              <MenuItem value="processing">Processing</MenuItem>
                              <MenuItem value="denied">Denied</MenuItem>
                              <MenuItem value="approved">Approved</MenuItem>
                            </Select>
                          </FormControl>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleSubmit(item.id, index)}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < dataModal.data.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography component="span" variant="h5" className="mt-20">
              Chưa có lịch thực tập ngày hôm nay
            </Typography>
          </Box>
        )}
      </List>
    </ScrollArea>
  );
};

export default ListTimeTable;
