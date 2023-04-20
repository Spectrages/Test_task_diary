// ========================== react ==========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ============================
import { formSchema } from "./signUp-form.const";
import { yupResolver } from "@hookform/resolvers/yup";

// ========================== mui ============================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

// ========================== interfaces =====================

// ========================== components ======================
import TemporaryTypography from "./temporary-typography.component";

interface IFormInput {
  firstname: string;
  lastname: string;
  middlename: string;
  tag: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const SignUpForm = ({
  handleSignUp,
  fetchingErrors,
}: {
  handleSignUp: (s: IFormInput) => void;
  fetchingErrors: string | null;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) =>
    handleSignUp(data);

  return (
    <Paper
      sx={{
        maxWidth: 400,
        minHeight: 400,
        backgroundColor: "lightblue",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight={"bold"} pb={3}>
        Sign Up
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 5 }}
      >
        {/***********************************  Firstname ***********************************/}
        <Controller
          name="firstname"
          control={control}
          render={() => (
            <TextField
              aria-label="First Name"
              id="outlined-firstName"
              label="First name"
              variant="outlined"
              {...register("firstname")}
              placeholder="Elvis"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.firstname?.message}
        </Typography>

        {/***********************************  Middlename ***********************************/}
        <Controller
          name="middlename"
          control={control}
          render={() => (
            <TextField
              aria-label="Middle Name"
              id="outlined-basic"
              label="Middle name"
              variant="outlined"
              {...register("middlename")}
              placeholder="Aaron"
            />
          )}
        />

        {/***********************************  Lastname ***********************************/}
        <Controller
          name="lastname"
          control={control}
          render={() => (
            <TextField
              aria-label="Last Name"
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              {...register("lastname")}
              placeholder="Presley"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.lastname?.message}
        </Typography>

        {/***********************************  Tag ***********************************/}
        <Controller
          name="tag"
          control={control}
          render={() => (
            <TextField
              aria-label="Tag"
              id="outlined-basic"
              label="Tag"
              variant="outlined"
              {...register("tag")}
              placeholder="CoolMan"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.tag?.message}
        </Typography>

        {/***********************************  Email ***********************************/}
        <Controller
          name="email"
          control={control}
          render={() => (
            <TextField
              aria-label="Email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              {...register("email")}
              placeholder="example@gmail.com"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.email?.message}
        </Typography>

        {/***********************************  Password ***********************************/}
        <Controller
          name="password"
          control={control}
          render={() => (
            <TextField
              aria-label="Password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              {...register("password")}
              placeholder="password"
              type="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.password?.message}
        </Typography>

        {/***********************************  Confirm password ***********************************/}
        <Controller
          name="confirmPassword"
          control={control}
          render={() => (
            <TextField
              aria-label="Confirm password"
              id="outlined-basic"
              label="Confirm password"
              variant="outlined"
              {...register("confirmPassword")}
              placeholder="confirmpass"
              type="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.confirmPassword?.message}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {fetchingErrors === undefined && isValid === true && (
            <TemporaryTypography
              variant="overline"
              align="center"
              color="success.main"
              duration={2}
              data-testid="done-stub"
            >
              <DoneIcon />
            </TemporaryTypography>
          )}

          {fetchingErrors !== undefined && (
            <TemporaryTypography
              variant="overline"
              align="center"
              color="error"
              duration={30}
              data-testid="error-stub"
            >
              {fetchingErrors}
            </TemporaryTypography>
          )}

          <Button
            type="submit"
            disabled={!isValid}
            variant="contained"
            data-testid="signUp-stub"
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SignUpForm;
