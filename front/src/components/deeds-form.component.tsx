import { ISingleDeed } from "@/pages/deeds/types/deed-single.interface";
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const DeedForm = ({ deeds }: { deeds: ISingleDeed[] }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const correctDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "100%",
      }}
    >
      {deeds.map((item, index) => {
        return (
          <Paper
            sx={{
              width: "90%",
              backgroundColor: "#f0f8ff",
              justifyContent: "space-between",
              p: 3,
              margin: "16px",
              display: "flex",
              flexDirection: "row",
            }}
            key={index}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>name: {item.name}</Typography>
              <Typography
                variant="overline"
                align="left"
                sx={{ minWidth: 90, width: 120 }}
              >
                desc: {item.description}
              </Typography>
              <Typography>Created: {correctDate(item.created)}</Typography>
              <Typography>Updated: {correctDate(item.updated)}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => console.log("edit")}
              >
                EDIT
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "100%",
                }}
                onClick={() => console.log("delete")}
              >
                DELETE
              </Button>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default DeedForm;
