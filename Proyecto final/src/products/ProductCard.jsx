import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEdit, FaTrash } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const ProductCard = ({ product, onDelete }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'products', product.id));
      toast.success('Producto eliminado');
      setShowModal(false);
      if (onDelete) onDelete(product.id);
    } catch (error) {
      toast.error('Error al eliminar producto');
    }
  };

  return (
    <>
      <StyledCard>
        <Card.Img variant="top" src={product.image || 'https://via.placeholder.com/300x200'} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price.toFixed(2)}</Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>
            <FaShoppingCart /> Agregar
          </Button>
          <Link to={`/product/${product.id}`}>
            <Button variant="secondary" className="ms-2">Ver</Button>
          </Link>
          {user && (
            <>
              <Link to={`/admin?edit=${product.id}`}>
                <Button variant="warning" className="ms-2">
                  <FaEdit />
                </Button>
              </Link>
              <Button variant="danger" className="ms-2" onClick={() => setShowModal(true)}>
                <FaTrash />
              </Button>
            </>
          )}
        </Card.Body>
      </StyledCard>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar el producto "{product.name}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;