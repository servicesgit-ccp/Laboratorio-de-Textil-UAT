import React, { useState } from 'react';
import {Head, Link, usePage} from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';
import ShowDetailTest from '@/components/_test/ShowDetailTest';
import {Button, Card, Col, Nav, Row, Tab} from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const TestRequestShow = () => {
    const { testRequest } = usePage().props as { testRequest: any };

    const [activeKey, setActiveKey] = useState(
        testRequest.test?.length ? `test-${testRequest.test[0].id}` : ''
    );

    return (
        <MainLayout>
            <Head title={`Solicitud #${testRequest.number}`} />

            <PageTitle
                title={`Solicitud de Prueba #${testRequest.number}`}
                subTitle="Detalle de pruebas asociadas"
            />

            <Row className="mt-3">
                <Col xs={12}>
                    <div className="d-flex justify-content-end mb-3">
                        <Link href={route('test.request.index')}>
                            <Button variant="soft-secondary">
                                <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Regresar
                            </Button>
                        </Link>
                    </div>
                    <ShowDetailTest
                        title={`Solicitud #${testRequest.number}`}
                        description={
                            <>
                                <span className="d-block">
                                    <strong>ID:</strong> {testRequest.id}
                                </span>
                                <span className="d-block">
                                    <strong>Usuario:</strong> {testRequest.user_id}
                                </span>
                                <span className="d-block">
                                    <strong>Estilo:</strong> {testRequest.style_id}
                                </span>
                                <span className="d-block">
                                    <strong>Estatus:</strong>{' '}
                                    <span
                                        className={`badge bg-${
                                            testRequest.status === 0
                                                ? 'success'
                                                : testRequest.status === 1
                                                    ? 'warning'
                                                    : 'secondary'
                                        }`}
                                    >
                                        {testRequest.status === 0
                                            ? 'Completado'
                                            : testRequest.status === 1
                                                ? 'Pendiente'
                                                : 'Cancelado'}
                                    </span>
                                </span>
                                <span className="d-block">
                                    <strong>Creado:</strong>{' '}
                                    {new Date(testRequest.created_at).toLocaleString()}
                                </span>
                            </>
                        }
                    >
                        {testRequest.test?.length ? (
                            <Tab.Container
                                activeKey={activeKey}
                                onSelect={(k) => k && setActiveKey(k)}
                            >
                                <Nav variant="tabs" className="mb-3">
                                    {testRequest.test.map((t: any) => (
                                        <Nav.Item key={t.id}>
                                            <Nav.Link eventKey={`test-${t.id}`}>
                                                <IconifyIcon
                                                    icon="tabler:flask"
                                                    className="me-1"
                                                />
                                                Test #{t.id}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>

                                <Tab.Content>
                                    {testRequest.test.map((t: any) => (
                                        <Tab.Pane eventKey={`test-${t.id}`} key={t.id}>
                                            <Card className="border shadow-sm rounded-3">
                                                <Card.Body>
                                                    <h5 className="fw-semibold mb-3">
                                                        <IconifyIcon
                                                            icon="tabler:microscope"
                                                            className="me-1"
                                                        />
                                                        Detalles del Test
                                                    </h5>

                                                    <Row className="gy-2">
                                                        <Col md={4}>
                                                            <strong>Inicio:</strong>{' '}
                                                            {t.started_at
                                                                ? new Date(
                                                                    t.started_at
                                                                ).toLocaleString()
                                                                : 'Sin iniciar'}
                                                        </Col>
                                                        <Col md={4}>
                                                            <strong>Fin:</strong>{' '}
                                                            {t.finished_at
                                                                ? new Date(
                                                                    t.finished_at
                                                                ).toLocaleString()
                                                                : 'No finalizado'}
                                                        </Col>
                                                        <Col md={4}>
                                                            <strong>ID Test:</strong> {t.id}
                                                        </Col>
                                                    </Row>

                                                    <hr />

                                                    <h6 className="fw-semibold mb-3">
                                                        <IconifyIcon
                                                            icon="tabler:report-analytics"
                                                            className="me-1"
                                                        />
                                                        Resultados
                                                    </h6>

                                                    {t.results?.length ? (
                                                        <div className="bg-light p-3 rounded-3">
                                                            {t.results.map((r: any) => (
                                                                <div
                                                                    key={r.id}
                                                                    className="mb-3 border-bottom pb-2"
                                                                >
                                                                    <strong>
                                                                        Resultado #{r.id}
                                                                    </strong>
                                                                    <pre className="bg-white p-2 rounded border mt-2">
                                                                        {r.content &&
                                                                        Array.isArray(r.content)
                                                                            ? JSON.stringify(
                                                                                r.content,
                                                                                null,
                                                                                2
                                                                            )
                                                                            : r.content ||
                                                                            'Sin contenido'}
                                                                    </pre>
                                                                    <small className="text-muted">
                                                                        Creado:{' '}
                                                                        {new Date(
                                                                            r.created_at
                                                                        ).toLocaleString()}
                                                                    </small>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted">
                                                            No hay resultados para este test.
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Tab.Container>
                        ) : (
                            <div className="text-muted">No hay pruebas asociadas.</div>
                        )}
                    </ShowDetailTest>
                </Col>
            </Row>
        </MainLayout>
    );
};

export default TestRequestShow;
