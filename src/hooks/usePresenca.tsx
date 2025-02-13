import { useCallback, useState } from "react";
import { Presenca } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { messageError, messageSuccess } from "../utils/toast";
import api from "../service";

export const usePresencas = () => {
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [presenca, setPresenca] = useState<Presenca | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const buscarPresencas = useCallback(async () => {
    try {
      const { data } = await api.get("/presencas");
      setPresencas(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const buscarPresencaPorId = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/presencas/${id}`);
      setPresenca(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const cadastrarPresenca = async (novaPresenca: Presenca) => {
    try {
      setLoading(true);
      await api.post("/presencas", novaPresenca);
      navigate("/dashboard");
      messageSuccess("Presença cadastrada com sucesso.");
    } catch (err: any) {
      messageError("Erro ao cadastrar presença.");
      setLoading(false);
    }
  };

  const atualizarPresenca = async (
    id: string,
    presencaAtualizada: Presenca
  ) => {
    try {
      setLoading(true);
      await api.put(`/presencas/${id}`, presencaAtualizada);
      navigate("/dashboard");
      messageSuccess("Presença atualizada com sucesso.");
    } catch (err: any) {
      messageError("Erro ao atualizar presença.");
      setLoading(false);
    }
  };

  const deletarPresenca = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/presencas/${id}`);
      navigate("/dashboard");
      messageSuccess("Presença deletada com sucesso.");
    } catch (err: any) {
      messageError("Erro ao deletar presença.");
      setLoading(false);
    }
  };

  return {
    presencas,
    presenca,
    loading,
    error,
    buscarPresencas,
    buscarPresencaPorId,
    cadastrarPresenca,
    atualizarPresenca,
    deletarPresenca,
  };
};
