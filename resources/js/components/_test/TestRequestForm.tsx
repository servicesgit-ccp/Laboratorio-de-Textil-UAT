// react
import { useState } from 'react';
import { router, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
// bootstrap
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap';
// components
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import CameraCapture from '../_test-results/CameraCapture';

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
    tests?: { test_type_id: number }[];
    is_development?: boolean;
    is_informative?: boolean;
    new_image: string | null;
    image?: string | null;
};

type FormState = {
    item: string;
    test_type_ids: number[];
    notes: string;
    item_name: string;
    style_id: number | string;
    department_name: string;
    provider_name: string;
    is_development: boolean;
    is_informative: boolean;
};

const TestRequestForm = () => {
    const { test_types, test_request } = usePage().props as unknown as {
        test_types: TestType[];
        test_request?: TestRequest | null;
    };

    const isEdit = !!test_request;

    const initialSelectedTestTypeIds = (() => {
        if (!test_request) return [];

        const testNames = test_request.test?.[0]?.results?.[0]?.test_names ?? [];

        if (!Array.isArray(testNames) || testNames.length === 0) {
            return [];
        }

        return test_types
            .filter((tt) => testNames.includes(tt.name_es))
            .map((tt) => tt.id);
    })();

    const [loading, setLoading] = useState(false);
    const [itemLoading, setItemLoading] = useState(false);

    // 👇 estado extra para manejar imagen remota y posible nueva imagen
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageLoadError, setImageLoadError] = useState(false);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);

    const [form, setForm] = useState<FormState>({
        item: test_request?.item ?? '',
        test_type_ids: initialSelectedTestTypeIds,
        notes: test_request?.notes ?? '',
        item_name: test_request?.style?.description ?? '',
        style_id: test_request?.style_id ?? 1,
        department_name: test_request?.style?.department?.description ?? '',
        provider_name: test_request?.style?.provider?.name ?? '',
        is_development: !!test_request?.is_development,
        is_informative: !!test_request?.is_informative,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFlagChange = (
        name: 'is_development' | 'is_informative',
        checked: boolean
    ) => {
        setForm((prev) => ({
            ...prev,
            [name]: checked,
            ...(checked
                ? {
                    department_name: '',
                    provider_name: '',
                }
                : {}),
        }));
        if (checked) {
            setImageUrl(null);
            setImageLoadError(true);
            setNewImageFile(null);
        }
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

        const data = new FormData();

        data.append('item', form.item);
        data.append('notes', form.notes ?? '');
        data.append('style_id', String(form.style_id || ''));
        data.append('is_development', form.is_development ? '1' : '0');
        data.append('is_informative', form.is_informative ? '1' : '0');

        form.test_type_ids.forEach((id, idx) => {
            data.append(`test_type_ids[${idx}]`, String(id));
        });

        if (newImageFile) {
            data.append('new_image', newImageFile);
        }

        const url = isEdit && test_request
            ? route('test.request.update', test_request.id)
            : route('test.request.store');

        const method = isEdit && test_request ? 'post' : 'post';
        if (isEdit && test_request) {
            data.append('_method', 'PUT');
        }

        router.post(url, data, {
            forceFormData: true,   // por si acaso, lo forzamos
            onFinish: () => setLoading(false),
            preserveScroll: true,
        });
    };


    const handleItemKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();

        if (form.is_development || form.is_informative) {
            return;
        }

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
                departmentName = data.department?.description ?? '';
                providerName = data.provider?.name ?? '';
            }

            const img = data.image ?? null;

            setForm((prev) => ({
                ...prev,
                item_name: itemName ?? '',
                style_id: styleId,
                department_name: departmentName,
                provider_name: providerName,
            }));

            setNewImageFile(null);
            setImageLoadError(false);
            setImageUrl(img);
        } catch (error: any) {
            setForm((prev) => ({
                ...prev,
                item_name: 'NO ENCONTRADO / NUEVO',
                style_id: 1,
                department_name: '',
                provider_name: '',
            }));
            setImageUrl(null);
            setNewImageFile(null);
            setImageLoadError(false);

            console.error('Error buscando item', error?.response ?? error);
        } finally {
            setItemLoading(false);
        }
    };

    const handleCaptureFilesChange = (files: File[]) => {
        const file = files[0] ?? null;

        setNewImageFile(file);

        if (file) {
            setImageLoadError(false);
            setImageUrl(URL.createObjectURL(file));
        } else {
            setImageUrl(null);
        }
    };

    const handleImageError = () => {
        setImageLoadError(true);
        setImageUrl(null);
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

                            <Row>
                                <Col lg={8}>
                                    <Row className="g-3">
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label>Tipo de solicitud</Form.Label>
                                                <div className="d-flex flex-wrap gap-4 mt-2">
                                                    <Form.Check
                                                        type="checkbox"
                                                        id="flag-desarrollo"
                                                        label="Desarrollo"
                                                        checked={form.is_development}
                                                        onChange={(e) =>
                                                            handleFlagChange(
                                                                'is_development',
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <Form.Check
                                                        type="checkbox"
                                                        id="flag-informativo"
                                                        label="Informativo"
                                                        checked={form.is_informative}
                                                        onChange={(e) =>
                                                            handleFlagChange(
                                                                'is_informative',
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>

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
                                        {!(form.is_development || form.is_informative) && (
                                        <>
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
                                        </>
                                        )}
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
                                                            checked={form.test_type_ids.includes(
                                                                type.id
                                                            )}
                                                            onChange={() =>
                                                                handleCheckboxChange(type.id)
                                                            }
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

                                        <Col
                                            xs={12}
                                            className="d-flex justify-content-end mt-4"
                                        >
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
                                                        {isEdit
                                                            ? 'Actualizando...'
                                                            : 'Guardando...'}
                                                    </>
                                                ) : (
                                                    <>
                                                        <IconifyIcon
                                                            icon="tabler:device-floppy"
                                                            className="me-2"
                                                        />
                                                        {isEdit
                                                            ? 'Actualizar solicitud'
                                                            : 'Guardar solicitud'}
                                                    </>
                                                )}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>

                                {/* Columna derecha: recuadro de imagen / captura */}
                               <Col lg={4} className="mt-3 mt-lg-0">
                                    <div className="border rounded p-3 h-100 d-flex flex-column align-items-center justify-content-center">
                                        {!(form.is_development || form.is_informative) && imageUrl && !imageLoadError ? (
                                            <>
                                                <Form.Label>Imagen de la muestra</Form.Label>
                                                <img
                                                    src={imageUrl}
                                                    alt="Imagen del artículo"
                                                    className="img-fluid mt-2"
                                                    style={{ maxHeight: '300px' }}
                                                    onError={handleImageError}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Form.Label className="mb-2">
                                                    Capturar / subir imagen
                                                </Form.Label>

                                                <CameraCapture
                                                    multiple={false}
                                                    helperText="Toca el botón para tomar o seleccionar una foto."
                                                    initialImages={[]}
                                                    onFilesChange={handleCaptureFilesChange}
                                                />
                                            </>
                                        )}
                                    </div>
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
