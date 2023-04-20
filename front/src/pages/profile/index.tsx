// ========================== react ============================
import { FC, useEffect, useState } from "react";

// ========================== mui ==============================
import { Grid, styled } from "@mui/material";

// ========================== components =======================
import PageNavBarComp from "@/components/navbar.component";
import PageFooterComp from "@/components/page-footer.component";
import ProfileForm from "@/components/profile-form.component";

// ========================== redux ============================
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  clearErrors,
  fetchDeleteUserAccount,
  fetchGetUserInfo,
  fetchUpdateUserInfo,
} from "../../redux/profile/store/profile.slice";
import { useRouter } from "next/router";

import {
  profileErrorsSelector,
  profileInfoSelector,
} from "../../redux/profile/store/profile.selector";

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
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ===== local state =====
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // ===== selectors =====
  const decodeUser = useSelector(profileInfoSelector);
  const fetchingErrors = useSelector(profileErrorsSelector);

  //===== handlers =====
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
