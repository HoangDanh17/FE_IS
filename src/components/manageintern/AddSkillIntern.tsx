import React, { useEffect, useState } from "react";
import technicalApiRequest from "@/apiRequests/technical";
import { InternByIdResType } from "@/schemaValidations/intern.schema";
import { TechnicalType } from "@/schemaValidations/technical.schema";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import internApiRequest from "@/apiRequests/intern";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

type Skill = {
  "technical-skill": string;
  "skill-level": string;
  isOriginal: boolean;
};

const AddSkillIntern = ({
  id,
  technicalList,
  handleClose,
}: {
  id: string | undefined;
  technicalList: InternByIdResType | undefined;
  handleClose: () => void;
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [availableSkills, setAvailableSkills] = useState<TechnicalType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    if (technicalList?.data?.["detail-skill"]) {
      const originalSkills = technicalList.data["detail-skill"].map(
        (skill) => ({
          ...skill,
          isOriginal: true,
        })
      );
      setSkills(originalSkills);
    }
  }, [technicalList]);

  useEffect(() => {
    technicalApiRequest.getListTechnical().then(({ payload }) => {
      setAvailableSkills(payload.data);
    });
  }, []);

  const handleChange = (newValue: TechnicalType | null, index: number) => {
    if (newValue) {
      const updatedSkills = [...skills];
      updatedSkills[index] = {
        "technical-skill": newValue["Technical-skill"],
        "skill-level": skills[index] ? skills[index]["skill-level"] : "basic", // default to basic if not set
        isOriginal: false,
      };
      setSkills(updatedSkills);
    }
  };

  const handleDeleteSkill = (index: number) => {
    setOpenDialog(true);
    setDeleteIndex(index);
  };

  const handleAddSkill = () => {
    setSkills([
      ...skills,
      {
        "technical-skill": "",
        "skill-level": "basic",
        isOriginal: false,
      },
    ]);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedSkills = [...skills];
      updatedSkills.splice(deleteIndex, 1);
      setSkills(updatedSkills);
      setDeleteIndex(null);
      setOpenDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    const formattedSkills = skills.map((skill) => ({
      "technical-skill": skill["technical-skill"],
      "skill-level": skill["skill-level"],
    }));

    const payload = {
      "skill-level": formattedSkills.map((skill) => skill["skill-level"]),
      skills: formattedSkills
        .map((skill) => {
          const foundSkill = availableSkills.find(
            (s) => s["Technical-skill"] === skill["technical-skill"]
          );
          return foundSkill ? foundSkill.id : null; 
        })
        .filter((id) => id !== null),
    };

    console.log("Submit payload:", payload);
    internApiRequest
      .updateInternSkill(id, payload)
      .then((response) => {
        toast({
          title: `${response.payload.message}`,
          duration: 2000,
          variant: "success",
        });
        handleClose();
      })
      .catch((error) => {
        toast({
          title: `${error}`,
          duration: 2000,
          variant: "destructive",
        });
      });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography variant="h4">Thêm kĩ năng</Typography>
      <ScrollArea className="h-[450px] p-5">
        {skills.map((skill, index) => (
          <Box
            display="flex"
            alignItems="center"
            key={index}
            style={{ marginTop: 20 }}
          >
            <Autocomplete
              disablePortal
              id={`skill-select-${index}`}
              options={availableSkills}
              getOptionLabel={(option) => option["Technical-skill"]}
              value={
                availableSkills.find(
                  (opt) => opt["Technical-skill"] === skill["technical-skill"]
                ) || null
              }
              onChange={(event, newValue) => handleChange(newValue, index)}
              renderInput={(params) => (
                <TextField {...params} label="Kỹ năng kỹ thuật" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionDisabled={(option) =>
                skills.some(
                  (s, i) =>
                    i !== index &&
                    s["technical-skill"] === option["Technical-skill"]
                )
              }
              fullWidth
            />
            <TextField
              select
              label="Trình độ"
              value={skill["skill-level"]}
              onChange={(e) => {
                const level = e.target.value as string;
                const updatedSkills = [...skills];
                updatedSkills[index] = {
                  ...updatedSkills[index],
                  "skill-level": level,
                };
                setSkills(updatedSkills);
              }}
              SelectProps={{
                native: true,
              }}
              fullWidth
              sx={{ marginLeft: 2 }}
            >
              <option value="basic">Cơ bản</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
            </TextField>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteSkill(index)}
            >
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          </Box>
        ))}
        <Button
          onClick={handleAddSkill}
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: "#94a3b8",
            color: "#334155",
          }}
          startIcon={<AddIcon />}
        >
          Thêm kỹ năng
        </Button>
      </ScrollArea>
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: 20, float: "right" }}
      >
        Xác nhận
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa kĩ năng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddSkillIntern;
