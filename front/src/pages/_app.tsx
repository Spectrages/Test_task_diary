import type { AppProps } from "next/app";
import Providers from "../redux/provider";
import theme from "@/theme/mainTheme";
import { ThemeProvider } from "@emotion/react";
import ErrorBoundaryComp from "@/components/error-boundary.component";

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
