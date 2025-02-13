import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/auth/Dashboard";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Forgot } from "../pages/auth/Forgot/indext";
import { ConfirmEmail } from "../pages/auth/Confirmacao";
import { ResetPassword } from "../pages/auth/Reset";
import { NotFound } from "../pages/NotFound";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="confirmar-email/:token" element={<ConfirmEmail />} />
        <Route path="resetar-senha/:token?" element={<ResetPassword />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
