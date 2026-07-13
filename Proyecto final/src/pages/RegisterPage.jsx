import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserPlus } from 'react-icons/fa';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      toast.success('Registro exitoso');
      navigate('/');
    } catch (error) {
      setError('Error al registrarse: ' + error.message);
      toast.error('Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Registrarse - FirulaiStore</title>
        <meta name="description" content="Crea tu cuenta en PetShop Store." />
      </Helmet>
      <Container className="mt-5" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">
          <FaUserPlus /> Registrarse
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
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? 'Cargando...' : 'Registrarse'}
          </Button>
        </Form>
        <div className="text-center mt-3">
          <Link to="/login">¿Ya tienes cuenta? Inicia Sesión</Link>
        </div>
      </Container>
    </>
  );
};

export default RegisterPage;