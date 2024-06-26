"use client";
import React, { useState, ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Divider, Chip, Tooltip, LinearProgress } from "@mui/material";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskType } from "@/schemaValidations/task.schema";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";

interface CardItem {
  title: string;
  description: string;
  progress: number;
}

interface Comment {
  avatar: string;
  text: string;
  name: string;
}

const getCardBackgroundColor = (progress: number) => {
  if (progress <= 25) return "#FDCF76";
  if (progress <= 50) return "#A0B4F2";
  if (progress <= 99) return "#F29BC4";
  return "#8EC9BB";
};

const DetailTaskModal = ({ selectedRow }: { selectedRow: TaskType }) => {
  const cards: CardItem[] = [
    {
      title: "26/06/2024",
      description: "Báo cáo ngày 26/06/2024",
      progress: 50,
    },
    {
      title: "25/06/2024",
      description: "Báo cáo ngày 25/06/2024",
      progress: 70,
    },
    {
      title: "24/06/2024",
      description: "Báo cáo ngày 24/06/2024",
      progress: 20,
    },
    {
      title: "23/06/2024",
      description: "Báo cáo ngày 23/06/2024",
      progress: 80,
    },
    {
      title: "22/06/2024",
      description: "Báo cáo ngày 22/06/2024",
      progress: 60,
    },
    {
      title: "21/06/2024",
      description: "Báo cáo ngày 21/06/2024",
      progress: 90,
    },
    {
      title: "20/06/2024",
      description: "Báo cáo ngày 20/06/2024",
      progress: 100,
    },
  ];

  // Thêm một state mới để lưu trữ chi tiết báo cáo
  const [reportDetails, setReportDetails] = useState<string[]>([
    "Hôm nay tôi đã hoàn thành việc thiết kế giao diện người dùng cho trang chủ. Tôi đã sử dụng Figma để tạo wireframe và prototype. Tôi gặp một số khó khăn trong việc tối ưu hóa layout cho các thiết bị di động, nhưng đã giải quyết được bằng cách sử dụng CSS Grid.",
    "Tôi đã bắt đầu phát triển backend API cho chức năng đăng nhập và đăng ký. Tôi đã sử dụng Node.js với Express và đã thiết lập cơ sở dữ liệu MongoDB. Tôi đã gặp một số vấn đề với việc xử lý lỗi, nhưng đã giải quyết được bằng cách sử dụng middleware.",
    "Hôm nay tôi tập trung vào việc tối ưu hóa hiệu suất của ứng dụng. Tôi đã sử dụng công cụ profiling để xác định các bottleneck và đã thực hiện một số cải tiến, bao gồm việc thêm caching và lazy loading cho một số component.",
    "Tôi đã làm việc trên chức năng tìm kiếm của ứng dụng. Tôi đã triển khai full-text search sử dụng Elasticsearch và đã tích hợp nó với backend API. Tôi cũng đã thêm chức năng gợi ý tìm kiếm realtime.",
    "Hôm nay tôi đã thực hiện kiểm thử đơn vị cho các component React. Tôi đã sử dụng Jest và React Testing Library. Tôi đã viết được khoảng 50 test case và đã đạt được độ bao phủ khoảng 80%.",
    "Tôi đã làm việc trên việc tích hợp thanh toán vào ứng dụng. Tôi đã sử dụng Stripe API và đã triển khai chức năng thanh toán một lần và thanh toán định kỳ. Tôi gặp một số khó khăn với việc xử lý webhook, nhưng đã giải quyết được.",
    "Hôm nay là ngày cuối cùng của sprint. Tôi đã hoàn thành việc fix các bug còn lại và đã chuẩn bị cho buổi demo với khách hàng. Tôi cũng đã cập nhật tài liệu kỹ thuật và hướng dẫn sử dụng cho phiên bản mới.",
  ]);

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
    Array(cards.length).fill("")
  );
  const [submittedComments, setSubmittedComments] = useState<Comment[][]>(
    cards.map((_, index) => initialComments[index] || [])
  );
  const [selectedComments, setSelectedComments] = useState<Comment[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const handleCommentChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (selectedCardIndex !== null) {
      const newComments = [...comments];
      newComments[selectedCardIndex] = event.target.value;
      setComments(newComments);
    }
  };

  const handleCommentSubmit = () => {
    if (selectedCardIndex !== null) {
      const newSubmittedComments = [...submittedComments];
      newSubmittedComments[selectedCardIndex] = [
        ...newSubmittedComments[selectedCardIndex],
        {
          avatar: "/images/avatar.jpg",
          text: comments[selectedCardIndex],
          name: "Me",
        },
      ];
      setSubmittedComments(newSubmittedComments);

      const newComments = [...comments];
      newComments[selectedCardIndex] = "";
      setComments(newComments);

      if (selectedComments === submittedComments[selectedCardIndex]) {
        setSelectedComments(newSubmittedComments[selectedCardIndex]);
      }
    }
  };
  const [selectedReportDetail, setSelectedReportDetail] = useState<string>("");
  const handleCardClick = (index: number) => {
    setSelectedComments(submittedComments[index]);
    setSelectedCardIndex(index);
    setSelectedReportDetail(reportDetails[index]);
  };

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

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "todo":
        return { backgroundColor: "#FFB6C1", color: "white" };
      case "inprogress":
        return { backgroundColor: "#87CEEB", color: "white" };
      case "done":
        return { backgroundColor: "#90EE90", color: "white" };
      case "cancel":
        return { backgroundColor: "#FFA07A", color: "white" };
      default:
        return { backgroundColor: "#D3D3D3", color: "white" };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "todo":
        return "Chưa bắt đầu";
      case "inprogress":
        return "Đang thực hiện";
      case "done":
        return "Hoàn thành";
      case "cancel":
        return "Hủy bỏ";
      default:
        return "Không xác định";
    }
  };

  const getCardStyle = (index: number) => ({
    backgroundColor: getCardBackgroundColor(cards[index].progress),
    cursor: "pointer",
    border: selectedCardIndex === index ? "2px solid #000" : "none",
    boxShadow:
      selectedCardIndex === index ? "0 0 10px rgba(0,0,0,0.5)" : "none",
  });

  return (
    <Box display="flex" flexDirection="row" flex={1}>
      <Box flex={1} mr={2} maxHeight="500px">
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
                Thời gian (dự tính):
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
                Thời gian (thực tế):
              </Typography>
              <Typography variant="body1">
                {selectedRow["actual-effort"]}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Typography variant="h6" color="primary">
          Chi tiết task
        </Typography>
        <Box mb={2}>
          <Stack spacing={2} className="mt-4">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                Tên task:
              </Typography>
              <Tooltip title={selectedRow.name} arrow>
                <Typography
                  variant="body1"
                  noWrap
                  style={{ maxWidth: "150px" }}
                >
                  {selectedRow.name}
                </Typography>
              </Tooltip>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                Trạng thái:
              </Typography>
              <Typography variant="body1">
                <Chip
                  size="small"
                  label={getStatusLabel(selectedRow.status)}
                  sx={getStatusChipColor(selectedRow.status)}
                />
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                Xác nhận:
              </Typography>
              <Typography variant="body1" fontWeight="bold" className="flex">
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
                  Progress reset to 0% due to task cancellation.
                </Typography>
              )}
            </Box>
            <Box display="flex" flexDirection="column" width="320px">
              <Typography variant="body1" fontWeight="bold">
                Mô tả task:
              </Typography>
              <ScrollArea className="h-[200px] pr-2">
                <Typography
                  variant="body1"
                  noWrap
                  style={{
                    maxWidth: "350px",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                  }}
                >
                  {selectedRow.description}ssssssss sssss sss s s s s ss ss s s
                  s s s s s s s s s s s ss s s s s s s s s s s s s ss ss s s s
                  ss s s s s s ss s s s s s s s s s s s s ss s s s s s s s s s s
                  s s s s s s ss s s s s s s s s s s s s s ss s s s s s s s s s
                  s s s s s ss s s s s s s s s s s s s ss s s s s s s s s s s s
                  s ss s s s s s s s s s s s s s s s ss s s s s s s s s s s s s
                  s s s s s s s s s s s s s s s s s s s s s s s s s s s s s s ss
                  s ss s s s s ss s s s s s s s s ss s s s s s s s s s s s s s s
                  s s s ss s s s s s s s s s s s s s s s s ss s s s s s s s s s
                  ss s s s s s s s s s s s s s s s s s ss s s s s s s s
                </Typography>
              </ScrollArea>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box display="flex" flexDirection="column" flex={2}>
        <Box flexGrow={1} height="60%">
          <Typography variant="h6" color="primary" className="ml-2">
            Các báo cáo
          </Typography>
          <ScrollArea className="h-[530px] p-5 rounded-md m-4 shadow-lg border">
            <Stack spacing={2}>
              {cards.map((card, index) => (
                <Card
                  key={index}
                  sx={getCardStyle(index)}
                  onClick={() => handleCardClick(index)}
                  className="border rounded-lg"
                >
                  <CardActionArea>
                    <CardContent>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        flexGrow={1}
                      >
                        <Tooltip title={card.title} arrow>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            noWrap
                            style={{ maxWidth: "150px" }}
                          >
                            {card.title}
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
                            {card.progress}%
                          </Typography>
                        </Box>
                      </Box>
                      {/* <Typography mt={2}>{card.description}</Typography> */}
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          </ScrollArea>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box display="flex" flexDirection="column" flex={3}>
        <Typography variant="h6" color="primary" className="ml-2">
          Chi tiết báo cáo
        </Typography>
        <ScrollArea className="h-[110px] w-full">
          <Box mb={2} mx={2} marginTop="10px">
            <Typography
              variant="body1"
              style={{
                maxWidth: "800px",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
              }}
            >
              {selectedReportDetail}
            </Typography>
          </Box>
        </ScrollArea>
        <Typography variant="h6" color="primary" className="ml-2">
          Các bình luận
        </Typography>
        <ScrollArea className="h-[250px] p-5 rounded-md m-4 shadow-lg border">
          <Box>
            {selectedComments.map((comment, commentIndex) => (
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
                          maxWidth: "600px",
                        }}
                      >
                        {comment.text}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </React.Fragment>
            ))}
          </Box>
        </ScrollArea>
        <Box mt={2} mx={2}>
          <TextField
            fullWidth
            placeholder="Write a comment..."
            multiline
            required
            rows={2}
            variant="outlined"
            value={
              selectedCardIndex !== null ? comments[selectedCardIndex] : ""
            }
            onChange={handleCommentChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
            sx={{ mt: 2, float: "right" }}
            disabled={
              selectedCardIndex === null ||
              (selectedCardIndex !== null &&
                comments[selectedCardIndex].trim() === "")
            }
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailTaskModal;
