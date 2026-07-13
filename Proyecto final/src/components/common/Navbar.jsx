import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const StyledNavbar = styled(BsNavbar)`
  background-color: #2c3e50;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavLinkStyled = styled(NavLink)`
  color: white !important;
  margin-right: 15px;
  text-decoration: none;
  &:hover {
    color: #f1c40f !important;
  }
  &.active {
    color: #f1c40f !important;
    font-weight: bold;
  }
`;

const CartIconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CartBadge = styled(Badge)`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  border-radius: 50%;
  padding: 4px 6px;
  font-size: 0.7rem;
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Sesión cerrada');
    navigate('/');
  };

  return (
    <StyledNavbar expand="lg">
      <Container>
        <BsNavbar.Brand as={NavLink} to="/" style={{ color: 'white', fontWeight: 'bold' }}>
          🐾 PetShop
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLinkStyled to="/">Inicio</NavLinkStyled>
            <NavLinkStyled to="/products">Productos</NavLinkStyled>
            {user && <NavLinkStyled to="/admin">Administrar</NavLinkStyled>}
          </Nav>
          <Nav>
            <NavLinkStyled to="/cart">
              <CartIconWrapper>
                <FaShoppingCart size={20} />
                <CartBadge>{getTotalItems()}</CartBadge>
              </CartIconWrapper>
            </NavLinkStyled>
            {user ? (
              <>
                <span style={{ color: 'white', marginRight: '15px' }}>
                  <FaUser /> {user.email}
                </span>
                <NavLinkStyled as="button" onClick={handleLogout} style={{ background: 'none', border: 'none' }}>
                  <FaSignOutAlt /> Salir
                </NavLinkStyled>
              </>
            ) : (
              <>
                <NavLinkStyled to="/login">
                  <FaSignInAlt /> Iniciar Sesión
                </NavLinkStyled>
                <NavLinkStyled to="/register">
                  <FaUserPlus /> Registrarse
                </NavLinkStyled>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;