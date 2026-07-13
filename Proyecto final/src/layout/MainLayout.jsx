import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled(Container)`
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const MainLayout = () => {
  return (
    <MainWrapper>
      <Navbar />
      <Content fluid="lg">
        <Outlet />
      </Content>
      <Footer />
    </MainWrapper>
  );
};

export default MainLayout;