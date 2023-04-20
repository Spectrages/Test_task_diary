//=============================== react =================================
import { FC } from "react";

//=============================== next ==================================
import { useRouter } from "next/router";

//=============================== mui ===================================
import { Grid, styled } from "@mui/material";

//=============================== components ============================
import PageNavBarComp from "@/components/navbar.component";
import PageFooterComp from "@/components/page-footer.component";
import SignUpForm from "@/components/signUp-form.component";

//=============================== redux =================================
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  clearErrors,
  fetchSignUp,
} from "../../redux/sign-up/store/sign-up.slice";

import { signUpErrorSelector } from "../../redux/sign-up/store/sign-up.selector";

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
  firstname: string;
  lastname: string;
  middlename: string;
  tag: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const signUp: FC = () => {
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ===== selectors =====
  const fecthingErrors = useSelector(signUpErrorSelector);

  // ===== handlers =====
  const handleSignUp = async (data: IFormInput) => {
    const newToken = await dispatch(fetchSignUp(data));
    if (newToken.meta.requestStatus === "fulfilled") {
      window.localStorage.setItem("token", newToken.payload);
      router.push(`/profile`);
      dispatch(clearErrors());
    }
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
          <SignUpForm
            handleSignUp={handleSignUp}
            fetchingErrors={fecthingErrors.token}
          />
        </Grid>
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default signUp;
