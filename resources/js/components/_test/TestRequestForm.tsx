// react
import { useState } from 'react';
import { router, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
// bootstrap
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap';
// components
import IconifyIcon from '@/components/wrappers/IconifyIcon';

type TestType = { id: number; name_es: string };

type TestRequest = {
    id: number;
    item: string;
    notes: string | null;
    style_id: number | null;
    style?: {
        description?: string | null;
        department?: { description: string };
        provider?: { name: string };
    };
    tests?: { test_type_id: number }[]; // asumiendo esto
};

const TestRequestForm = () => {
    const { test_types, test_request } = usePage().props as unknown as {
        test_types: TestType[];
        test_request?: TestRequest | null;
    };

    const isEdit = !!test_request;

    const initialSelectedTestTypeIds = (() => {
        if (!test_request) return [];

        const testNames =
            test_request.test?.[0]?.results?.[0]?.test_names ?? [];

        if (!Array.isArray(testNames) || testNames.length === 0) {
            return [];
        }

        return test_types
            .filter((tt) => testNames.includes(tt.name_es))
            .map((tt) => tt.id);
    })();

    const [loading, setLoading] = useState(false);
    const [itemLoading, setItemLoading] = useState(false);

    const [form, setForm] = useState({
        item: test_request?.item ?? '',
        test_type_ids: initialSelectedTestTypeIds, // 👈 aquí
        notes: test_request?.notes ?? '',
        item_name: test_request?.style?.description ?? '',
        style_id: test_request?.style_id ?? '',
        department_name: test_request?.style?.department?.description ?? '',
        provider_name: test_request?.style?.provider?.name ?? '',
    });

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

        if (isEdit && test_request) {
            router.put(route('test.request.update', test_request.id), form, {
                onFinish: () => setLoading(false),
                preserveScroll: true,
            });
        } else {
            router.post(route('test.request.store'), form, {
                onFinish: () => setLoading(false),
                preserveScroll: true,
            });
        }
    };

    const handleItemKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();

        const value = form.item.trim();
        if (!value) return;

        try {
            setItemLoading(true);

            const { data } = await axios.get(route('items.show', value));

            let itemName: string = '';
            let styleId: number | string = '';
            let departmentName = '';
            let providerName = '';

            if (data.style) {
                itemName = data.style.description;
                styleId = data.style.id ?? '';
                departmentName = data.style.department?.description ?? '';
                providerName = data.style.provider?.name ?? '';
            } else {
                itemName = data.description;
            }

            setForm((prev) => ({
                ...prev,
                item_name: itemName ?? '',
                style_id: styleId,
                department_name: departmentName,
                provider_name: providerName,
            }));
        } catch (error: any) {
            setForm((prev) => ({
                ...prev,
                item_name: '',
                style_id: '',
                department_name: '',
                provider_name: '',
            }));
            console.error('Error buscando item', error?.response ?? error);
        } finally {
            setItemLoading(false);
        }
    };

    return (
        <Row className="justify-content-center">
            <Col lg={12}>
                <Card>
                    <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                        <h5 className="mb-0">
                            {isEdit ? 'Editar solicitud' : 'Formulario de solicitud'}
                        </h5>
                        <Link href={route('test.request.index')}>
                            <Button variant="soft-secondary">
                                <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Regresar
                            </Button>
                        </Link>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            {/* hidden para style_id */}
                            <input type="hidden" name="style_id" value={form.style_id} />

                            <Row className="g-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>SKU o estilo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="item"
                                            value={form.item}
                                            onChange={handleChange}
                                            onKeyDown={handleItemKeyDown}
                                            placeholder="Ej. 100577957"
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            placeholder=""
                                            value={
                                                itemLoading
                                                    ? 'Buscando...'
                                                    : form.item_name
                                            }
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Departamento</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            placeholder=""
                                            value={form.department_name}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Proveedor</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            placeholder=""
                                            value={form.provider_name}
                                        />
                                    </Form.Group>
                                </Col>

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
                                                {isEdit ? 'Actualizando...' : 'Guardando...'}
                                            </>
                                        ) : (
                                            <>
                                                <IconifyIcon
                                                    icon="tabler:device-floppy"
                                                    className="me-2"
                                                />
                                                {isEdit ? 'Actualizar solicitud' : 'Guardar solicitud'}
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

export default TestRequestForm;
