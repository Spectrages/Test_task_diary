//=============================== dto's ===============================
import { UserSessionDto } from "@/shared/user-session.dto";

//=============================== mui =================================
import { Box, Button, Paper, Typography } from "@mui/material";

const UserSingleComponent = ({
  isFriend,
  singleUser,
  handleGetUserDeeds,
  handleAddToFriendList,
  handleRemoveFromFriendList,
}: {
  isFriend: boolean;
  singleUser: UserSessionDto;
  handleGetUserDeeds: (s: string) => void;
  handleAddToFriendList: (s: string) => void;
  handleRemoveFromFriendList: (s: string) => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "100%",
      }}
    >
      <Paper
        sx={{
          width: "90%",
          backgroundColor: "#f0f8ff",
          justifyContent: "space-between",
          p: 3,
          margin: "16px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "8px",
          }}
        >
          <Typography>Tag: {singleUser.tag}</Typography>
          <Typography>Rating: {singleUser.rating}</Typography>
        </Box>

        {isFriend ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "100%",
              }}
              onClick={() => handleGetUserDeeds(singleUser.tag)}
            >
              View list of good deeds
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{
                width: "100%",
              }}
              onClick={() => handleRemoveFromFriendList(singleUser.tag)}
            >
              Remove from friends
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "100%",
              }}
              onClick={() => handleAddToFriendList(singleUser.tag)}
            >
              Add as friend
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default UserSingleComponent;
