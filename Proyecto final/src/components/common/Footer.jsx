import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div>🐾 FirulaiStore - Todos los derechos reservados &copy; {new Date().getFullYear()}</div>
    </FooterWrapper>
  );
};

export default Footer;