import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductForm from '../components/products/ProductForm';
import ProductList from '../components/products/ProductList';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, 'products', editId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProductToEdit({ id: docSnap.id, ...docSnap.data() });
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
    } else {
      setProductToEdit(null);
    }
  }, [editId]);

  if (loading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>Panel de Administración - FirulaiStore</title>
        <meta name="description" content="Administra los productos de la tienda." />
      </Helmet>
      <Container>
        <h1 className="mb-4">Panel de Administración</h1>
        <Row>
          <Col lg={6}>
            <ProductForm productToEdit={productToEdit} />
          </Col>
          <Col lg={6}>
            <h3>Lista de Productos</h3>
            <ProductList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPanel;