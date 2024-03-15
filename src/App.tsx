import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

import FlashCards from "./components/FlashCards";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <FlashCards />
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
