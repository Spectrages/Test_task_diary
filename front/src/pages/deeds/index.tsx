//============================== react ====================================
import { useEffect, useState } from "react";

//============================== next =====================================
import { useRouter } from "next/router";

//============================== redux ====================================
import { useDispatch, useSelector } from "react-redux";
import { deedsSelector } from "../../redux/deeds/store/deeds.selector";
import { AppDispatch } from "@/redux/store";
import {
  clearErrors,
  clearSingleDeed,
  fetchDeleteUserDeed,
  fetchGetUserDeeds,
} from "../../redux/deeds/store/deeds.slice";

//============================== components ===============================
import PageNavBarComp from "@/components/navbar.component";
import PageFooterComp from "@/components/page-footer.component";
import DeedListForm from "@/components/deeds-form.component";

//============================== mui ======================================
import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";

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

const DeedsListPage = () => {
  //===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  //===== local states =====
  const [isFriend, setIsFriend] = useState(false);
  const deeds = useSelector(deedsSelector);

  //===== handlers ====
  const handleEdit = (deedId: string) => {
    dispatch(clearSingleDeed());
    router.push({
      pathname: "/deeds/edit/[did]",
      query: { did: deedId },
    });
  };

  const handleDelete = (deedId: string) => {
    dispatch(fetchDeleteUserDeed(deedId));
    dispatch(clearErrors());
    dispatch(fetchGetUserDeeds());
  };

  useEffect(() => {
    dispatch(fetchGetUserDeeds());
  }, []);

  return (
    <MainGrid>
      <Button
        variant="contained"
        color="success"
        sx={{ width: "90%", margin: "16px" }}
        onClick={() => router.push("/deeds/create")}
      >
        Create new deed
      </Button>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        <DeedListForm
          isFriend={isFriend}
          deeds={deeds}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default DeedsListPage;
