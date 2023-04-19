import { CircularProgress, Grid, styled } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// ========================== styles ===========================
const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding-top: 64px;
  min-height: 100vh;
  justify-content: space-between;
`;

const MainPage = () => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  // ===== auth check =====
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      router.push(`/deeds`);
    } else {
      router.push(`/sign-in`);
    }
  }, []);

  return (
    <MainGrid>
      <CircularProgress
        sx={{ alignSelf: "center" }}
        data-testid="pending-stub"
      />
    </MainGrid>
  );
};

export default MainPage;
