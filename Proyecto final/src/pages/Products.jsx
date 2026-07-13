import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductCard from '../components/products/ProductCard';
import SearchBar from '../components/ui/SearchBar';
import Paginator from '../components/ui/Paginator';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        toast.error('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>Productos - FirulaiStore</title>
        <meta name="description" content="Catálogo completo de accesorios para mascotas." />
      </Helmet>
      <Container>
        <h1 className="mb-4">Nuestros Productos</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Row>
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <p className="text-center">No se encontraron productos</p>
          )}
        </Row>
        {totalPages > 1 && (
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Container>
    </>
  );
};

export default Products;