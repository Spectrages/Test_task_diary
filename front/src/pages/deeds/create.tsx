import PageNavBarComp from "@/components/navbar.comp";
import PageFooterComp from "@/components/page-footer.component";
import { AppDispatch } from "@/redux/store";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostUserDeed,
} from "../../redux/deeds/store/deeds.actions";
import { singleDeedErrorSelector } from "../../redux/deeds/store/deeds.selector";
import DeedCreateForm from "@/components/deed-create-form.component";
import { ISingleDeedCreate } from "../../types/deeds/deed-create.interface";

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

const CreateDeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchingErrors = useSelector(singleDeedErrorSelector);
  const router = useRouter();

  const handleSave = (data: ISingleDeedCreate) => {
    dispatch(fetchPostUserDeed(data));
    router.push(`/deeds`);
  };

  const handleBack = () => {
    router.push(`/deeds`);
  };

  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        <DeedCreateForm
          handleSave={handleSave}
          handleBack={handleBack}
          fetchingErrors={fetchingErrors}
        />
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default CreateDeed;
