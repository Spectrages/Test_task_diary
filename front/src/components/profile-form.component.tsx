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
import { formSchema } from "./profile-form.const";

interface IUserSessionDto {
  _id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  rating: number;
  tag: string;
  email: string;
  created: number;
  updated: number;
}

const ProfileForm = ({
  currentUser,
  isEditable,
  fetchingErrors,
  isClicked,
  handleBack,
  handleDelete,
  setIsEditable,
  handleSave,
}: {
  currentUser: IUserSessionDto;
  isEditable: boolean;
  fetchingErrors: string | null;
  isClicked: boolean;
  handleBack: () => void;
  handleDelete: (s: string) => void;
  setIsEditable: (b: boolean) => void;
  handleSave: (userDataForUpdate: IUserSessionDto) => void;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserSessionDto>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const removeEmptyFields = (obj: IUserSessionDto): IUserSessionDto => {
    const newObj = Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== (null || undefined))
    );
    return newObj as IUserSessionDto;
  };

  const correctDate = (date: number) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  const onSubmit: SubmitHandler<IUserSessionDto> = (
    userDataForUpdate: IUserSessionDto
  ) => {
    const userData = removeEmptyFields(userDataForUpdate);
    handleSave(userData);
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
      <Typography variant="h6" fontWeight={"bold"} pb={1}>
        Profile: {currentUser.firstname} {currentUser.middlename || null}{" "}
        {currentUser.lastname}
      </Typography>

      <form
        id="userEdit"
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        {/***********************************  Email ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ minWidth: 90, width: 120 }}>Email:</Typography>

          <Controller
            name="email"
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
                  {errors.email?.message}
                </Typography>

                <TextField
                  sx={{
                    width: "100%",
                  }}
                  disabled={!isEditable}
                  defaultValue={currentUser?.email}
                  id="email"
                  variant="standard"
                  {...register("email")}
                />
              </Box>
            )}
          />
        </FormControl>

        {/***********************************  Tag ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            Tag:
          </Typography>

          <Controller
            name="tag"
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
                  {errors.tag?.message}
                </Typography>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  disabled={!isEditable}
                  defaultValue={currentUser?.tag}
                  id="tag"
                  variant="standard"
                  {...register("tag")}
                />
              </Box>
            )}
          />
        </FormControl>

        {/***********************************  Firstname ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            Firstname:
          </Typography>

          <Controller
            name="firstname"
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
                  {errors.firstname?.message}
                </Typography>

                <TextField
                  sx={{
                    width: "100%",
                  }}
                  disabled={!isEditable}
                  defaultValue={currentUser?.firstname}
                  id="firstname"
                  variant="standard"
                  {...register("firstname")}
                />
              </Box>
            )}
          />
        </FormControl>

        {/***********************************  Middlename ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            Middlename:
          </Typography>

          <Controller
            name="middlename"
            control={control}
            render={() => (
              <TextField
                sx={{
                  width: "100%",
                }}
                disabled={!isEditable}
                defaultValue={currentUser?.middlename}
                id="middlename"
                variant="standard"
                {...register("middlename")}
              />
            )}
          />
        </FormControl>

        {/***********************************  Lastname ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            Lastname:
          </Typography>

          <Controller
            name="lastname"
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
                  {errors.firstname?.message}
                </Typography>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  defaultValue={currentUser?.lastname}
                  id="lastname"
                  variant="standard"
                  disabled={!isEditable}
                  {...register("lastname")}
                />
              </Box>
            )}
          />
        </FormControl>

        {/***********************************  Good deed rating ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            Rating:
          </Typography>
          <TextField
            sx={{
              width: "100%",
            }}
            defaultValue={currentUser?.rating}
            id="rating"
            variant="standard"
            disabled={true}
            {...register("rating")}
          />
        </FormControl>

        {/***********************************  Created ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            Created:
          </Typography>
          <TextField
            sx={{
              width: "100%",
            }}
            defaultValue={correctDate(currentUser?.created)}
            id="created"
            variant="standard"
            disabled={true}
            {...register("created")}
          />
        </FormControl>

        {/***********************************  Updated ***********************************/}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            align="left"
            sx={{ minWidth: 90, width: 120 }}
          >
            Last updated:
          </Typography>
          <TextField
            sx={{
              width: "100%",
            }}
            defaultValue={correctDate(currentUser?.updated)}
            id="updated"
            variant="standard"
            disabled={true}
            {...register("updated")}
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
              <Typography>Account updated successfully</Typography>
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
            form="userEdit"
          >
            SAVE
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{
              width: "100%",
            }}
            onClick={() => handleDelete(currentUser._id)}
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

export default ProfileForm;
