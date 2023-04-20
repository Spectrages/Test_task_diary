//=============================== react =================================
import { FC } from "react";

//=============================== next ==================================
import { useRouter } from "next/router";

//=============================== mui ===================================
import { Grid, styled } from "@mui/material";

//=============================== components ============================
import PageNavBarComp from "@/components/navbar.component";
import PageFooterComp from "@/components/page-footer.component";
import SignInForm from "@/components/signIn-form.component";

//=============================== redux =================================
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { signInErrorSelector } from "../../redux/sign-in/store/sign-in.selector";
import { fetchSignIn } from "../../redux/sign-in/store/sign-in.slice";
import { clearErrors } from "../../redux/sign-in/store/sign-in.slice";

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
  min-width: 100%;
`;

interface IFormInput {
  email: string;
  password: string;
}

const SignInPage: FC = () => {
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ===== selectors =====
  const fecthErrors = useSelector(signInErrorSelector);

  //===== handlers =====
  const handleSignIn = async (data: IFormInput) => {
    const newToken = await dispatch(fetchSignIn(data));
    if (newToken.meta.requestStatus === "fulfilled") {
      window.localStorage.setItem("token", newToken.payload);
      router.push(`/profile`);
      dispatch(clearErrors());
    }
  };

  const handleRedirectToSignUp = () => {
    dispatch(clearErrors());
    router.push(`/sign-up`);
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

export default SignInPage;
