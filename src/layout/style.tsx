import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cores } from '../../utils/theme';
import responsivo, { breakpoints } from '../../utils/responsive';
import fundo from '../../assets/fundo.png';

export const Container = styled.main`
  display: flex;
  min-height: 100vh;
  background-image: url(${fundo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const MenuHamburguerStyled = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  align-self: flex-start;
  padding: 0;
  &.desativo {
    align-self: center;
  }
`;

export const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 20px;
  background: rgba(255, 255, 255, 0.368);

  backdrop-filter: blur(5px);

  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  max-width: 17vw;
  padding-top: 40px;
  padding: 20px;
  transition: 0.4s ease-in-out;
  ${responsivo(breakpoints.desktop)} {
    width: 10vw;
  }
  &.desativo {
    width: 8vw;
    align-items: center;
    padding-left: 0px;
    padding: 10px;
    ${responsivo(breakpoints.tablet)} {
      width: 12vw;
    }
  }
  & svg {
    color: ${cores.azul_clinico};
    font-size: 35px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &.ativo {
      color: ${cores.azul_clinico};
      color: ${cores.azul_cobalto};
    }
    &:hover {
      color: ${cores.azul_cobalto};
    }
  }
`;

export const HeaderLogoStyled = styled(Link)`
  align-self: center;
  img {
    max-width: 120px;
  }
  &.desativo img {
    max-width: 70px;
  }
`;

export const HeaderList = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`;

export const HeaderListItemText = styled(Link)`
  color: ${cores.azul_clinico};
  text-decoration: none;
  font-size: 24px;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    color: ${cores.azul_cobalto};
    & svg {
      color: ${cores.azul_escuro};
    }
  }
  &.ativo {
    text-decoration: underline;
    color: ${cores.azul_escuro};
  }
`;

export const ContainerSection = styled.section`
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 40px;
`;

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
`;

export const ProfileIcon = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${cores.azul_cobalto};
  color: ${cores.azul_cobalto};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  transition: 0.5s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  border-radius: 8px;
  padding: 10px 0;
  z-index: 1000;
`;

export const DropdownItem = styled.div`
  padding: 10px 20px;
  color: #333;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const UserNameDisplay = styled.div`
  padding: 10px 20px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  background-color: #f1f1f1;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: default;
`;
