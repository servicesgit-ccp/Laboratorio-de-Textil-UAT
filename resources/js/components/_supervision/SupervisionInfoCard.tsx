import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

const statusLabels: Record<number, { label: string; variant: string }> = {
    0: { label: "Creado", variant: "primary" },
    1: { label: "En progreso", variant: "secondary" },
    2: { label: "Revisión pendiente", variant: "warning" },
    3: { label: "Revisión completada", variant: "info" },
    4: { label: "Aprobada", variant: "success" },
    5: { label: "Rechazada", variant: "danger" },
};

interface Props {
    testRequest: any;
}

const SupervisionInfoCard: React.FC<Props> = ({ testRequest }) => {
    const status = Number(testRequest.status);

    return (
        <Card className="shadow-sm rounded-4 p-4">
            <h2 className="text-2xl fw-bold mb-1">Información general</h2>
            <Row className="align-items-center mb-3">
                <Col>
                    <h4 className="fw-bold mb-1">Folio #{testRequest.number}</h4>
                    <Badge bg={statusLabels[status]?.variant}>
                        <IconifyIcon icon="tabler:circle-check" className="me-1" />
                        {statusLabels[status]?.label}
                    </Badge>
                </Col>
            </Row>

            <h5 className="text-muted mb-4">{testRequest.style?.description ?? "S/D"}</h5>

            <Row className="gy-4">
                <Col md={4}>
                    <div className="d-flex">
                        <div className="me-3 bg-primary bg-opacity-10 p-3 rounded-3">
                            <IconifyIcon icon="tabler:cube" className="fs-24 text-primary" />
                        </div>
                        <div>
                            <small className="text-muted">Estilo</small>
                            <div className="fw-semibold">{testRequest.style?.description}</div>
                        </div>
                    </div>
                </Col>

                <Col md={4}>
                    <div className="d-flex">
                        <div className="me-3 bg-info bg-opacity-10 p-3 rounded-3">
                            <IconifyIcon icon="tabler:file-description" className="fs-24 text-purple" />
                        </div>
                        <div>
                            <small className="text-muted">SKU</small>
                            <div className="fw-semibold">
                                {testRequest.style?.number ?? "S/D"}
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={4}>
                    <div className="d-flex">
                        <div className="me-3 bg-success bg-opacity-10 p-3 rounded-3">
                            <IconifyIcon icon="tabler:user" className="fs-24 text-success" />
                        </div>
                        <div>
                            <small className="text-muted">Analista</small>
                            <div className="fw-semibold">
                                {testRequest.test?.[0]?.results?.[0]?.user_name ?? "S/D"}
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={4}>
                    <div className="d-flex">
                        <div className="me-3 bg-warning bg-opacity-10 p-3 rounded-3">
                            <IconifyIcon icon="tabler:calendar" className="fs-24 text-warning" />
                        </div>
                        <div>
                            <small className="text-muted">Fecha de ingreso</small>
                            <div className="fw-semibold">
                                {new Date(testRequest.created_at).toLocaleDateString("es-MX")}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="d-flex">
                        <div className="me-3 bg-secondary bg-opacity-10 p-3 rounded-3">
                            <IconifyIcon icon="tabler:notes" className="fs-24 text-secondary" />
                        </div>
                        <div>
                            <small className="text-muted">Notas adicionales</small>
                            <div className="fw-semibold">
                                {testRequest.notes ?? 'Sin notas'}
                            </div>
                        </div>
                    </div>
                </Col>
                {testRequest.cancelation_notes != null ?
                    <Col md={4}>
                        <div className="d-flex">
                            <div className="me-3 bg-danger bg-opacity-10 p-3 rounded-3">
                                <IconifyIcon icon="tabler:circle-x" className="fs-24 text-warning" />
                            </div>
                            <div>
                                <small className="text-muted">Motivo de Rechazo</small>
                                <div className="fw-semibold">
                                    {testRequest.cancelation_notes}
                                </div>
                            </div>
                        </div>
                    </Col>
                    :
                    ''
                }
            </Row>
        </Card>
    );
};

export default SupervisionInfoCard;
