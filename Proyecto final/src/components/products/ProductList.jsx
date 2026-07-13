import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (error) {
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  if (loading) return <Spinner />;

  return (
    <Row>
      {products.length > 0 ? (
        products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} className="mb-3">
            <ProductCard product={product} onDelete={handleDelete} />
          </Col>
        ))
      ) : (
        <p>No hay productos registrados.</p>
      )}
    </Row>
  );
};

export default ProductList;