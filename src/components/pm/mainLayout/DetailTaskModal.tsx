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
import { Divider, Card, CardContent, Tooltip } from "@mui/material";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AccordionItem {
  title: string;
  description: string;
}

interface Comment {
  avatar: string;
  text: string;
  name: string;
}

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200], // Màu nền tùy chỉnh
  color: theme.palette.text.primary, // Màu chữ tùy chỉnh
  "& .MuiAccordionSummary-content": {
    alignItems: "center",
  },
}));

const DetailTaskModal = () => {
  const accordions: AccordionItem[] = [
    { title: "Title 1", description: "Description 1" },
    { title: "Title 2", description: "Description 2" },
    { title: "Title 3", description: "Description 3" },
    { title: "Title 4", description: "Description 4" },
    { title: "Title 5", description: "Description 5" },
    { title: "Title 6", description: "Description 6" },
    { title: "Title 7", description: "Description 7" },
  ];

  const initialComments: Comment[][] = [
    [
      {
        avatar: "/static/images/avatar/1.jpg",
        text: "Great job on this task!",
        name: "John Doe",
      },
      {
        avatar: "/static/images/avatar/2.jpg",
        text: "I agree, well done!",
        name: "Jane Smith",
      },
    ],
    [
      {
        avatar: "/static/images/avatar/3.jpg",
        text: "Can we discuss this further?",
        name: "Alice Johnson",
      },
    ],
    [
      {
        avatar: "/static/images/avatar/4.jpg",
        text: "I have some concerns about this.",
        name: "Bob Williams",
      },
      {
        avatar: "/static/images/avatar/5.jpg",
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
        avatar: "/static/images/avatar/1.jpg",
        text: comments[index],
        name: "Default Name",
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
    status: "Đang tiến hành",
    type: "BE",
    dueDate: "25-06-2024",
  };

  return (
    <Box display="flex" flexDirection="row">
      <Box display="flex" flexDirection="column" flex={3}>
        {/* Phần 1 */}
        <Box mb={2}>
          <Typography variant="h6">Thông tin công việc</Typography>
          <Card className="border m-4 shadow-md">
            <CardContent>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Tooltip title={taskName} arrow>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    noWrap
                    style={{ maxWidth: "280px" }}
                  >
                    Tên công việc: {taskName}
                  </Typography>
                </Tooltip>
                <Typography variant="body1" color="textSecondary">
                  Trạng thái: Đang tiến hành
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Ngày tạo: 18-06-2024
                </Typography>
              </Stack>
              <Tooltip title={description} arrow>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap
                  style={{ maxWidth: "600px" }}
                >
                  Miêu tả: {description}
                </Typography>
              </Tooltip>
            </CardContent>
          </Card>
        </Box>

        {/* Phần 2 */}
        <Box flexGrow={1}>
          <Typography variant="h6">Các báo cáo</Typography>
          <ScrollArea className="h-[350px] p-5  rounded-md m-4 shadow-lg border">
            <Stack spacing={2}>
              {accordions.map((accordion, index) => (
                <Accordion key={index}>
                  <CustomAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <Typography>{accordion.title}</Typography>
                  </CustomAccordionSummary>
                  <AccordionDetails style={{ backgroundColor: "#FFFFF0" }}>
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
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </ScrollArea>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />
      {/* Phần 3 */}
      <Box flex={1} ml={2}>
        <Typography variant="h6">Thông tin người được giao</Typography>
        <Box mb={2}>
          <Stack spacing={2} className="mt-6">
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Typography variant="body1" fontWeight="bold">
                Tên người được giao:
              </Typography>
              <Typography variant="body1">{assignedPerson.name}</Typography>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Typography variant="body1" fontWeight="bold">
                Trạng thái công việc:
              </Typography>
              <Typography variant="body1">{assignedPerson.status}</Typography>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Typography variant="body1" fontWeight="bold">
                Dạng công việc:
              </Typography>
              <Typography variant="body1">{assignedPerson.type}</Typography>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Typography variant="body1" fontWeight="bold">
                Ngày hết hạn:
              </Typography>
              <Typography variant="body1">{assignedPerson.dueDate}</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailTaskModal;
