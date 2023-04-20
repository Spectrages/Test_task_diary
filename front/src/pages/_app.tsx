//=============================== next ==================================
import type { AppProps } from "next/app";

//=============================== redux =================================
import Providers from "../redux/provider";

//=============================== components ============================
import ErrorBoundaryComp from "@/components/error-boundary.component";

//=============================== theme =================================
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme/mainTheme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundaryComp>
      <Providers>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />;
        </ThemeProvider>
      </Providers>
    </ErrorBoundaryComp>
  );
};

export default App;
