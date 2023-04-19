import { UserSessionDto } from "@/shared/user-session.dto";
import { Box, Paper, Button, Typography } from "@mui/material";

export const FriendsListComponent = ({
  friends,
  handleRemove,
  handleShow,
}: {
  friends: UserSessionDto[];
  handleShow: (s: string) => void;
  handleRemove: (s: string) => void;
}) => {
  const correctDate = (date: number) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "100%",
      }}
    >
      {friends.map((item, index) => {
        return (
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
            key={index}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "8px",
              }}
            >
              <Typography>Email: {item.email}</Typography>
              <Typography>Tag: {item.tag}</Typography>
              <Typography>Firstname: {item.firstname}</Typography>
              <Typography sx={{ display: item.middlename ? "block" : "none" }}>
                Middlename: {item.middlename}
              </Typography>
              <Typography>Lastname: {item.lastname}</Typography>
              <Typography>Rating: {item.rating}</Typography>
              <Typography>Created: {correctDate(item.created)}</Typography>
              <Typography>Updated: {correctDate(item.updated)}</Typography>
            </Box>

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
                onClick={() => handleShow(item.tag)}
              >
                View list of good deeds
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "100%",
                }}
                onClick={() => handleRemove(item?.tag)}
              >
                Remove from friends
              </Button>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default FriendsListComponent;
