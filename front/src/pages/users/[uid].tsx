//=============================== next ==================================
import { useRouter } from "next/router";

//=============================== redux =================================
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  friendsSelector,
  singleUserSelector,
} from "../../redux/friends/store/friends.selectors";

import {
  fetchAddUserFriend,
  fetchFriendDeeds,
  fetchRemoveUserFriend,
} from "@/redux/friends/store/friends.slice";

//=============================== components ============================
import PageNavBarComp from "@/components/navbar.component";
import PageFooterComp from "@/components/page-footer.component";
import UserSingleComponent from "@/components/user-single.component";

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

const SingleUserPage = () => {
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ===== selectors =====
  const singleUser = useSelector(singleUserSelector);
  const friends = useSelector(friendsSelector);

  // ===== find friends in the user list =====
  const isFriend = friends.map((item) => item._id === singleUser?._id);

  const result = isFriend.includes(true);

  // ===== handlers =====
  const handleGetUserDeeds = (tag: string) => {
    dispatch(fetchFriendDeeds(tag));
    router.push({
      pathname: "/friends/[ftag]",
      query: { ftag: tag },
    });
  };

  const handleAddToFriendList = (tag: string) => {
    dispatch(fetchAddUserFriend(tag));
    router.push({
      pathname: "/friends",
    });
  };

  const handleRemoveFromFriendList = (tag: string) => {
    dispatch(fetchRemoveUserFriend(tag));
    router.push({
      pathname: "/friends",
    });
  };

  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        {singleUser && (
          <UserSingleComponent
            isFriend={result}
            singleUser={singleUser}
            handleGetUserDeeds={handleGetUserDeeds}
            handleAddToFriendList={handleAddToFriendList}
            handleRemoveFromFriendList={handleRemoveFromFriendList}
          />
        )}
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default SingleUserPage;
