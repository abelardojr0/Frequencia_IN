import { ButtonAtomStyled } from "./style";

interface ButtonAtomProps {
  children: string;
  onClick?: () => void;
}
export const ButtonSecundaryAtom = ({
  children,
  ...props
}: ButtonAtomProps) => {
  return (
    <ButtonAtomStyled type="button" {...props}>
      {children}
    </ButtonAtomStyled>
  );
};
