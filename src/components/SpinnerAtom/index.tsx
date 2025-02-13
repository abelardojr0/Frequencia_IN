import { CSSProperties } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { StyledContainerSpinner } from './style';
import { cores } from '../../../utils/theme';

export const SpinnerAtom = ({ loading }: any) => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
  };
  return (
    <StyledContainerSpinner>
      <BeatLoader
        color={cores.azul_cobalto}
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </StyledContainerSpinner>
  );
};
