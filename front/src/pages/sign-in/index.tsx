// ========================== react ============================
import { FC } from "react";

// ========================== mui ==============================
import { Grid, styled } from "@mui/material";

// ========================== components =======================
import PageNavBarComp from "@/components/navbar.comp";
import PageFooterComp from "@/components/page-footer.comp";
import SignInForm from "@/components/signIn-form.component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { signInErrorSelector } from "../../pages/sign-in/store/sign-in.selector";
import { fetchSignIn } from "../../pages/sign-in/store/sign-in.slice";
import { clearErrors } from "../../pages/sign-in/store/sign-in.slice";
import { decodeToken } from "react-jwt";

// ========================== styles ===========================
const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding-top: 64px;
  min-height: 100vh;
  justify-content: space-between;
`;

const ContentGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  min-width: 100%;
  min-height: 100%;
`;

interface IFormInput {
  email: string;
  password: string;
}

export const handleResponse = (response: any) => {
  if (response.payload) {
    const user: any = decodeToken(response.payload);
    console.log(user);
  }
};

const signIn: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fecthErrors = useSelector(signInErrorSelector);

  const handleSignIn = async (data: IFormInput) => {
    const newToken = await dispatch(fetchSignIn(data));
    handleResponse(newToken);
  };

  const handleRedirectToSignUp = () => {
    dispatch(clearErrors());
  };

  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "400px",
            minHeight: "100%",
          }}
        >
          <SignInForm
            handleSignIn={handleSignIn}
            fecthErrors={fecthErrors.token}
            handleRedirectToSignUp={handleRedirectToSignUp}
          />
        </Grid>
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default signIn;
