import { useState, useEffect, createContext, ReactNode } from "react";
import { Usuario } from "../utils/types";
import { messageError, messageSuccess } from "../utils/toast";
import api from "../service";

interface AuthContextProps {
  user: Usuario | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<any>;
  forgot: (email: string) => Promise<any>;
  reset: (email: string, token: string, password: string) => Promise<any>;
}

export const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);

  const signin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post("/login", { email, password });
      setUser(data.data.user);
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("user_id", data.data.user.id);
      localStorage.setItem("user_type", data.data.user.user_type);
      localStorage.setItem("user_name", data.data.user.nome);

      await fetchUserDetails(data.data.user.id);
      return data;
    } catch (error: any) {
      messageError(error.response.data.error.message);
      return error.response.data.error.message;
    } finally {
      setLoading(false);
    }
  };

  const forgot = async (email: string) => {
    setLoading(true);
    try {
      const { data } = await api.post("/forgot_password", { email });
      messageSuccess("Email de confirmação enviado");
      return data;
    } catch (error: any) {
      messageError("Email incorreto. Tente novamente");
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  const reset = async (email: string, token: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post("/reset_password", {
        email,
        token,
        password,
      });
      messageSuccess("Senha cadastrada com sucesso");
      return data;
    } catch (error: any) {
      messageError("Dados incorretos. Tente novamente");
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId: number) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        const { data } = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Atualizar o estado do usuário com os detalhes obtidos
        localStorage.setItem("user_name", data.nome);
        setUser(data);
      } catch (error) {
        console.error("Erro ao obter detalhes do usuário:", error);
      }
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("user_id");
    if (authToken && userId && !user) {
      fetchUserDetails(parseInt(userId, 10));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signin, loading, forgot, reset }}>
      {children}
    </AuthContext.Provider>
  );
};
