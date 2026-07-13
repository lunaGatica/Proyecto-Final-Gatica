import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ productToEdit, onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    stock: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        price: productToEdit.price || '',
        description: productToEdit.description || '',
        image: productToEdit.image || '',
        stock: productToEdit.stock || '',
        category: productToEdit.category || '',
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.name.trim()) {
      toast.error('El nombre es obligatorio');
      return false;
    }
    if (parseFloat(formData.price) <= 0) {
      toast.error('El precio debe ser mayor a 0');
      return false;
    }
    if (parseInt(formData.stock) < 0) {
      toast.error('El stock no puede ser negativo');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      if (productToEdit) {
        await updateDoc(doc(db, 'products', productToEdit.id), data);
        toast.success('Producto actualizado');
      } else {
        await addDoc(collection(db, 'products'), data);
        toast.success('Producto agregado');
      }
      if (onSuccess) onSuccess();
      navigate('/products');
    } catch (error) {
      toast.error('Error al guardar producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>{productToEdit ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL de Imagen</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Stock *</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Guardando...' : (productToEdit ? 'Actualizar' : 'Agregar')}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;