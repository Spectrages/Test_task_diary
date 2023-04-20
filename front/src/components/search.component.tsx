// =========================== mui ===========================
import { styled } from "@mui/material/styles";
import { alpha, Autocomplete, Box, TextField } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// =========================== store ===========================
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  friendsSelector,
  usersSelector,
} from "@/redux/friends/store/friends.selectors";
import { useRouter } from "next/router";
import {
  fetchCurrentUserById,
  fetchGetUserFriends,
} from "@/redux/friends/store/friends.slice";
import { useEffect } from "react";

// =========================== styled ===========================
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },
  padding: "8px",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

interface IUserByTag {
  _id: string;
  tag: string;
  isFriend: boolean;
}

const SearchComponent = () => {
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchGetUserFriends());
  }, []);

  // ===== selectors =====
  const users = useSelector(usersSelector);
  const friends = useSelector(friendsSelector);

  // ===== creating an array like [{_id: string, tag: string, isFriend: boolean}] =====
  const tagsIdsObj = users.map((item) => {
    return { _id: item._id, tag: item.tag };
  });
  const friendsTagsArray = friends.map((item) => item.tag);
  const isFriend = tagsIdsObj.map((item) =>
    friendsTagsArray.includes(item.tag)
  );
  const result = tagsIdsObj.map((item, index) => {
    return { _id: item._id, tag: item.tag, isFriend: isFriend[index] };
  });

  const autocompleteProps = {
    options: result ?? [],
    getOptionLabel: (option: IUserByTag) => option?.tag ?? "Still fetching...",
  };

    // ===== handlers =====
  const handleGoToSingleUserPage = (userId: string) => {
    dispatch(fetchCurrentUserById(userId));
    router.push({
      pathname: "/users/[uid]",
      query: { uid: userId },
    });
  };

  return (
    <Search>
      <Autocomplete
        sx={{
          display: "flex",
          minWidth: "200px",
        }}
        {...autocompleteProps}
        disablePortal
        clearOnBlur
        renderOption={(props, { _id, tag, isFriend }: IUserByTag) => (
          <Box
            component="li"
            sx={{
              display: "flex",
              justifyContent: "space-beetwen",
              alignItems: "center",
            }}
            {...props}
            onClick={() => handleGoToSingleUserPage(_id)}
          >
            {isFriend ? (
              <CheckCircleOutlineIcon
                sx={{
                  color: "success.light",
                  marginRight: "8px",
                }}
              />
            ) : (
              <AddCircleOutlineIcon
                sx={{
                  color: "success.light",
                  marginRight: "8px",
                }}
              />
            )}
            {tag}
          </Box>
        )}
        renderInput={(characters) => (
          <TextField {...characters} label="Find by tag" />
        )}
      />
    </Search>
  );
};

export default SearchComponent;
