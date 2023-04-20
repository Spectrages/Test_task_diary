// =========================== react =======================================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// =========================== yup =========================================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./deed-create.const";

// =========================== mui =========================================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, FormControl, Paper, Typography } from "@mui/material";

// =========================== component ======================================
import TemporaryTypography from "./temporary-typography.component";

// =========================== interfaces =====================================
import { ISingleDeedCreate } from "@/types/deeds/deed-create.interface";

const DeedCreateForm = ({
  fetchingErrors,
  handleBack,
  handleSave,
}: {
  fetchingErrors: string | null;
  handleBack: () => void;
  handleSave: (deedDataForUpdate: ISingleDeedCreate) => void;
}) => {
  //======== form register ========
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISingleDeedCreate>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<ISingleDeedCreate> = (
    deedDataForCreate: ISingleDeedCreate
  ) => {
    handleSave(deedDataForCreate);
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
                <Typography variant="caption" color={"red"}>
                  {errors.name?.message}
                </Typography>

                <TextField
                  sx={{
                    width: "100%",
                  }}
                  defaultValue=""
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
                <Typography variant="caption" color={"red"}>
                  {errors.description?.message}
                </Typography>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  defaultValue=""
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
            }}
            type="submit"
            variant="contained"
            color="success"
            disabled={!isValid}
          >
            SAVE
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

export default DeedCreateForm;
