import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error('Producto no encontrado');
        }
      } catch (error) {
        toast.error('Error al cargar producto');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  if (loading) return <Spinner />;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <>
      <Helmet>
        <title>{product.name} - FirulaiStore</title>
        <meta name="description" content={product.description || 'Accesorio para mascotas'} />
      </Helmet>
      <Container>
        <Row className="mt-4">
          <Col md={6}>
            <Image src={product.image || 'https://via.placeholder.com/500'} fluid />
          </Col>
          <Col md={6}>
            <h1>{product.name}</h1>
            <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {product.stock} unidades</p>
            <p><strong>Categoría:</strong> {product.category || 'General'}</p>
            <p>{product.description}</p>
            <Button variant="primary" onClick={handleAddToCart}>
              <FaShoppingCart /> Agregar al Carrito
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetailPage;