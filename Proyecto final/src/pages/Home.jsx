import { Helmet } from 'react-helmet';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Hero = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 40px;
`;

const Home = () => {
  return (
    <>
      <Helmet>
        <title>FirulaiStore</title>
        <meta name="description" content="Los mejores accesorios para perros y gatos. Collares, correas, camas y más." />
      </Helmet>
      <Container>
        <Hero>
          <h1>Bienvenido a FirulaiStore</h1>
          <p>Encuentra los mejores accesorios para tu mascota</p>
          <Button as={Link} to="/products" variant="light" size="lg">
            Ver Productos
          </Button>
        </Hero>
        <Row className="text-center">
          <Col md={4}>
            <h3>🐕 Collares</h3>
            <p>Collares ajustables y cómodos para tu perro.</p>
          </Col>
          <Col md={4}>
            <h3>🐈 Juguetes</h3>
            <p>Juguetes interactivos para mantenerlos activos.</p>
          </Col>
          <Col md={4}>
            <h3>🛏️ Camas</h3>
            <p>Camas suaves y acogedoras para un buen descanso.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;