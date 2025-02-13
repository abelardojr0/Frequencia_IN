import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  ContainerSection,
  DropdownItem,
  DropdownMenu,
  HeaderList,
  HeaderListItemText,
  HeaderLogoStyled,
  HeaderStyled,
  MenuHamburguerStyled,
  ProfileContainer,
  ProfileIcon,
  UserNameDisplay,
} from "./style";
import logo from "../../assets/logo.png";
import React, { useContext, useEffect, useRef, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import BadgeIcon from "@mui/icons-material/Badge";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import { AuthContext } from "../context/AuthProvider";

export const Layout = () => {
  const type = localStorage.getItem("user_type");

  const location = useLocation();
  const currentPath = location.pathname;
  const [itens, setItens] = useState<any>([
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Máquinas", path: "/maquinas", icon: <MedicalInformationIcon /> },
    { text: "Pacientes", path: "/pacientes", icon: <RecordVoiceOverIcon /> },
    { text: "Funcionários", path: "/funcionarios", icon: <BadgeIcon /> },
    { text: "Hospitais", path: "/hospitais", icon: <LocalHospitalIcon /> },
    { text: "Diálises", path: "/dialises", icon: <VaccinesIcon /> },
    { text: "Usuários", path: "/usuarios", icon: <AccountCircleIcon /> },
  ]);

  useEffect(() => {
    if (type === "Admin") {
      setItens([
        { text: "Home", path: "/", icon: <HomeIcon /> },
        {
          text: "Máquinas",
          path: "/maquinas",
          icon: <MedicalInformationIcon />,
        },
        {
          text: "Pacientes",
          path: "/pacientes",
          icon: <RecordVoiceOverIcon />,
        },
        { text: "Funcionários", path: "/funcionarios", icon: <BadgeIcon /> },

        { text: "Hospitais", path: "/hospitais", icon: <LocalHospitalIcon /> },
        { text: "Diálises", path: "/dialises", icon: <VaccinesIcon /> },
        { text: "Usuários", path: "/usuarios", icon: <AccountCircleIcon /> },
      ]);
    } else if (type === "Enfermeiro") {
      setItens([
        { text: "Home", path: "/", icon: <HomeIcon /> },
        {
          text: "Máquinas",
          path: "/maquinas",
          icon: <MedicalInformationIcon />,
        },
        { text: "Diálises", path: "/dialises", icon: <VaccinesIcon /> },
      ]);
    } else if (type === "Médico") {
      setItens([
        { text: "Home", path: "/", icon: <HomeIcon /> },
        {
          text: "Máquinas",
          path: "/maquinas",
          icon: <MedicalInformationIcon />,
        },
        {
          text: "Pacientes",
          path: "/pacientes",
          icon: <RecordVoiceOverIcon />,
        },
        { text: "Diálises", path: "/dialises", icon: <VaccinesIcon /> },
      ]);
    } else if (type === "Ténico de Enfermagem") {
      setItens([
        { text: "Home", path: "/", icon: <HomeIcon /> },
        { text: "Diálises", path: "/dialises", icon: <VaccinesIcon /> },
      ]);
    }
  }, [type]);

  const [open, setOpen] = useState<boolean>(true);
  const [checkSize, setCheckSize] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1300) {
        setOpen(false);
        setCheckSize(false);
      } else {
        setOpen(true);
        setCheckSize(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controla o estado do dropdown
  const [user, setUser] = useState<any>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user) {
      const userName = auth.user?.nome || "";
      const userPhoto = auth.user?.profile_picture;

      if (userPhoto) {
        setUser({
          name: userName,
          photo: userPhoto,
        });
      } else {
        const nameParts = userName.split(" ");
        const initials =
          nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : "");
        setUser({
          name: userName,
          initials: initials.toUpperCase(),
        });
      }
    }
  }, [auth.user]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const dropdownRef: any = useRef(null);
  const profileIconRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <HeaderStyled className={open ? "" : "desativo"}>
        <HeaderLogoStyled className={open ? "" : "desativo"} to={"/"}>
          <img src={logo} alt="Logo" />
        </HeaderLogoStyled>
        {checkSize && (
          <MenuHamburguerStyled
            className={open ? "" : "desativo"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <FormatAlignLeftIcon /> : <FormatAlignRightIcon />}
          </MenuHamburguerStyled>
        )}

        <nav>
          <HeaderList>
            {itens &&
              itens.map((item: any) => (
                <li key={item.path}>
                  <HeaderListItemText
                    className={currentPath === item.path ? "ativo" : ""}
                    to={item.path}
                  >
                    {item.icon &&
                      React.cloneElement(item.icon, {
                        className: currentPath === item.path ? "ativo" : "",
                      })}

                    {open && checkSize && item.text}
                  </HeaderListItemText>
                </li>
              ))}
          </HeaderList>
        </nav>
      </HeaderStyled>

      <ContainerSection>
        <ProfileContainer>
          <ProfileIcon ref={profileIconRef} onClick={toggleDropdown}>
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            ) : (
              user?.initials
            )}
          </ProfileIcon>
          {isDropdownOpen && (
            <DropdownMenu ref={dropdownRef}>
              <UserNameDisplay>{user?.name}</UserNameDisplay>
              <DropdownItem
                onClick={() => navigate(`/configuracoes/${auth?.user?.id}`)}
              >
                Configurações
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
            </DropdownMenu>
          )}
        </ProfileContainer>
        <Outlet />
      </ContainerSection>
    </Container>
  );
};
