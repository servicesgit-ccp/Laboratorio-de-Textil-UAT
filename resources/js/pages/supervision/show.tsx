import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';
import { Button, Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

// Componentes de supervisión
import SupervisionInfoCard from '@/components/_supervision/SupervisionInfoCard';
import SupervisionProgress from '@/components/_supervision/SupervisionProgress';
import SupervisionTestResultsList from '@/components/_supervision/SupervisionTestResultsList';

// MODALES
import SupervisionApproveModal from '@/components/_supervision/SupervisionApproveModal';
import SupervisionRejectModal from '@/components/_supervision/SupervisionRejectModal';

const TestShow = () => {
    const { testRequest } = usePage().props as { testRequest: any };

    const [showApprove, setShowApprove] = useState(false);
    const [showReject, setShowReject] = useState(false);

    return (
        <MainLayout>
            <Head title={`Solicitud #${testRequest.number}`} />

            <PageTitle title={`Solicitud #${testRequest.number}`} />

            <Row className="mt-3">
                <Col>
                    <div className="d-flex justify-content-end gap-2 mb-3">

                        {/* Botón para rechazar */}
                        <Button
                            variant={testRequest.in_committee != 1 ? "soft-danger" : "primary"}
                            disabled={testRequest.in_committee == 1 ? true : false}
                            onClick={() => setShowReject(true)}
                        >
                            <IconifyIcon icon="tabler:x" className="me-1" />
                            Rechazar solicitud
                        </Button>

                        {/* Botón para aprobar */}
                        <Button
                            variant={testRequest.in_committee != 1 ? "soft-success" : "primary"}
                            disabled={testRequest.in_committee == 1 ? true : false}
                            onClick={() => setShowApprove(true)}
                        >
                            <IconifyIcon icon="tabler:check" className="me-1" />
                            Aprobar solicitud
                        </Button>

                        {/* Botón regresar */}
                        <Link href={route('supervision.index')}>
                            <Button variant="soft-secondary">
                                <IconifyIcon icon="tabler:arrow-left" className="me-1" />
                                Regresar
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>

            {/* Tarjeta de información */}
            <SupervisionInfoCard testRequest={testRequest} />

            {/* Barra de progreso */}
            <SupervisionProgress testRequest={testRequest} />

            {/* Listado de resultados de pruebas */}
            <SupervisionTestResultsList testRequest={testRequest} />

            {/* MODAL APROBAR */}
            <SupervisionApproveModal
                show={showApprove}
                onHide={() => setShowApprove(false)}
                testRequest={testRequest}
                testData={{
                    testName: "Aprobación total de la muestra. Sin enviar a comité"
                }}
            />

            {/* MODAL RECHAZAR */}
            <SupervisionRejectModal
                show={showReject}
                onHide={() => setShowReject(false)}
                testRequest={testRequest}
                testData={{
                    testName: "Rechazo total de la muestra. Se enviará a comité"
                }}
            />

        </MainLayout>
    );
};

export default TestShow;
