"use client";
import React, { useState, ChangeEvent } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  Divider,
  Card,
  CardContent,
  Tooltip,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskType } from "@/schemaValidations/task.schema";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
interface AccordionItem {
  title: string;
  description: string;
  progress: number;
}

interface Comment {
  avatar: string;
  text: string;
  name: string;
}

const getAccordionBackgroundColor = (progress: number) => {
  if (progress <= 25) return "#FDCF76";
  if (progress <= 50) return "#A0B4F2";
  if (progress <= 99) return "#F29BC4";
  return "#8EC9BB";
};

const CustomAccordionSummary = styled(AccordionSummary)<{ progress: number }>(
  ({ theme, progress }) => ({
    backgroundColor: getAccordionBackgroundColor(progress), // Dynamic background color
    color: theme.palette.primary.dark,
    "& .MuiAccordionSummary-content": {
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.contrastText,
    },
  })
);

const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
}));

const DetailTaskModal = ({ selectedRow }: { selectedRow: TaskType }) => {
  console.log(selectedRow);
  const theme = useTheme();
  const accordions: AccordionItem[] = [
    { title: "Title 1 ", description: "Description 1", progress: 50 },
    { title: "Title 2", description: "Description 2", progress: 70 },
    { title: "Title 3", description: "Description 3", progress: 20 },
    { title: "Title 4", description: "Description 4", progress: 80 },
    { title: "Title 5", description: "Description 5", progress: 60 },
    { title: "Title 6", description: "Description 6", progress: 90 },
    { title: "Title 7", description: "Description 7", progress: 100 },
  ];

  const initialComments: Comment[][] = [
    [
      {
        avatar: "/images/avatar.jpg",
        text: "Great job on this task!",
        name: "John Doe",
      },
      {
        avatar: "/images/avatar.jpg",
        text: "I agree, well done!",
        name: "Jane Smith",
      },
    ],
    [
      {
        avatar: "/images/avatar.jpg",
        text: "Can we discuss this further?",
        name: "Alice Johnson",
      },
    ],
    [
      {
        avatar: "/images/avatar.jpg",
        text: "I have some concerns about this.",
        name: "Bob Williams",
      },
      {
        avatar: "/images/avatar.jpg",
        text: "Let's schedule a meeting to talk about it.",
        name: "Charlie Brown",
      },
    ],
  ];

  const [comments, setComments] = useState<string[]>(
    Array(accordions.length).fill("")
  );
  const [submittedComments, setSubmittedComments] = useState<Comment[][]>(
    accordions.map((_, index) => initialComments[index] || [])
  );

  const handleCommentChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newComments = [...comments];
    newComments[index] = event.target.value;
    setComments(newComments);
  };

  const handleCommentSubmit = (index: number) => {
    const newSubmittedComments = [...submittedComments];
    newSubmittedComments[index] = [
      ...newSubmittedComments[index],
      {
        avatar: "/images/avatar.jpg",
        text: comments[index],
        name: "Me",
      },
    ];
    setSubmittedComments(newSubmittedComments);

    const newComments = [...comments];
    newComments[index] = "";
    setComments(newComments);
  };

  const taskName =
    "Thiết kế giao diện website cực dài có nhiều chi tiết cần hiển thị";
  const description =
    "Thiết kế giao diện người dùng cho website bán hàng, bao gồm trang chủ, trang sản phẩm, và trang giỏ hàng. Đảm bảo rằng tất cả các thành phần UI/UX đều thân thiện với người dùng và dễ sử dụng. Ngoài ra, cần phải tuân thủ các nguyên tắc thiết kế hiện đại và phù hợp với thương hiệu của công ty.";

  const assignedPerson = {
    name: "Nguyễn Văn A",
    status: "in_progress",
    estHour: "2 tiếng",
    actHour: "1 tiếng 59 phút",
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "not_start":
        return 0;
      case "in_progress":
        return 50;
      case "done":
        return 100;
      case "cancel":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <Box display="flex" flexDirection="row">
      <Box display="flex" flexDirection="column" flex={3}>
        {/* Phần 1 */}
        <Box mb={2}>
          <Typography variant="h6" color="primary">
            Thông tin công việc
          </Typography>
          <Card className="border m-4 shadow-md">
            <CardContent>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Tooltip title={selectedRow.name} arrow>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    noWrap
                    style={{ maxWidth: "280px", display: "flex" }}
                  >
                    Tên công việc:&#160;
                    <Typography>{selectedRow.name}</Typography>
                  </Typography>
                </Tooltip>
                <Typography variant="body1" fontWeight="bold" className="flex">
                  Trạng thái:&#160;
                  <Typography>{selectedRow.status}</Typography>
                </Typography>
                <Typography variant="body1" fontWeight="bold" className="flex">
                  Tình trạng task:&#160;
                  <Typography
                    style={{
                      color: selectedRow["is-approved"] ? "#00FF00" : "#FF0000",
                    }}
                  >
                    {selectedRow["is-approved"] ? (
                      <>
                        <DoneAllIcon style={{ color: "#00FF00" }} />
                        &#160;{selectedRow["is-approved"]}
                      </>
                    ) : (
                      <>
                        <CloseIcon style={{ color: "#FF0000" }} />
                        &#160;{selectedRow["is-approved"]}
                      </>
                    )}
                  </Typography>
                </Typography>
              </Stack>
              <Tooltip title={selectedRow.description} arrow>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  noWrap
                  style={{ maxWidth: "600px", display: "flex" }}
                >
                  Miêu tả:&#160;
                  <Typography>{selectedRow.description}</Typography>
                </Typography>
              </Tooltip>
            </CardContent>
          </Card>
        </Box>

        {/* Phần 2 */}
        <Box flexGrow={1}>
          <Typography variant="h6" color="primary">
            Các báo cáo
          </Typography>
          <ScrollArea className="h-[350px] p-5  rounded-md m-4 shadow-lg border">
            <Stack spacing={2}>
              {accordions.map((accordion, index) => (
                <Accordion
                  key={index}
                  sx={{ backgroundColor: theme.palette.background.default }}
                  className="border rounded-lg"
                >
                  <CustomAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                    progress={accordion.progress}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      flexGrow={1}
                    >
                      <Tooltip title={accordion.title} arrow>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          noWrap
                          style={{ maxWidth: "150px" }}
                        >
                          {accordion.title}
                        </Typography>
                      </Tooltip>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{ marginLeft: "10px" }}
                      >
                        <Typography
                          variant="body2"
                          style={{ fontSize: 15, fontWeight: 700 }}
                        >
                          {accordion.progress}%
                        </Typography>
                      </Box>
                    </Box>
                  </CustomAccordionSummary>
                  <CustomAccordionDetails>
                    <Typography>{accordion.description}</Typography>
                    <TextField
                      fullWidth
                      label="Comment"
                      variant="outlined"
                      margin="normal"
                      value={comments[index]}
                      onChange={(event) => handleCommentChange(index, event)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCommentSubmit(index)}
                    >
                      Submit
                    </Button>
                    <Box mt={2}>
                      {submittedComments[index]?.map(
                        (comment, commentIndex) => (
                          <React.Fragment key={commentIndex}>
                            {commentIndex > 0 && <Divider sx={{ my: 2 }} />}
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                              mt={commentIndex === 0 ? 0 : 2}
                            >
                              <Box
                                position="relative"
                                pl={7}
                                mt={commentIndex === 0 ? 0 : 2}
                              >
                                <Avatar
                                  src={comment.avatar}
                                  sx={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                  }}
                                />
                                <Box>
                                  <Typography variant="body1" fontWeight="bold">
                                    {comment.name}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      wordBreak: "break-word",
                                      overflowWrap: "break-word",
                                      maxWidth: "100%",
                                    }}
                                  >
                                    {comment.text}
                                  </Typography>
                                </Box>
                              </Box>
                            </Stack>
                          </React.Fragment>
                        )
                      )}
                    </Box>
                  </CustomAccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </ScrollArea>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />
      {/* Phần 3 */}
      <Box flex={1} ml={2}>
        <Typography variant="h6" color="primary">
          Thông tin người được giao
        </Typography>
        <Box mb={2}>
          <Stack spacing={2} className="mt-6">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                Tên người được giao:
              </Typography>
              <Typography variant="body1">
                {selectedRow["assigned-name"]}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                Trạng thái công việc:
              </Typography>
              <Typography variant="body1">{selectedRow.status}</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                Thời gian cho task(dự tính):
              </Typography>
              <Typography variant="body1">
                {selectedRow["estimated-effort"]}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                Thời gian cho task(thực tế):
              </Typography>
              <Typography variant="body1">
                {selectedRow["Actual-effort"]}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Tiến độ công việc:
              </Typography>
              <Box display="flex" alignItems="center" mt={2}>
                <LinearProgress
                  variant="determinate"
                  value={getStatusProgress(assignedPerson.status)}
                  style={{ width: "100%", marginRight: "10px" }}
                />
                <Typography variant="body2" color="textSecondary">
                  {getStatusProgress(assignedPerson.status)}%
                </Typography>
              </Box>
              {assignedPerson.status === "cancel" && (
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Progress reset to 0 due to cancellation
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailTaskModal;
