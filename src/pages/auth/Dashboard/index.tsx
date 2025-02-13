import { Outlet, useLocation } from 'react-router-dom';
import {
  BoxDash,
  BoxDivDash,
  ButtonDash,
  ContainerDash,
  DashEstruturaCabecalho,
  DashEstruturaCorpo,
  DashEstruturaImagem,
  DashEstruturaLogin,
  DashImagem,
  DashLogo,
  DashLogoHidden,
  TitlePageHome,
} from './style';
import { useEffect, useState } from 'react';
import logo from '../././../assets/logo.png';
import imagem from '../../assets/imagem.png';

export const Dashboard = () => {
  const [active, setActive] = useState<string>('');
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <ContainerDash>
      <DashEstruturaCabecalho>
        <DashLogo src={logo} />
        <TitlePageHome>Dialysis Pro</TitlePageHome>
      </DashEstruturaCabecalho>

      <DashEstruturaCorpo>
        <DashEstruturaImagem>
          <DashImagem src={imagem} alt="" />
        </DashEstruturaImagem>

        <DashEstruturaLogin>
          <BoxDash>
            <BoxDivDash>
              <ButtonDash
                className={active === 'login' ? 'ativo' : ''}
                to={'/login'}
                onClick={() => setActive('login')}
              >
                {location.pathname === '/forgot' ? 'Recuperar' : 'Login'}
              </ButtonDash>
            </BoxDivDash>
            <DashLogoHidden
              src={logo}
              style={{ display: location.pathname === '/' ? 'block' : 'none' }}
            />
            <Outlet />
          </BoxDash>
        </DashEstruturaLogin>
      </DashEstruturaCorpo>
    </ContainerDash>
  );
};
