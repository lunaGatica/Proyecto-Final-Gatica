import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Inicio de sesión exitoso');
      navigate('/');
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - PetShop Store</title>
        <meta name="description" content="Inicia sesión en PetShop Store." />
      </Helmet>
      <Container className="mt-5" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">
          <FaSignInAlt /> Iniciar Sesión
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
        </Form>
        <div className="text-center mt-3">
          <Link to="/register">¿No tienes cuenta? Regístrate</Link>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;