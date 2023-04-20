//=============================== react =================================
import { useEffect, useState } from "react";

//=============================== next ==================================
import { useRouter } from "next/router";

//=============================== redux =================================
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  singleDeedErrorSelector,
  singleDeedSelector,
} from "../../../redux/deeds/store/deeds.selector";
import {
  clearErrors,
  clearSingleDeed,
  fetchDeleteUserDeed,
  fetchGetUserSingleDeed,
  fetchPutUserDeed,
} from "../../../redux/deeds/store/deeds.slice";

//=============================== components ============================
import DeedEditForm from "@/components/deed-edit-form.component";
import PageNavBarComp from "@/components/navbar.component";
import PageFooterComp from "@/components/page-footer.component";

//=============================== mui ===================================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

//=============================== interfaces =============================
import { ISingleDeed } from "../../../types/deeds/deed-single.interface";

// =========================== styled ===========================
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

const SingleDeedEditPage = () => {
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const singleDeed = useSelector(singleDeedSelector);

  // ===== local states =====
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const { did } = router.query;

  // ===== selectors =====
  const fetchingErrors = useSelector(singleDeedErrorSelector);

  //===== handlers =====
  const handleBack = () => {
    dispatch(clearSingleDeed());
    router.push(`/deeds`);
  };

  const handleDelete = (deedId: string) => {
    dispatch(fetchDeleteUserDeed(deedId));
    dispatch(clearErrors());
    dispatch(clearSingleDeed());
    router.push(`/deeds`);
  };

  const handleSave = (data: ISingleDeed) => {
    setIsClicked(true);
    dispatch(fetchPutUserDeed(data));
    dispatch(clearErrors());
  };

  useEffect(() => {
    dispatch(fetchGetUserSingleDeed(did as string));
  }, []);

  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        {singleDeed !== null && (
          <DeedEditForm
            singleDeed={singleDeed}
            isEditable={isEditable}
            isClicked={isClicked}
            fetchingErrors={fetchingErrors}
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

export default SingleDeedEditPage;
