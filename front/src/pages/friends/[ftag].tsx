//=============================== react =================================
import { useState } from "react";
//=============================== redux =================================
import { useSelector } from "react-redux";
import { friendDeedsSelector } from "../../redux/friends/store/friends.selectors";
//=============================== components ============================
import PageNavBarComp from "@/components/navbar.component";
import PageFooterComp from "@/components/page-footer.component";
import DeedListForm from "@/components/deeds-form.component";

//=============================== mui ===================================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

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
  // ===== local states =====
  const [isFriend, setIsFriend] = useState(true);

  // ===== selectors =====
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
