// react
import { useState } from 'react';
import { router, Link, usePage } from '@inertiajs/react';
// bootstrap
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap';
// components
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const TestForm = () => {
    const { test_types } = usePage().props as {
        test_types: { id: number; name_es: string }[];
    };

    const [form, setForm] = useState({
        client_name: '',
        garment_name: '',
        test_type_ids: [] as number[], // múltiples pruebas
        notes: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (id: number) => {
        setForm((prev) => {
            const selected = prev.test_type_ids.includes(id)
                ? prev.test_type_ids.filter((typeId) => typeId !== id)
                : [...prev.test_type_ids, id];
            return { ...prev, test_type_ids: selected };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        router.post(route('test.request.store'), form, {
            onFinish: () => setLoading(false),
            preserveScroll: true,
        });
    };

    return (
        <Row className="justify-content-center">
            <Col lg={12}>
                <Card>
                    <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                        <h5 className="mb-0">Formulario de solicitud</h5>
                        <Link href={route('test.request.index')}>
                            <Button variant="soft-secondary">
                                <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Regresar
                            </Button>
                        </Link>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Nombre del cliente</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="client_name"
                                            value={form.client_name}
                                            onChange={handleChange}
                                            placeholder="Ej. Textiles Rivera"
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Nombre de la prenda</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="garment_name"
                                            value={form.garment_name}
                                            onChange={handleChange}
                                            placeholder="Ej. Camisa algodón"
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                {/* 🔹 Selección múltiple de tipos de prueba */}
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Tipos de prueba</Form.Label>
                                        <div className="d-flex flex-wrap gap-3 mt-2">
                                            {test_types?.map((type) => (
                                                <Form.Check
                                                    key={type.id}
                                                    type="checkbox"
                                                    id={`test-type-${type.id}`}
                                                    label={type.name_es}
                                                    checked={form.test_type_ids.includes(type.id)}
                                                    onChange={() => handleCheckboxChange(type.id)}
                                                />
                                            ))}
                                        </div>
                                    </Form.Group>
                                </Col>

                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Notas adicionales</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="notes"
                                            rows={4}
                                            value={form.notes}
                                            onChange={handleChange}
                                            placeholder="Información adicional sobre la muestra o solicitud..."
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} className="d-flex justify-content-end mt-4">
                                    <Button
                                        type="submit"
                                        variant="success"
                                        className="bg-gradient"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <IconifyIcon
                                                    icon="tabler:loader"
                                                    className="me-2 spinner-border spinner-border-sm"
                                                />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <IconifyIcon
                                                    icon="tabler:device-floppy"
                                                    className="me-2"
                                                />
                                                Guardar solicitud
                                            </>
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default TestForm;
