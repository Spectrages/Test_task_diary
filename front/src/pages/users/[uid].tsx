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
  friendsSelector,
  singleFriendSelector,
  singleUserSelector,
} from "../../redux/friends/store/friends.selectors";
import UserSingleComponent from "@/components/user-single.component";
import {
  fetchAddUserFriend,
  fetchFriendDeeds,
  fetchRemoveUserFriend,
} from "@/redux/friends/store/friends.slice";

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
  const dispatch = useDispatch<AppDispatch>();

  const singleUser = useSelector(singleUserSelector);
  const friends = useSelector(friendsSelector);

  const isFriend = friends.map((item) => item._id === singleUser?._id);

  const result = isFriend.includes(true);

  const router = useRouter();

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
