// react
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
// bootstrap
import { Offcanvas, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
// components
import IconifyIcon from '@/components/wrappers/IconifyIcon';

export default function ProviderForm({ show, onHide, provider = null }) {
    const isEdit = !!provider?.id;
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        number: '',
        designation: '',
    });

    useEffect(() => {
        clearErrors();
        if (isEdit) {
            setData({
                name: provider.name || '',
                number: provider.number || '',
                designation: provider.designation || '',
            });
        } else {
            setData({
                name: '',
                number: '',
                designation: '',
            });
        }
    }, [provider, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('providers.update', provider.id), {
                onSuccess: () => onHide(),
                preserveScroll: true,
            });
        } else {
            post(route('providers.store'), {
                onSuccess: () => {
                    onHide();
                    reset();
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" scroll backdrop>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{isEdit ? 'Editar proveedor' : 'Nuevo Proveedor'}</Offcanvas.Title>
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
                            <Form.Label>Numero</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.number}
                                onChange={(e) => setData('number', e.target.value)}
                                isInvalid={!!errors.number}
                            />
                            <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                        </Col>

                        <Col xs={12}>
                            <Form.Label>Designacion</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.designation}
                                onChange={(e) => setData('designation', e.target.value)}
                                isInvalid={!!errors.designation}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
