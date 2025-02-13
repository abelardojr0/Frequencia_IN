// src/pages/Home/index.tsx
import { useEffect } from "react";
import { usePresencas } from "../../hooks/usePresenca";
import { SubtitlePage, TitlePage } from "../../utils/globalStyles";
import { SubtitleHomeDivStyled } from "./style";

export const Home = () => {

  const {presencas, buscarPresencas} = usePresencas()
  useEffect(()=>{
    buscarPresencas()
  },[])
  return (
    <>
      <TitlePage>Dashboard</TitlePage>
      <SubtitleHomeDivStyled>
        <SubtitlePage>Frequencia</SubtitlePage>
        <ul>
          {presencas.map((presenca) => (
            <li key={presenca.id}>
              {presenca.data} - {presenca.turma}
            </li>
          ))}
        </ul>
      </SubtitleHomeDivStyled>
    </>
  );
};
