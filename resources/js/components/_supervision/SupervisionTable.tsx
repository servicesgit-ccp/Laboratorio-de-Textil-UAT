import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import {
    Badge,
    Button,
    Collapse,
    Modal,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

type Props = {
    test_requests: any;
    test_results: any;
};

const TestRequestsTable: React.FC<Props> = ({ test_requests }) => {
    const [openRowId, setOpenRowId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

    const toggleRow = (rowId: number) => {
        setOpenRowId((prev) => (prev === rowId ? null : rowId));
    };

    const handleOpenModal = (item: any) => {
        setSelectedRequest(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRequest(null);
    };

    const handleSendRequest = () => {
        if (!selectedRequest) return;

        router.post(
            route('supervision.send', selectedRequest.id),
            {},
            {
                onFinish: () => setShowModal(false),
                preserveScroll: true,
            }
        );
    };

    const getStatusBadge = (status: number | string) => {
        const s = Number(status);
        switch (s) {
            case 0:
                return <Badge bg="primary">Creado</Badge>;
            case 1:
                return <Badge bg="secondary">En Progreso</Badge>;
            case 2:
                return <Badge bg="warning">Revisión pendiente</Badge>;
            case 3:
                return <Badge bg="info">Revisión completada</Badge>;
            case 4:
                return <Badge bg="success">Aprobado</Badge>;
            case 5:
                return <Badge bg="danger">Rechazado</Badge>;
            default:
                return (
                    <Badge bg="light" text="dark">
                        Desconocido
                    </Badge>
                );
        }
    };

    const getCommitteeBadge = (in_committee: number | string) => {
        const ic = Number(in_committee);
        switch (ic) {
            case 0:
                return <Badge bg="danger">No enviado</Badge>;
            case 1:
                return <Badge bg="success">Enviado</Badge>;
            default:
                return (
                    <Badge bg="light" text="dark">
                        Desconocido
                    </Badge>
                );
        }
    };

    const renderTooltip = (id: string, text: string) => (
        <Tooltip id={id}>{text}</Tooltip>
    );

    // Para el modal: obtener contentKeys del selectedRequest
    const modalContentKeys = (() => {
        if (!selectedRequest?.test?.[0]?.results?.[0]?.content) return [];
        return Object.keys(selectedRequest.test[0].results[0].content);
    })();

    return (
        <>
            <div className="table-responsive mt-3">
                <table className="table table-nowrap mb-0">
                    <thead className="bg-light-subtle">
                    <tr>
                        <th>Folio</th>
                        <th>Fecha Ingreso</th>
                        <th>Fecha Salida</th>
                        <th>SKU</th>
                        <th>Descripción</th>
                        <th>Proveedor</th>
                        <th>Pruebas Completadas</th>
                        <th>Status</th>
                        <th>Comité</th>
                        <th className="text-center" style={{ width: 160 }}>
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {test_requests?.data?.length ? (
                        test_requests.data.map((item: any, idx: number) => {
                            const rowId = item.id ?? idx;
                            const content = item.test?.[0]?.results?.[0]?.content ?? null;
                            const contentKeys = content ? Object.keys(content) : [];

                            return (
                                <React.Fragment key={rowId}>
                                    <tr>
                                        <td>{item.number}</td>

                                        <td>
                                            {item.created_at
                                                ? new Date(
                                                    item.created_at
                                                ).toLocaleString()
                                                : 'Sin fecha'}
                                        </td>

                                        <td>
                                            {item.test?.[0]?.finished_at
                                                ? new Date(
                                                    item.test[0].finished_at
                                                ).toLocaleString()
                                                : 'Sin fecha'}
                                        </td>

                                        {item.style?.number?.length > 0 ? (
                                            <td>{item.style.number}</td>
                                        ) : (
                                            <td>{item.item}</td>
                                        )}

                                        <td>{item.style?.description ?? 'S/N'}</td>
                                        <td>{item.style?.provider?.name ?? 'S/N'}</td>

                                        <td>{item.completed_tests}/{item.total_tests}</td>
                                        <td>{getStatusBadge(item.status)}</td>
                                        <td>{getCommitteeBadge(item.in_committee)}</td>

                                        <td className="pe-3 text-center">
                                            <div className="hstack gap-1 justify-content-center">
                                                {(item.status == 3 || item.status == 4 || item.status == 5 ) && (
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={renderTooltip(
                                                            `tooltip-send-${rowId}`,
                                                            'Enviar solicitud a comité'
                                                        )}
                                                    >
                                                        <Button
                                                            variant={item.in_committee == 0 ? "soft-success" : "primary"}
                                                            size="sm"
                                                            disabled={item.in_committee == 1}
                                                            className="btn-icon rounded-circle"
                                                            onClick={() => handleOpenModal(item)}
                                                        >
                                                            <IconifyIcon
                                                                icon="tabler:send"
                                                                className="fs-16"
                                                            />
                                                        </Button>
                                                    </OverlayTrigger>
                                                )}

                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={renderTooltip(
                                                        `tooltip-view-${rowId}`,
                                                        'Ver detalle'
                                                    )}
                                                >
                                                    <Link href={route('supervision.show', item.id)}>
                                                        <Button
                                                            variant="soft-secondary"
                                                            size="sm"
                                                            className="btn-icon rounded-circle"
                                                        >
                                                            <IconifyIcon
                                                                icon="tabler:eye"
                                                                className="fs-16"
                                                            />
                                                        </Button>
                                                    </Link>
                                                </OverlayTrigger>

                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={9} className="bg-light-subtle p-0">
                                            <Collapse in={openRowId === rowId}>
                                                <div className="p-2">
                                                    {contentKeys.length > 0 ? (
                                                        <table className="table table-sm mb-0 mt-2">
                                                            <thead>
                                                            <tr>
                                                                <th>Pruebas solicitadas</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {contentKeys.map((key) => (
                                                                <tr key={key}>
                                                                    <td>{key}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <span className="text-muted">
                                                            Sin pruebas registradas
                                                        </span>
                                                    )}
                                                </div>
                                            </Collapse>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center text-muted py-4">
                                No hay solicitudes registradas
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

            </div>

            {/* MODAL RESUMEN */}
            {selectedRequest && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Enviar a Comité de Análisis
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-2">
                            ¿Está seguro que desea enviar la muestra <strong> #{selectedRequest.number} </strong> al Comité de Análisis? Esta acción moverá la muestra al módulo de Comité para su evaluación final.
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="soft-danger"
                            onClick={handleCloseModal}
                        >
                            <IconifyIcon
                                icon="tabler:x"
                                className="me-1"
                            />
                            Cerrar
                        </Button>
                        <Button
                            variant="soft-success"
                            onClick={handleSendRequest}
                        >
                            <IconifyIcon
                                icon="tabler:send"
                                className="me-1"
                            />
                            Enviar a comité
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default TestRequestsTable;
