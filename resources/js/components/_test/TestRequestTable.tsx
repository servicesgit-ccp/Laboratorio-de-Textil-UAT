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
    );
};

export default TestRequestTable;
