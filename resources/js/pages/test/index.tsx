import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Button, Card, CardFooter, CardHeader, Col, Row, Badge } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';

const TestRequestIndex = () => {
    const { test_requests, stats, filters } = usePage().props as {
        test_requests?: any;
        filters?: { q?: string; per_page?: number; status?: number };
    };


    const [searchTerm, setSearchTerm] = useState(filters?.q ?? '');
    const [statusFilter, setStatusFilter] = useState(filters?.status ?? 4);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.get(
                route('test.request.index'),
                { ...filters, q: searchTerm, status: statusFilter, page: 1 },
                { preserveState: true, preserveScroll: true }
            );
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = Number(e.target.value);
        setStatusFilter(newStatus);
        router.get(
            route('test.request.index'),
            { ...filters, status: newStatus, q: searchTerm, page: 1 },
            { preserveState: true, preserveScroll: true }
        );
    };

    // Función para asignar color y texto al estado
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
        <MainLayout>
            <PageTitle
                title="Solicitudes de Análisis"
                subTitle="Solicitudes de Pruebas Textiles"
            />

            <Row className="mb-4">
                <Col md={3}>
                    <Card className="shadow-sm p-3">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted">Total Solicitudes</h6>
                                <h3>{stats.total}</h3>
                                <p className="text-success mt-2">
                                    <IconifyIcon icon="tabler:trending-up" /> {stats.total_variation}% desde el mes pasado
                                </p>
                            </div>
                            <div className="bg-primary-subtle p-3 rounded">
                                <IconifyIcon icon="tabler:clipboard" className="fs-2 text-primary" />
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="shadow-sm p-3">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted">Pendientes</h6>
                                <h3>{stats.pending}</h3>
                                <p className="text-danger mt-2">
                                    <IconifyIcon icon="tabler:trending-down" /> {stats.pending_variation}% desde la semana pasada
                                </p>
                            </div>
                            <div className="bg-warning-subtle p-3 rounded">
                                <IconifyIcon icon="tabler:box" className="fs-2 text-warning" />
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="shadow-sm p-3">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted">Enviadas</h6>
                                <h3>{stats.send}</h3>
                                <p className="text-success mt-2">
                                    <IconifyIcon icon="tabler:trending-up" /> {stats.send_variation}% desde el mes pasado
                                </p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded">
                                <IconifyIcon icon="tabler:send" className="fs-2 text-purple" />
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="shadow-sm p-3">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted">Finalizadas</h6>
                                <h3>{stats.finished}</h3>
                                <p className="text-success mt-2">
                                    <IconifyIcon icon="tabler:trending-up" /> {stats.finished_variation}% desde el mes pasado
                                </p>
                            </div>
                            <div className="bg-success-subtle p-3 rounded">
                                <IconifyIcon icon="tabler:users-group" className="fs-2 text-success" />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <div className="d-flex align-items-center gap-2">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Buscar solicitud"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearch}
                                    style={{ width: 220 }}
                                />

                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={handleStatusChange}
                                    style={{ width: 180 }}
                                >
                                    <option>Elige una opción</option>
                                    <option value={0}>Creado</option>
                                    <option value={1}>Completado</option>
                                    <option value={2}>En proceso</option>
                                    <option value={3}>Cancelado</option>
                                    <option value={4}>Todos</option>
                                </select>
                            </div>

                            <div>
                                <Link href={route('test.request.create')}>
                                    <Button variant="success" className="bg-gradient">
                                        <IconifyIcon icon="tabler:plus" className="me-1" /> Nueva solicitud
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>

                        {/* Tabla principal */}
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
                                    test_requests.data.map((item: any, idx: number) => {
                                        return (
                                            <tr key={item.id ?? idx}>
                                                <td>{item.number}</td>
                                                <td>
                                                    {item.test[0]?.started_at
                                                        ? new Date(item.test[0].started_at).toLocaleString()
                                                        : 'Sin fecha'}
                                                </td>

                                                <td>
                                                    {item.test[0]?.finished_at
                                                        ? new Date(item.test[0].finished_at).toLocaleString()
                                                        : 'Sin fecha'}
                                                </td>
                                                {item.style?.number.length > 0 ? <td>{item.style?.number}</td> : <td>{item.item}</td>}
                                                <td>{item.style?.description ?? 'S/N'}</td>
                                                <td>{item.style?.provider.name ?? 'S/N'}</td>
                                                <td>{Object.keys(item.test[0].results[0].content).length}</td>
                                                <td>{getStatusBadge(item.status)}</td>
                                                <td className="pe-3 text-center">
                                                    <div className="hstack gap-1 justify-content-center">
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
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center text-muted py-4">
                                            No hay solicitudes registradas
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer con paginación */}
                        <CardFooter>
                            <div className="d-flex align-items-center justify-content-between gap-3">
                                <div className="d-flex align-items-center gap-2">
                                    <span>Filas:</span>
                                    <select
                                        value={filters?.per_page ?? 10}
                                        onChange={(e) =>
                                            router.get(
                                                route('test.request.index'),
                                                {
                                                    ...filters,
                                                    per_page: e.target.value,
                                                    status: statusFilter,
                                                    q: searchTerm,
                                                    page: 1,
                                                },
                                                { preserveState: true, preserveScroll: true }
                                            )
                                        }
                                        className="form-select form-select-sm"
                                        style={{ width: 80 }}
                                    >
                                        {[10, 15, 25, 50].map((n) => (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <ul className="pagination mb-0">
                                    {test_requests?.links?.map((link: any, i: number) => {
                                        let label = link.label;
                                        if (label.includes('Previous')) label = '&laquo;';
                                        if (label.includes('Next')) label = '&raquo;';

                                        return (
                                            <li
                                                key={i}
                                                className={[
                                                    'page-item',
                                                    link.active ? 'active' : '',
                                                    !link.url ? 'disabled' : '',
                                                ].join(' ')}
                                            >
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className="page-link"
                                                        preserveState
                                                        preserveScroll
                                                        dangerouslySetInnerHTML={{ __html: label }}
                                                    />
                                                ) : (
                                                    <span
                                                        className="page-link"
                                                        dangerouslySetInnerHTML={{ __html: label }}
                                                    />
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </MainLayout>
    );
};

export default TestRequestIndex;
