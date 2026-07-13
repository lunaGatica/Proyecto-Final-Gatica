import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <ClipLoader color="#36d7b7" size={50} />
    </SpinnerWrapper>
  );
};

export default Spinner;