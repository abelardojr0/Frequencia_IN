import { Link } from "react-router-dom";
import styled from "styled-components";
import { cores } from "../../utils/theme";

export const SubtitleHomeDivStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubtitleHomeSeeAll = styled(Link)`
  color: ${cores.azul_cobalto};
  text-decoration: none;
  font-weight: bold;
`;
