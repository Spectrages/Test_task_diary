// ========================== react ==========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ============================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./signIn-form.const";

// ========================== mui ============================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";

// ========================== components ======================
import TemporaryTypography from "./temporary-typography.component";

interface IFormInput {
  email: string;
  password: string;
}

const SignInForm = ({
  handleSignIn,
  handleRedirectToSignUp,
  fecthErrors,
}: {
  handleRedirectToSignUp: () => void;
  handleSignIn: (s: IFormInput) => void;
  fecthErrors: string | null;
}) => {
  //======== form register ========
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
    handleSignIn(data);

  return (
    <Paper
      sx={{
        maxWidth: 400,
        minHeight: 340,
        backgroundColor: "lightblue",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight={"bold"} pb={3}>
        LOGIN
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        {/***********************************  Email ***********************************/}
        <Controller
          name="email"
          control={control}
          render={() => (
            <TextField
              inputProps={{ "data-testid": "email-stub" }}
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
              inputProps={{ "data-testid": "password-stub" }}
              id="outlined-basic"
              label={"Password"}
              type="password"
              variant="outlined"
              {...register("password", {
                required: true,
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              placeholder="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.password?.message}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            {fecthErrors !== undefined && (
              <TemporaryTypography
                variant="overline"
                align="center"
                color="error"
                duration={10}
                data-testid="error-stub"
              >
                {fecthErrors}
              </TemporaryTypography>
            )}
            <Button
              type="submit"
              disabled={!isValid}
              variant="contained"
              data-testid="signin-button"
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              onClick={handleRedirectToSignUp}
              data-testid="signup-button"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default SignInForm;
