import { useState, useContext } from 'react';
import { ContainerAuth, FormStyled } from '../../utils/globalStyles';
import { BoxInputMolecule } from '../../components/Molecules/BoxInputMolecule';
import { ButtonAtom } from '../../components/Atoms/ButtonAtom';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await auth.signin(email, password);
      if (!data.data) {
        navigate('/login');
      } else {
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerAuth>
      <FormStyled onSubmit={onSubmit}>
        <BoxInputMolecule
          type="email"
          htmlFor="email"
          id="email"
          children="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <BoxInputMolecule
          type="password"
          htmlFor="password"
          id="password"
          children="Senha"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Link to={'/forgot'}>Esqueceu a senha?</Link>
        <ButtonAtom disabled={loading}>Entrar</ButtonAtom>
      </FormStyled>
    </ContainerAuth>
  );
};
