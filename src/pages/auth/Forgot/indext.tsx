import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services'; // Certifique-se de que você tenha um serviço API configurado
import { ContainerAuth, FormStyled } from '../../utils/globalStyles';
import { BoxInputMolecule } from '../../components/Molecules/BoxInputMolecule';
import { ButtonAtom } from '../../components/Atoms/ButtonAtom';
import { messageError, messageSuccess } from '../../utils/toast';

export const Forgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/forgot-password', { email });
      messageSuccess(data.message);
      setMessage(data.message);
      setLoading(false);
      setTimeout(() => navigate('/login'), 500);
    } catch (error: any) {
      messageError(error.message);
      setMessage(`Erro: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <ContainerAuth>
      <FormStyled onSubmit={handleSubmit}>
        <BoxInputMolecule
          type="email"
          htmlFor="email"
          id="email"
          children="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <ButtonAtom disabled={loading}>Enviar</ButtonAtom>
      </FormStyled>
      {message && <p>{message}</p>}
    </ContainerAuth>
  );
};
