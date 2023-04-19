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
import { fetchAddUserFriend } from "@/redux/friends/store/friends.actions";

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
  tag: string;
  isFriend: boolean;
}

const SearchComponent = () => {
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const users = useSelector(usersSelector);
  const friends = useSelector(friendsSelector);

  const tagsArray = users.map((item) => item.tag);
  const friendsTagsArray = friends.map((item) => item.tag);
  const isFriend = tagsArray.map((item) => friendsTagsArray.includes(item));
  const result = tagsArray.map((item, index) => {
    return { tag: item, isFriend: isFriend[index] };
  });
  const autocompleteProps = {
    options: result ?? [],
    getOptionLabel: (option: IUserByTag) => option?.tag ?? "Still fetching...",
  };

  const handleAddToFriend = (tag: string) => {
    dispatch(fetchAddUserFriend(tag));
    router.push({
      pathname: "/friends",
    });
  };

  const handleGoToFriendList = () => {
    router.push({
      pathname: "/friends",
    });
  };

  // ===== handlers =====
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
        renderOption={(props, { tag, isFriend }: IUserByTag) => (
          <Box
            component="li"
            sx={{
              display: "flex",
              justifyContent: "space-beetwen",
              alignItems: "center",
            }}
            {...props}
            onClick={() =>
              isFriend ? handleGoToFriendList() : handleAddToFriend(tag)
            }
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
