import React, { useState } from 'react';
import {Head, Link, usePage} from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';
import TestRequestShowDetail from '@/components/_test/TestRequestShowDetail';
import TestRequestShowDetailContent from '@/components/_test/TestRequestShowDetailContent';
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
                title={`Solicitud de Prueba`}
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
                    <TestRequestShowDetail
                        title={`Solicitud #${testRequest.number}`}
                        description={
                            <>
                                <span className="d-block">
                                    {console.log(testRequest)}
                                    {testRequest.style?.number.length > 0 ? (
                                        <>
                                            <strong>Estilo:</strong> {testRequest.style.number}
                                        </>
                                    ) : (
                                        <>
                                            <strong>SKU:</strong> {testRequest.item}
                                        </>
                                    )}
                                </span>
                                <span className="d-block">
                                    <strong>Departamento:</strong> {testRequest.style?.department.description ?? ''}
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
                                                                    <TestRequestShowDetailContent result={r} />
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
                    </TestRequestShowDetail>
                </Col>
            </Row>
        </MainLayout>
    );
};

export default TestRequestShow;
