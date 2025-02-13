import styled from 'styled-components';
import { cores } from '../../../utils/theme';
import responsivo, { breakpoints } from '../../../utils/responsive';

export const ButtonAtomStyled = styled.button`
  border: none;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgba(76, 111, 169, 1) 0%,
    rgba(30, 62, 139, 1) 31%,
    rgba(76, 111, 169, 1) 100%
  );
  color: ${cores.cinza_claro};
  padding: 15px 30px;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: scale(1.03);
  }

  &:disabled {
    background: linear-gradient(
      90deg,
      rgba(196, 196, 196, 1) 0%,
      rgba(169, 169, 169, 1) 31%,
      rgba(196, 196, 196, 1) 100%
    );
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    box-shadow: none;
    transform: scale(1); 
  }

  ${responsivo(breakpoints.mobile)} {
    font-size: 18px;
  }
`;
