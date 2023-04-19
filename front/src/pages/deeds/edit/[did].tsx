import DeedListForm from "@/components/deeds-form.component";
import { AppDispatch } from "@/redux/store";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteUserDeed,
  fetchGetUserSingleDeed,
  fetchPutUserDeed,
} from "../store/deeds.actions";
import {
  singleDeedErrorSelector,
  singleDeedSelector,
} from "../store/deeds.selector";
import DeedEditForm from "@/components/deed-edit-form.component";
import { clearErrors, clearSingleDeed } from "../store/deeds.slice";
import PageNavBarComp from "@/components/navbar.comp";
import PageFooterComp from "@/components/page-footer.component";
import { ISingleDeed } from "../types/deed-single.interface";

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
  const dispatch = useDispatch<AppDispatch>();
  const singleDeed = useSelector(singleDeedSelector);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();
  const { did } = router.query;
  const fetchingErrors = useSelector(singleDeedErrorSelector);

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
