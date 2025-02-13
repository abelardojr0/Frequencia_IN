import { useEffect, useState } from 'react';
import { ContainerAuth } from '../../utils/globalStyles';
import { BoxInputMolecule } from '../../components/Molecules/BoxInputMolecule';
import { SelectMolecule } from '../../components/Molecules/SelectMolecule';
import { ButtonAtom } from '../../components/Atoms/ButtonAtom';
import { useUsuarios } from '../../hooks/useUsuarios';
import { FormRegisterStyled } from './style';

const generatePassword = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return password;
};

export const Register = () => {
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user_type, setUserType] = useState<string>('Admin');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState<string>('');
  const [errorCpf, setErrorCpf] = useState<boolean>(false);
  const [errorCpfMessage, setErrorCpfMessage] = useState<string>('');

  useEffect(() => {
    setPassword(generatePassword());
  }, []);
  const { cadastrarUsuario } = useUsuarios();

  const handleCpfChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 11) return;
    const cpfMasked = cleaned
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(cpfMasked);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEmail(false);
    setErrorCpf(false);

    const novoUsuario = { nome, cpf, email, password, user_type };
    const result = await cadastrarUsuario(novoUsuario);
    if (result.error.type === 'email') {
      setErrorEmail(true);
      setErrorEmailMessage(result.error.message);
    } else if (result.error.type === 'cpf') {
      setErrorCpf(true);
      setErrorCpfMessage(result.error.message);
    }
  };

  return (
    <ContainerAuth>
      <FormRegisterStyled onSubmit={onSubmit}>
        <BoxInputMolecule
          required
          type="text"
          htmlFor="nome"
          id="nome"
          children="Nome"
          value={nome}
          onChange={({ target }) => setNome(target.value)}
        />
        <BoxInputMolecule
          error={errorCpf}
          errorMessage={errorCpfMessage}
          required
          type="text"
          htmlFor="cpf"
          id="cpf"
          children="CPF"
          value={cpf}
          onChange={({ target }) => handleCpfChange(target.value)}
        />
        <BoxInputMolecule
          error={errorEmail}
          errorMessage={errorEmailMessage}
          required
          type="email"
          htmlFor="email"
          id="email"
          children="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <SelectMolecule
          children="Tipo de Usuário"
          htmlFor="user_type"
          id="user_type"
          value={user_type}
          onChange={({ target }) => setUserType(target.value)}
          options={[
            { value: 'Admin', text: 'Admin' },
            { value: 'Enfermeiro', text: 'Enfermeiro' },
            { value: 'Médico', text: 'Médico' },
            { value: 'Técnico de Enfermagem', text: 'Técnico de Enfermagem' },
          ]}
        />
        <ButtonAtom>Cadastrar</ButtonAtom>
      </FormRegisterStyled>
    </ContainerAuth>
  );
};
