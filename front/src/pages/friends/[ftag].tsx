import PageNavBarComp from "@/components/navbar.comp";
import PageFooterComp from "@/components/page-footer.component";
import { AppDispatch } from "@/redux/store";
import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeedListForm from "@/components/deeds-form.component";
import {
  friendDeedsSelector,
  singleFriendSelector,
} from "./store/friends.selectors";

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

const FriendDeedsPage = () => {
  const [isFriend, setIsFriend] = useState(true);
  const deeds = useSelector(friendDeedsSelector);

  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        <DeedListForm isFriend={isFriend} deeds={deeds} />;
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default FriendDeedsPage;
