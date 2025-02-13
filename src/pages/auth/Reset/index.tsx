import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services';
import { ContainerAuth, FormStyled } from '../../utils/globalStyles';
import { BoxInputMolecule } from '../../components/Molecules/BoxInputMolecule';
import { ButtonAtom } from '../../components/Atoms/ButtonAtom';
import { messageError, messageSuccess } from '../../utils/toast';

export const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSenha, setErrorSenha] = useState(false);
  const [errorSenhaFormato, setErrorSenhaFormato] = useState(false);
  const navigate = useNavigate();

  const isPasswordStrong = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    return {
      isValid:
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChars &&
        isLongEnough,
      missing: {
        length: isLongEnough,
        upperCase: hasUpperCase,
        lowerCase: hasLowerCase,
        numbers: hasNumbers,
        specialChars: hasSpecialChars,
      },
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorSenha(false);
    setErrorSenhaFormato(false);
    setErrorMessage('');

    // Validação de senha
    const passwordValidation = isPasswordStrong(newPassword);
    if (!passwordValidation.isValid) {
      const missingCriteria = [];
      if (!passwordValidation.missing.length)
        missingCriteria.push('pelo menos 8 caracteres');
      if (!passwordValidation.missing.upperCase)
        missingCriteria.push('uma letra maiúscula');
      if (!passwordValidation.missing.lowerCase)
        missingCriteria.push('uma letra minúscula');
      if (!passwordValidation.missing.numbers)
        missingCriteria.push('um número');
      if (!passwordValidation.missing.specialChars)
        missingCriteria.push('um caractere especial');

      setErrorMessage(`A senha deve ter: ${missingCriteria.join(', ')}.`);
      messageError('Senha Fraca');
      setErrorSenhaFormato(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      messageError('As senhas não coincidem');
      setErrorSenha(true);
      return;
    }

    try {
      const { data } = await api.post('/reset-password', {
        token,
        newPassword,
      });
      setMessage(data.message);
      messageSuccess(data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      messageError(error.message);
      setMessage(`Erro: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <ContainerAuth>
      <FormStyled onSubmit={handleSubmit}>
        <BoxInputMolecule
          type="password"
          htmlFor="newPassword"
          id="newPassword"
          children="Nova Senha"
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
          error={errorSenhaFormato}
          errorMessage={errorMessage}
        />
        <BoxInputMolecule
          type="password"
          htmlFor="confirmPassword"
          id="confirmPassword"
          children="Confirmar Senha"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          error={errorSenha}
          errorMessage={errorMessage}
        />
        <ButtonAtom>Alterar</ButtonAtom>
      </FormStyled>
      {message && <p>{message}</p>}
    </ContainerAuth>
  );
};
