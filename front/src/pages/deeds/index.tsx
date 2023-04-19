import PageNavBarComp from "@/components/navbar.comp";
import PageFooterComp from "@/components/page-footer.component";
import { AppDispatch } from "@/redux/store";
import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteUserDeed, fetchGetUserDeeds } from "./store/deeds.actions";
import { deedsSelector } from "./store/deeds.selector";
import DeedListForm from "@/components/deeds-form.component";
import { clearErrors, clearSingleDeed } from "./store/deeds.slice";

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

const deeds = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isFriend, setIsFriend] = useState(false);
  const deeds = useSelector(deedsSelector);
  const router = useRouter();

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
  };

  useEffect(() => {
    dispatch(fetchGetUserDeeds());
  }, [handleDelete]);

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
        ;
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default deeds;
