// react
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
// bootstrap
import { Offcanvas, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
// components
import IconifyIcon from '@/components/wrappers/IconifyIcon';

export default function UserForm({ show, onHide, roles = [], user = null }) {
  const isEdit = !!user?.id;
  const [showPwd, setShowPwd] = useState(false);
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    name: '',
    email: '',
    password: '',
    role: '', 
  });

  useEffect(() => {
    clearErrors();
    if (isEdit) {
      setData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || '',
      });
    } else {
      setData({
        name: '',
        email: '',
        password: generatePassword(8),
        role: roles?.[0] || '',
      });
    }
  }, [user, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route('admin.users.update', user.id), {
        onSuccess: () => onHide(),
        preserveScroll: true,
      });
    } else {
      post(route('admin.users.store'), {
        onSuccess: () => {
          onHide();
          reset();
        },
        preserveScroll: true,
      });
    }
  };

  const roleOptions = Array.isArray(roles)
  ? [...new Set(roles.map((r: any) => (typeof r === 'string' ? r : r?.name).trim()).filter(Boolean))]
  : [];

  function generatePassword(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#-_';
    const array = new Uint32Array(length);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
    } else {
      for (let i = 0; i < length; i++) array[i] = Math.floor(Math.random() * chars.length);
    }
    return Array.from(array, (v) => chars[v % chars.length]).join('');
  }

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" scroll backdrop>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{isEdit ? 'Editar usuario' : 'Nuevo usuario'}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Col>

            <Col xs={12}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Col>

            {!isEdit && (
              <Col xs={12}>
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPwd ? 'text' : 'password'}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    isInvalid={!!errors.password}
                    placeholder="Auto-generada (8 caracteres)"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPwd((v) => !v)}
                    title={showPwd ? 'Ocultar' : 'Mostrar'}
                  >
                    <IconifyIcon icon={showPwd ? 'tabler:eye-off' : 'tabler:eye'} />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setData('password', generatePassword(8))}
                    title="Generar nueva contraseña"
                  >
                    <IconifyIcon icon="tabler:refresh" />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigator.clipboard?.writeText(data.password)}
                    title="Copiar al portapapeles"
                  >
                    <IconifyIcon icon="tabler:copy" />
                  </Button>
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted">
                  La contraseña se genera automáticamente, puedes modificarla si lo necesitas.
                </Form.Text>
              </Col>
            )}


            <Col xs={12}>
              <Form.Label>Rol</Form.Label>
              <Form.Select
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
                isInvalid={!!errors.role}
              >
                {roleOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
            </Col>

            <Col xs={12} className="d-flex gap-2 justify-content-end pt-3">
              <Button variant="outline-secondary" onClick={onHide} disabled={processing}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={processing}>
                {isEdit ? 'Actualizar' : 'Guardar'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
