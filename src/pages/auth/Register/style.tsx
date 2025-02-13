import styled from 'styled-components';
import responsivo, { breakpoints } from '../../utils/responsive';

export const FormRegisterStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
  ${responsivo(breakpoints.tablet)} {
    grid-template-columns: 1fr;
  }
`;
