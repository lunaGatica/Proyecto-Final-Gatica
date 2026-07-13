import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useCart } from '../context/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.info(`${name} eliminado del carrito`);
  };

  if (cart.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Helmet>
          <title>Carrito - FirulaiStore</title>
          <meta name="description" content="Tu carrito de compras." />
        </Helmet>
        <h2>Tu carrito está vacío</h2>
        <Link to="/products">
          <Button variant="primary">Seguir comprando</Button>
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Carrito - FirulaiStore</title>
        <meta name="description" content="Revisa los productos en tu carrito." />
      </Helmet>
      <Container>
        <h1 className="mb-4">Carrito de Compras</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(item.id, item.name)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end"><strong>Total:</strong></td>
              <td><strong>${getTotalPrice().toFixed(2)}</strong></td>
              <td>
                <Button variant="warning" onClick={clearCart}>
                  Vaciar Carrito
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
        <div className="text-end">
          <Link to="/products">
            <Button variant="secondary" className="me-2">
              Seguir comprando
            </Button>
          </Link>
          <Button variant="success">
            <FaShoppingCart /> Finalizar Compra
          </Button>
        </div>
      </Container>
    </>
  );
};

export default CartPage;