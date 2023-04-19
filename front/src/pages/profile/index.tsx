// ========================== react ============================
import { FC, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";

// ========================== mui ==============================
import { Grid, styled } from "@mui/material";

// ========================== components =======================
import PageNavBarComp from "@/components/navbar.comp";
import PageFooterComp from "@/components/page-footer.component";
import SignInForm from "@/components/signIn-form.component";

// ========================== redux ============================
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { signInErrorSelector } from "../../redux/sign-in/store/sign-in.selector";
import { fetchSignIn } from "../../redux/sign-in/store/sign-in.slice";
import { clearErrors, fetchDeleteUserAccount } from "../../redux/profile/store/profile.slice";
import { useRouter } from "next/router";
import ProfileForm from "@/components/profile-form.component";
import {
  profileErrorsSelector,
  profileInfoSelector,
  profileLoadingSelector,
} from "../../redux/profile/store/profile.selector";
import { fetchGetUserInfo, fetchUpdateUserInfo } from "../../redux/profile/store/profile.slice";
import { current } from "@reduxjs/toolkit";

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
interface IUserSessionDto {
  _id: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  tag: string;
  email: string;
}

const profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const decodeUser = useSelector(profileInfoSelector);

  const router = useRouter();
  const fetchingErrors = useSelector(profileErrorsSelector);

  const handleBack = () => {
    dispatch(clearErrors());
    router.push(`/deeds`);
  };

  const handleDelete = () => {
    dispatch(fetchDeleteUserAccount());
    dispatch(clearErrors());
    window.localStorage.removeItem("token");
    router.push(`/sign-in`);
  };

  const handleSave = (userDataForUpdate: IUserSessionDto) => {
    dispatch(fetchUpdateUserInfo(userDataForUpdate));
    setIsClicked(true);
    dispatch(clearErrors());
  };

  useEffect(() => {
    dispatch(fetchGetUserInfo());
  }, [dispatch]);

  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        {decodeUser && (
          <ProfileForm
            currentUser={decodeUser}
            isEditable={isEditable}
            isClicked={isClicked}
            fetchingErrors={fetchingErrors.user}
            handleBack={handleBack}
            handleDelete={handleDelete}
            setIsEditable={setIsEditable}
            handleSave={handleSave}
          />
        )}
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default profile;
