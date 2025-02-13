import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { messageError, messageSuccess } from "../utils/toast";
import { Usuario } from "../utils/types";
import api from "../service";

export const useUsuarios = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const navigate = useNavigate();

  const cadastrarUsuario = async (novoUsuario: Usuario) => {
    setLoading(true);
    try {
      const { data } = await api.post("/users", novoUsuario);
      messageSuccess("Usuário cadastrado com sucesso!");
      navigate("/usuarios");
      return data;
    } catch (error: any) {
      console.log(error.response.data.error.message);
      messageError(error.response.data.error.message);
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  const buscarUsuarios = useCallback(async (busca?: string) => {
    try {
      const { data } = await api.get("/users", {
        params: { busca },
      });
      setUsuarios(data);
      setLoading(false);
    } catch (error: any) {
      messageError("Erro ao carregar usuários. Tente novamente.");
      setLoading(false);
    }
  }, []);

  const buscarUsuarioPorId = async (id: string | undefined) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/users/${id}`);
      setUsuario(data);
      setLoading(false);
    } catch (err: any) {
      messageError("Erro ao carregar usuário. Tente novamente.");
      setLoading(false);
    }
  };

  const atualizarUsuario = async (id: string, usuarioAtualizado: FormData) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/users/${id}`, usuarioAtualizado, {
        headers: {
          "Content-Type": "multipart/form-data", // Importante para enviar arquivos
        },
      });

      messageSuccess("Usuário atualizado com sucesso!");
      navigate("/usuarios");
      return data;
    } catch (error: any) {
      console.log(error);

      messageError("Erro ao atualizar usuário. Tente novamente.");
      return error.response.data.error;
    } finally {
      setLoading(false);
    }
  };
  const deletarUsuario = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/users/${id}`);
      messageSuccess("Usuário excluído com sucesso!");
      setUsuarios(usuarios.filter((user) => user.id !== id)); // Atualiza a lista de usuários
      navigate("/usuarios");
      return data;
    } catch (error: any) {
      messageError("Erro ao excluir usuário. Tente novamente.");
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    cadastrarUsuario,
    buscarUsuarios,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario,
    usuario,
    usuarios,
    loading,
  };
};
