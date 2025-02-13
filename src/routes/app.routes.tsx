import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout";
import { NotFound } from "../pages/NotFound";
import { SpinnerAtom } from "../components/SpinnerAtom";
import { Home } from "@mui/icons-material";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="login" element={<SpinnerAtom />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
