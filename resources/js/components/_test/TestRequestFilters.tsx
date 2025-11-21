// components/test/TestRequestFilters.tsx
import { Button, CardHeader } from "react-bootstrap";
import { Link, router } from "@inertiajs/react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

const TestRequestFilters = ({
                                searchTerm,
                                setSearchTerm,
                                statusFilter,
                                setStatusFilter,
                                filters,
                            }) => {
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            router.get(
                route("test.request.index"),
                { ...filters, q: searchTerm, status: statusFilter, page: 1 },
                { preserveState: true, preserveScroll: true }
            );
        }
    };

    const handleStatusChange = (e) => {
        const val = Number(e.target.value);
        setStatusFilter(val);
        router.get(
            route("test.request.index"),
            { ...filters, status: val, q: searchTerm, page: 1 },
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
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
                    <option value={4}>Todos</option>
                    <option value={0}>Creado</option>
                    <option value={1}>Completado</option>
                    <option value={2}>En proceso</option>
                    <option value={3}>Cancelado</option>
                </select>
            </div>

            <Link href={route("test.request.create")}>
                <Button variant="success" className="bg-gradient">
                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nueva solicitud
                </Button>
            </Link>
        </CardHeader>
    );
};

export default TestRequestFilters;
