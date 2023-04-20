//=============================== react =================================
import { useEffect } from "react";

//=============================== next ==================================
import { useRouter } from "next/router";

//=============================== redux =================================
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFriendDeeds,
  fetchGetUserFriends,
  fetchRemoveUserFriend,
} from "../../redux/friends/store/friends.slice";
import { friendsSelector } from "../../redux/friends/store/friends.selectors";

//=============================== components ============================
import FriendsListComponent from "@/components/friend-list.component";
import PageNavBarComp from "@/components/navbar.component";
import PageFooterComp from "@/components/page-footer.component";

//=============================== mui ===================================
import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";

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

const FriendsListPage = () => {
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ===== selectors =====
  const friends = useSelector(friendsSelector);

  //===== handlers =====
  const handleRemove = (userTag: string) => {
    dispatch(fetchGetUserFriends());
    dispatch(fetchRemoveUserFriend(userTag));
    dispatch(fetchGetUserFriends());
  };

  const handleShow = (userTag: string) => {
    dispatch(fetchFriendDeeds(userTag));
    router.push({
      pathname: "/friends/[ftag]",
      query: { ftag: userTag },
    });
  };

  useEffect(() => {
    dispatch(fetchGetUserFriends());
  }, []);

  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        {friends.length > 0 ? (
          <FriendsListComponent
            friends={friends}
            handleRemove={handleRemove}
            handleShow={handleShow}
          />
        ) : (
          <Typography variant="h3" fontWeight={"bold"} pb={3}>
            Your friends list is empty
          </Typography>
        )}
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default FriendsListPage;
