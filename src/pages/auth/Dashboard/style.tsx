import styled from 'styled-components';
import { cores } from '../../utils/theme';
import { Link } from 'react-router-dom';
import fundo from '../../assets/fundo.png';
import responsivo, { breakpoints } from '../../utils/responsive';

export const ContainerDash = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 20px 0;
  background-image: url(${fundo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  ${responsivo(breakpoints.tablet)} {
    padding: 0px;
  }
`;

export const DashEstruturaLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
`;

export const DashEstruturaImagem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
`;
export const DashEstruturaCabecalho = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${responsivo(breakpoints.tablet)} {
    flex-direction: column;
  }
`;

export const DashEstruturaCorpo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;

  background: rgba(255, 255, 255, 0.1);

  backdrop-filter: blur(5px);

  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  ${responsivo(breakpoints.tablet)} {
    box-shadow: none;
    background: none;
    padding: 0px;
  }
`;

export const DashImagem = styled.img`
  max-width: 700px;
  height: 450px;
  border-radius: 20px;
  ${responsivo(breakpoints.desktop)} {
    display: none;
  }
`;

export const BoxDash = styled.section`
  height: 450px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  padding: 20px;
  ${responsivo(breakpoints.tablet)} {
    height: 100%;
  }
`;

export const BoxDivDash = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  width: 100%;
  ${responsivo(breakpoints.tablet)} {
    grid-template-columns: 1fr;
  }
`;

export const ButtonDash = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(76, 111, 169, 1) 0%,
    rgba(30, 62, 139, 1) 31%,
    rgba(76, 111, 169, 1) 100%
  );
  padding: 10px 15px;
  border-radius: 10px;
  color: ${cores.cinza_claro};
  text-decoration: none;
  font-size: 24px;
  transition: 0.8s ease-in-out;
  border: 1px solid ${cores.azul_clinico};
  &:hover {
    background: transparent;
    border: 1px solid ${cores.azul_cobalto};
    color: ${cores.azul_cobalto};
  }
  &.ativo {
    background: transparent;
    color: ${cores.azul_cobalto};
  }
  ${responsivo(breakpoints.mobile)} {
    font-size: 18px;
  }
`;

export const DashLogo = styled.img`
  width: 130px;
`;
export const DashLogoHidden = styled.img`
  width: 250px;
  margin-top: 50px;
`;

export const TitlePageHome = styled.h1`
  font-size: 36px;
  font-family: 'Exo 2', serif;
  color: ${cores.azul_cobalto};
  letter-spacing: 2px;
`;
