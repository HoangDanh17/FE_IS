"use client";
import React, { useState, ChangeEvent, useCallback, useMemo } from "react";
import dayjs from "dayjs";
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
import { useAppContext } from "@/app/app-provider";

interface CardItem {
  type: "card";
  title: string;
  description: string;
  progress: number;
  timestamp: number;
}

interface Comment {
  type: "comment";
  avatar: string;
  text: string;
  name: string;
  timestamp: number;
}

type CombinedItem = CardItem | Comment;

const getCardBackgroundColor = (progress: number) => {
  if (progress <= 25) return "#FDCF76";
  if (progress <= 50) return "#A0B4F2";
  if (progress <= 99) return "#F29BC4";
  return "#8EC9BB";
};

const DetailTaskModal = ({ selectedRow }: { selectedRow: TaskType }) => {
  const cards: CardItem[] = useMemo(
    () => [
      {
        type: "card",
        title: "26/06/2024",
        description: "Báo cáo ngày 26/06/2024",
        progress: 50,
        timestamp: 1624675200000,
      },
      {
        type: "card",
        title: "25/06/2024",
        description: "Báo cáo ngày 25/06/2024",
        progress: 70,
        timestamp: 1624588800000,
      },
      {
        type: "card",
        title: "24/06/2024",
        description: "Báo cáo ngày 24/06/2024",
        progress: 20,
        timestamp: 1624502400000,
      },
      {
        type: "card",
        title: "23/06/2024",
        description: "Báo cáo ngày 23/06/2024",
        progress: 80,
        timestamp: 1624416000000,
      },
      {
        type: "card",
        title: "22/06/2024",
        description: "Báo cáo ngày 22/06/2024",
        progress: 60,
        timestamp: 1624329600000,
      },
      {
        type: "card",
        title: "21/06/2024",
        description: "Báo cáo ngày 21/06/2024",
        progress: 90,
        timestamp: 1624243200000,
      },
      {
        type: "card",
        title: "20/06/2024",
        description: "Báo cáo ngày 20/06/2024",
        progress: 100,
        timestamp: 1624156800000,
      },
    ],
    []
  );

  const initialComments: Comment[][] = [
    [
      {
        type: "comment",
        avatar: "/images/avatar.jpg",
        text: "Great job on this task!",
        name: "John Doe",
        timestamp: 1624416000000,
      },
      {
        type: "comment",
        avatar: "/images/avatar.jpg",
        text: "I agree, well done!",
        name: "Jane Smith",
        timestamp: 1625014800000,
      },
    ],
    [
      {
        type: "comment",
        avatar: "/images/avatar.jpg",
        text: "Can we discuss this further?",
        name: "Alice Johnson",
        timestamp: 1625022000000,
      },
    ],
    [
      {
        type: "comment",
        avatar: "/images/avatar.jpg",
        text: "I have some concerns about this.",
        name: "thanh",
        timestamp: 1625025600000,
      },
      {
        type: "comment",
        avatar: "/images/avatar.jpg",
        text: "Let's schedule a meeting to talk about it.",
        name: "Charlie Brown",
        timestamp: 1625029200000,
      },
    ],
  ];

  const { user } = useAppContext();
  const [comment, setComment] = useState("");
  const [submittedComments, setSubmittedComments] =
    useState<Comment[][]>(initialComments);

  const handleCommentChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = useCallback(() => {
    console.log("Submitting comment:", comment);
    if (comment.trim()) {
      const newComment: Comment = {
        type: "comment",
        avatar: "/images/avatar.jpg",
        text: comment,
        name: user?.["user-name"] || "Me",
        timestamp: Date.now(),
      };
      setSubmittedComments((prev) => {
        const updatedComments = [...prev];
        const lastCardIndex = updatedComments.length - 1;
        updatedComments[lastCardIndex] = [
          ...updatedComments[lastCardIndex],
          newComment,
        ];
        return updatedComments;
      });
      setComment("");
      console.log("New comments:", submittedComments);
    }
  }, [comment, user]);

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

  const combinedData = useMemo(() => {
    const commentsWithCardIndex = submittedComments.flatMap((comments, index) =>
      comments.map((comment) => ({
        ...comment,
        cardIndex: index,
        type: "comment" as const,
      }))
    );
    const cardsWithType = cards.map((card, index) => ({
      ...card,
      type: "card" as const,
      cardIndex: index,
    }));
    const combinedArray: CombinedItem[] = [
      ...cardsWithType,
      ...commentsWithCardIndex,
    ];
    return combinedArray.sort((a, b) => a.timestamp - b.timestamp);
  }, [cards, submittedComments]);

  const isCardItem = (item: CombinedItem): item is CardItem => {
    return item.type === "card";
  };
  const formatDateTime = (timestamp: number) => {
    return dayjs(timestamp).format("DD/MM/YYYY HH:mm");
  };

  return (
    <Box display="flex" flexDirection="row" flex={1}>
      <Box flex={30} mr={2} maxHeight="500px">
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
                  label={getStatusLabel(selectedRow.status)}
                  style={{
                    ...getStatusChipColor(selectedRow.status),
                    fontWeight: "bold",
                  }}
                />
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                Người giao task:
              </Typography>
              <Tooltip title={selectedRow["assigned-name"]} arrow>
                <Typography
                  variant="body1"
                  noWrap
                  style={{ maxWidth: "150px" }}
                >
                  {selectedRow["assigned-name"]}
                </Typography>
              </Tooltip>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" fontWeight="bold">
                Đã xác nhận:
              </Typography>
              <Typography display="flex" alignItems="center">
                <Typography variant="body1">
                  {selectedRow["is-approved"] ? "Đã xác nhận" : "Chưa xác nhận"}
                </Typography>
                {selectedRow["is-approved"] ? (
                  <DoneAllIcon sx={{ color: "#00FF00", ml: 1 }} />
                ) : (
                  <CloseIcon sx={{ color: "#FF0000", ml: 1 }} />
                )}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" fontWeight="bold">
                Mô tả task:
              </Typography>
              <ScrollArea className="h-[145px] pr-2">
                <Typography
                  variant="body1"
                  style={{
                    maxWidth: "1200px",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                  }}
                >
                  {selectedRow.description}
                </Typography>
              </ScrollArea>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box flex={70} ml={2} maxHeight="500px">
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6" color="primary">
            Messenger Board
          </Typography>
          <ScrollArea style={{ height: "400px" }}>
            <Stack spacing={2} paddingRight={2} paddingBottom={2}>
              {combinedData.map((item, index) => (
                <React.Fragment key={index}>
                  {isCardItem(item) ? (
                    <Box
                      bgcolor={getCardBackgroundColor(item.progress)}
                      color="white"
                      p={2}
                      borderRadius={2}
                      mb={1}
                      minHeight="80px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="textPrimary"
                      >
                        Report
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formatDateTime(item.timestamp)}
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      key={index}
                      display="flex"
                      justifyContent={
                        item.name === user?.["user-name"]
                          ? "flex-end"
                          : "flex-start"
                      }
                      width="100%"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        flexDirection={
                          item.name === user?.["user-name"]
                            ? "row-reverse"
                            : "row"
                        }
                        bgcolor={
                          item.name === user?.["user-name"]
                            ? "#e0f7fa"
                            : "#f5f5f5"
                        }
                        p={2}
                        borderRadius={2}
                        mb={1}
                        maxWidth="70%"
                      >
                        <Avatar src={item.avatar} alt={item.name} />
                        <Box
                          ml={item.name === user?.["user-name"] ? 0 : 2}
                          mr={item.name === user?.["user-name"] ? 2 : 0}
                        >
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems={
                              item.name === user?.["user-name"]
                                ? "flex-end"
                                : "flex-start"
                            }
                          >
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color="textPrimary"
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body1"
                              style={{
                                maxWidth: '100%',
                                wordBreak: 'break-all',
                                overflowWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                              }}
                            >
                              {item.text}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {formatDateTime(item.timestamp)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </ScrollArea>
        </Box>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          gap={2}
          style={{
            marginTop: "auto",
          }}
        >
          <TextField
            label="Nhập bình luận"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={comment}
            onChange={handleCommentChange}
            style={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
            style={{
              flexShrink: 0,
              marginLeft: "10px",
              alignSelf: "flex-end",
            }}
            disabled={comment.trim() === ""}
          >
            Gửi
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailTaskModal;
