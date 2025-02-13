import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services';

export const ConfirmEmail = () => {
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      if (token) {
        try {
          const response = await api.get(`/users/confirmar-email/${token}`);
          if (response.data.message) {
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 500);
          } else {
            setMessage('Erro ao confirmar o e-mail.');
          }
        } catch (error: any) {
          setMessage(`Erro na requisição. ${error.message}`);
        }
      } else {
        setMessage('Token não fornecido.');
      }
    };

    confirmEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Confirmação de E-mail</h2>
      <p>{message}</p>
    </div>
  );
};
