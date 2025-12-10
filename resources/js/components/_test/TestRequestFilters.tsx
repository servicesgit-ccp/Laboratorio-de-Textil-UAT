// src/components/_test/TestRequestFilters.tsx

import { Link, router } from "@inertiajs/react";
import { CardHeader, Row, Col, Button } from "react-bootstrap";
import CustomFlatpickr from "@/components/CustomFlatpickr";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

const TestRequestFilters = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    filters,
}) => {
    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            router.get(
                route("test.request.index"),
                {
                    ...filters,
                    q: searchTerm,
                    status: statusFilter,
                    date_range: dateRange,
                    page: 1,
                },
                { preserveState: true, preserveScroll: true }
            );
        }
    };

    const handleStatusChange = (e) => {
        const newStatus = Number(e.target.value);
        setStatusFilter(newStatus);

        router.get(
            route("test.request.index"),
            {
                ...filters,
                q: searchTerm,
                status: newStatus,
                date_range: dateRange,
                page: 1,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleDateRangeChange = (_dates, dateStr) => {
        setDateRange(dateStr);
        console.log(dateStr);
        router.get(
            route("test.request.index"),
            {
                ...filters,
                q: searchTerm,
                status: statusFilter,
                date_range: dateStr,
                page: 1,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setStatusFilter(6);
        setDateRange("");

        router.get(
            route("test.request.index"),
            {
                q: "",
                status: 6,
                date_range: "",
                per_page: filters?.per_page ?? 10,
                page: 1,
            },
            { preserveState: false, preserveScroll: true }
        );
    };

    return (
        <CardHeader className="border-bottom border-light">
            <Row className="g-2 align-items-end">
                {/* 🔹 Search */}
                <Col md={2}>
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Buscar solicitud"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                </Col>

                {/* 🔹 Rango de fechas */}
                <Col md={4}>
                    <CustomFlatpickr
                        className="form-control"
                        placeholder="Rango de fechas"
                        options={{
                            mode: "range",
                            enableTime: false,
                            dateFormat: "d/m/Y"
                        }}
                        value={dateRange || undefined}
                        onChange={handleDateRangeChange}
                    />
                </Col>

                {/* 🔹 Status */}
                <Col md={3}>
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={handleStatusChange}
                    >
                        <option value={6}>Todos</option>
                        <option value={1}>En progreso</option>
                        <option value={2}>Revisión pendiente</option>
                        <option value={3}>Revisión completada</option>
                        <option value={4}>Aprobado</option>
                        <option value={5}>Rechazado</option>
                    </select>
                </Col>

                {/* 🔹 Botón limpiar */}
                <Col md={1} className="text-end">
                    <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={handleClearFilters}
                    >
                        <IconifyIcon icon="tabler:filter-off" />
                    </Button>
                </Col>
                <Col md={2} className="text-end">
                    <Link href={route("test.request.create")}>
                <Button variant="success" className="bg-gradient">
                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nueva solicitud
                </Button>
                </Link>
                </Col>



            </Row>
        </CardHeader>
    );
};

export default TestRequestFilters;
