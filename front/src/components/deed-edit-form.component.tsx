// =========================== react =======================================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// =========================== yup =========================================
import { yupResolver } from "@hookform/resolvers/yup";

// =========================== mui =========================================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, FormControl, Paper, Typography } from "@mui/material";

// =========================== component ======================================
import TemporaryTypography from "./temporary-typography.component";
import { formSchema } from "./deed-edit.const";
import { ISingleDeed } from "@/pages/deeds/types/deed-single.interface";

const DeedEditForm = ({
  singleDeed,
  isEditable,
  fetchingErrors,
  isClicked,
  handleBack,
  handleDelete,
  setIsEditable,
  handleSave,
}: {
  singleDeed: ISingleDeed;
  isEditable: boolean;
  fetchingErrors: string | null;
  isClicked: boolean;
  handleBack: () => void;
  handleDelete: (s: string) => void;
  setIsEditable: (b: boolean) => void;
  handleSave: (deedDataForUpdate: ISingleDeed) => void;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISingleDeed>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<ISingleDeed> = (
    deedDataForUpdate: ISingleDeed
  ) => {
    handleSave({
      ...singleDeed,
      name: deedDataForUpdate.name,
      description: deedDataForUpdate.description,
    });
  };

  return (
    <Paper
      sx={{
        width: "90%",
        maxWidth: 800,
        backgroundColor: "#f0f8ff",
        justifyContent: "center",
        p: 3,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        {/***********************************  Name ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ minWidth: 90, width: 120 }}>Name:</Typography>

          <Controller
            name="name"
            control={control}
            render={() => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  variant="caption"
                  color={"red"}
                  display={!isEditable ? "block" : "none"}
                >
                  {errors.name?.message}
                </Typography>

                <TextField
                  sx={{
                    width: "100%",
                  }}
                  disabled={!isEditable}
                  defaultValue={singleDeed.name}
                  id="name"
                  variant="standard"
                  {...register("name")}
                />
              </Box>
            )}
          />
        </FormControl>

        {/***********************************  Description ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "up",
          }}
        >
          <Typography align="left" sx={{ minWidth: 90, width: 120 }}>
            Description:
          </Typography>

          <Controller
            name="description"
            control={control}
            render={() => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  variant="caption"
                  color={"red"}
                  display={!isEditable ? "block" : "none"}
                >
                  {errors.description?.message}
                </Typography>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  disabled={!isEditable}
                  defaultValue={singleDeed.description}
                  id="description"
                  variant="standard"
                  multiline
                  {...register("description")}
                />
              </Box>
            )}
          />
        </FormControl>

        {fetchingErrors && (
          <TemporaryTypography
            variant="overline"
            align="center"
            color="error"
            duration={10}
          >
            {fetchingErrors}
          </TemporaryTypography>
        )}

        {isClicked && !fetchingErrors && (
          <TemporaryTypography
            variant="overline"
            align="center"
            color="success.light"
            duration={10}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              <CheckCircleIcon />
              <Typography>Deed updated successfully</Typography>
            </Box>
          </TemporaryTypography>
        )}

        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "50px",
            gap: 2,
          }}
        >
          <Button
            sx={{
              width: "100%",
              display: isEditable ? "none" : null,
            }}
            variant="contained"
            color="success"
            disabled={isEditable}
            onClick={() => {
              setIsEditable(!isEditable);
            }}
          >
            EDIT
          </Button>

          <Button
            sx={{
              width: "100%",
              display: !isEditable ? "none" : null,
            }}
            type="submit"
            variant="contained"
            color="success"
            disabled={!isValid}
            onClick={() => {
              setIsEditable(!isEditable);
            }}
          >
            SAVE
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{
              width: "100%",
            }}
            onClick={() => handleDelete(singleDeed._id)}
          >
            DELETE
          </Button>

          <Button
            sx={{
              width: "100%",
            }}
            variant="contained"
            color="primary"
            onClick={handleBack}
          >
            BACK TO DEEDS
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default DeedEditForm;
