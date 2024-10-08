import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AuthPage from "./pages/AuthPage";
import GoogleCallbak from "./pages/GoogleCallbak";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/google" element={<GoogleCallbak />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
