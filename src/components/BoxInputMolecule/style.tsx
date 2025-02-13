import styled from 'styled-components';
import { cores } from '../../../utils/theme';
import responsivo, { breakpoints } from '../../../utils/responsive';

export const BoxInputMoleculeStyled = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  color: ${cores.azul_cobalto};
  min-width: 250px;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export const InputAtomStyled = styled.input<{ error?: boolean }>`
  border: 2px solid ${(props) => (props.error ? 'red' : cores.azul_escuro)};
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  font-size: 22px;
  &:focus {
    border-color: ${(props) => (props.error ? 'red' : cores.azul_clinico)};
  }
  ${responsivo(breakpoints.mobile)} {
    font-size: 16px;
  }
`;

export const LabelAtomStyled = styled.label`
  font-size: 18px;
  font-weight: 800;
  ${responsivo(breakpoints.mobile)} {
    font-size: 16px;
  }
`;
