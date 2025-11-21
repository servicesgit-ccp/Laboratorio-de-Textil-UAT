<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Badge, Button } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

type Props = {
    test_requests: any;
    test_results: any;
};

const TestRequestsTable: React.FC<Props> = ({ test_requests, test_results }) => {
    const [openRowId, setOpenRowId] = useState<number | null>(null);

    const toggleRow = (rowId: number) => {
        setOpenRowId((prev) => (prev === rowId ? null : rowId));
    };

    const getStatusBadge = (status: number | string) => {
        const s = Number(status);
        switch (s) {
            case 0:
                return <Badge bg="secondary">Creado</Badge>;
            case 1:
                return <Badge bg="success">Completado</Badge>;
            case 2:
                return <Badge bg="warning" text="dark">En proceso</Badge>;
            case 3:
                return <Badge bg="danger">Cancelado</Badge>;
            default:
                return <Badge bg="light" text="dark">Desconocido</Badge>;
        }
    };

    return (
        <table className="table table-nowrap mb-0 align-middle">
            <thead className="bg-light-subtle">
=======
// components/test/TestRequestTable.tsx
import { Button, Badge } from "react-bootstrap";
import { Link } from "@inertiajs/react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

const getStatusBadge = (status: number) => {
    switch (Number(status)) {
        case 0: return <Badge bg="secondary">Creado</Badge>;
        case 1: return <Badge bg="success">Completado</Badge>;
        case 2: return <Badge bg="warning" text="dark">En proceso</Badge>;
        case 3: return <Badge bg="danger">Cancelado</Badge>;
        default: return <Badge bg="light" text="dark">Desconocido</Badge>;
    }
};

const TestRequestTable = ({ test_requests }) => {
    return (
        <div className="table-responsive">
            <table className="table table-nowrap mb-0 align-middle">
                <thead className="bg-light-subtle">
>>>>>>> 96750299f7cd29a45861250f0b8e7869d0256e65
                <tr>
                    <th>Folio</th>
                    <th>Fecha Ingreso</th>
                    <th>Fecha Salida</th>
                    <th>SKU</th>
                    <th>Descripción</th>
                    <th>Proveedor</th>
                    <th>Pruebas</th>
                    <th>Status</th>
                    <th className="text-center" style={{ width: 120 }}>Acción</th>
                </tr>
<<<<<<< HEAD
            </thead>
            <tbody>
                {test_requests?.data?.length ? (
                    test_requests.data.map((item: any, idx: number) => {
                        const rowId = item.id ?? idx;

                        // Aquí tomamos el resultado correspondiente a esta fila
                        const resultRow = test_results?.data?.[idx];
                        const content =
                            resultRow?.test?.[0]?.results?.[0]?.content ?? null;
                        const contentKeys = content ? Object.keys(content) : [];

                        return (
                            <React.Fragment key={rowId}>
                                <tr>
                                    <td>{item.number}</td>

                                    <td>
                                        {item.test?.[0]?.started_at
                                            ? new Date(item.test[0].started_at).toLocaleString()
                                            : 'Sin fecha'}
                                    </td>

                                    <td>
                                        {item.test?.[0]?.finished_at
                                            ? new Date(item.test[0].finished_at).toLocaleString()
                                            : 'Sin fecha'}
                                    </td>

                                    {item.style?.number?.length > 0 ? (
                                        <td>{item.style.number}</td>
                                    ) : (
                                        <td>{item.item}</td>
                                    )}

                                    <td>{item.style?.description ?? 'S/N'}</td>
                                    <td>{item.style?.provider?.name ?? 'S/N'}</td>

                                    {/* Mantengo tu conteo original con item.test */}
                                    <td>
                                        {item.test?.[0]?.results?.[0]?.content
                                            ? Object.keys(item.test[0].results[0].content).length
                                            : 0}
                                    </td>

                                    <td>{getStatusBadge(item.status)}</td>

                                    <td className="pe-3 text-center">
                                        <div className="hstack gap-1 justify-content-center">
                                            {/* Botón para expandir/colapsar detalles */}
                                            <Button
                                                variant="soft-info"
                                                size="sm"
                                                className="btn-icon rounded-circle"
                                                onClick={() => toggleRow(rowId)}
                                            >
                                                <IconifyIcon
                                                    icon={
                                                        openRowId === rowId
                                                            ? 'tabler:chevron-up'
                                                            : 'tabler:chevron-down'
                                                    }
                                                    className="fs-16"
                                                />
                                            </Button>

                                            <Link href={route('test.request.show', item.id)}>
                                                <Button
                                                    variant="soft-primary"
                                                    size="sm"
                                                    className="btn-icon rounded-circle"
                                                >
                                                    <IconifyIcon icon="tabler:eye" className="fs-16" />
                                                </Button>
                                            </Link>

                                            <Link href={route('test.request.edit', item.id)}>
                                                <Button
                                                    variant="soft-success"
                                                    size="sm"
                                                    className="btn-icon rounded-circle"
                                                >
                                                    <IconifyIcon icon="tabler:edit" className="fs-16" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>

                                {/* Fila expandible: sólo si la row está abierta y hay keys */}
                                {openRowId === rowId && contentKeys.length > 0 && (
                                    <tr>
                                        {/* colSpan = número de columnas de la tabla principal */}
                                        <td colSpan={9} className="bg-light-subtle">
                                            <div className="p-2">
                                                <strong>Pruebas (keys de content)</strong>
                                                <table className="table table-sm mb-0 mt-2">
                                                    <thead>
                                                        <tr>
                                                            <th>Nombre de la prueba</th>
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
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })
=======
                </thead>

                <tbody>
                {test_requests?.data?.length ? (
                    test_requests.data.map((item: any, idx: number) => (
                        <tr key={item.id ?? idx}>
                            <td>{item.number}</td>

                            <td>
                                {item.test[0]?.started_at
                                    ? new Date(item.test[0].started_at).toLocaleString()
                                    : "Sin fecha"}
                            </td>

                            <td>
                                {item.test[0]?.finished_at
                                    ? new Date(item.test[0].finished_at).toLocaleString()
                                    : "Sin fecha"}
                            </td>

                            <td>
                                {item.style?.number?.length > 0 ? item.style.number : item.item}
                            </td>

                            <td>{item.style?.description ?? "S/N"}</td>
                            <td>{item.style?.provider?.name ?? "S/N"}</td>

                            <td>{Object.keys(item.test[0].results[0].content).length}</td>

                            <td>{getStatusBadge(item.status)}</td>

                            <td className="text-center">
                                <div className="hstack gap-1 justify-content-center">
                                    <Link href={route("test.request.show", item.id)}>
                                        <Button variant="soft-primary" size="sm" className="btn-icon rounded-circle">
                                            <IconifyIcon icon="tabler:eye" className="fs-16" />
                                        </Button>
                                    </Link>
                                    <Link href={route("test.request.edit", item.id)}>
                                        <Button variant="soft-success" size="sm" className="btn-icon rounded-circle">
                                            <IconifyIcon icon="tabler:edit" className="fs-16" />
                                        </Button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))
>>>>>>> 96750299f7cd29a45861250f0b8e7869d0256e65
                ) : (
                    <tr>
                        <td colSpan={9} className="text-center text-muted py-4">
                            No hay solicitudes registradas
                        </td>
                    </tr>
                )}
<<<<<<< HEAD
            </tbody>
        </table>
    );
};

export default TestRequestsTable;
=======
                </tbody>
            </table>
        </div>
    );
};

export default TestRequestTable;
>>>>>>> 96750299f7cd29a45861250f0b8e7869d0256e65
