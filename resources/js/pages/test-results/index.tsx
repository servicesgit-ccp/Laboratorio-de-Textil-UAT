// react
import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
// bootstrap
import { Button, Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';
// components
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import TestResultsSummary from '@/components/_test-results/TestResultsSummary';

const formatDate = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const TestResultsPage = () => {
  type TestResult = {
    id: number;
    created_at: string;
    finished_at: string | null;
    test_request: {
      number: string;
      style_id: string | number;
    };
  };

  type Paginated<T> = {
    data: T[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };

  const { testResults, filters } = usePage().props as {
    testResults: Paginated<TestResult>;
    filters?: {
      q?: string;
      per_page?: number | string;
    };
  };

  const [search, setSearch] = useState(filters?.q ?? '');
  const perPage = Number(filters?.per_page ?? 10);

  // Si viene paginado, los registros están en testResults.data
  const rows = (testResults.data ?? []).map((item) => ({
    id: item.id,
    folio: item.test_request?.number ?? '',
    fechaIngreso: formatDate(item.created_at),
    fechaSalida: formatDate(item.finished_at),
    descripcion: item.test_request?.style_id ?? '',
    sku: '',
    analista: '',
    pruebasPendientes: '',
  }));
  
  const statsMock = {
    inAnalysis: 3,
    pending: 26,
    inProcess: 2,
    completed: 3,
  };

  const handleSearch = () => {
    router.get(
      route('test-results'),
      {
        q: search,
        per_page: perPage,
        page: 1,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handlePerPageChange = (value: string) => {
    router.get(
      route('test-results'),
      {
        q: search,
        per_page: value,
        page: 1,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  return (
    <MainLayout>
      <PageTitle
        title="Análisis de Muestras"
        subTitle="Análisis"
      />
      <div className="mt-3">
        <p className="mb-0 text-muted">
          Gestiona y registra los resultados de las pruebas de laboratorio.
        </p>
        <br />
        <TestResultsSummary stats={statsMock} />
      </div>
      <Row className="mt-4">
        <Col xs={12}>
          <Card className="border-0 shadow-sm rounded-4">
            {/* BUSCADOR */}
            <CardHeader className="border-0 pb-0">
              <div className="d-flex align-items-center justify-content-between">
                {/* Input grande con ícono */}
                <div className="flex-grow-1 me-3">
                  <div className="d-flex align-items-center bg-body-tertiary rounded-4 px-3 py-2">
                    <IconifyIcon icon="tabler:search" className="me-2 text-muted fs-5" />
                    <input
                      type="search"
                      className="form-control border-0 bg-transparent shadow-none"
                      placeholder="Buscar Muestra (folio)"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch();
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Botón Buscar */}
                <Button
                  type="button"
                  variant="dark"
                  className="px-4 d-flex align-items-center rounded-4"
                  onClick={handleSearch}
                >
                  <IconifyIcon icon="tabler:search" className="me-2" />
                  Buscar
                </Button>
              </div>
            </CardHeader>

            {/* TABLA */}
            <div className="table-responsive mt-3">
              <table className="table table-nowrap mb-0">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Folio</th>
                    <th>Fecha Ingreso</th>
                    <th>Fecha Salida</th>
                    <th>SKU/ ESTILO</th>
                    <th>Descripción</th>
                    <th>Analista</th>
                    <th>Pruebas Pendientes</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((req) => (
                    <tr key={req.id}>
                      <td>{req.folio}</td>
                      <td>{req.fechaIngreso}</td>
                      <td>{req.fechaSalida}</td>
                      <td>
                        <span className="badge bg-light text-muted border rounded-pill">
                          {req.sku}
                        </span>
                      </td>
                      <td>{req.descripcion}</td>
                      <td>{req.analista}</td>
                      <td>{req.pruebasPendientes}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-link p-0 d-inline-flex align-items-center gap-1 text-decoration-none"
                          onClick={() => router.get(route('test-results.detail', { test: req.id }))}
                        >
                          <IconifyIcon icon="tabler:eye" className="fs-5" />
                          <span>Ver Análisis</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CardFooter>
              <div className="d-flex align-items-center justify-content-between gap-3">
                {/* Selector de filas */}
                <div className="d-flex align-items-center gap-2">
                  <span>Filas:</span>
                  <select
                    value={perPage}
                    onChange={(e) => handlePerPageChange(e.target.value)}
                    className="form-select form-select-sm"
                    style={{ width: 80 }}
                  >
                    {[10, 15, 25, 50].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Paginación */}
                <ul className="pagination mb-0">
                  {testResults.links.map((link, i) => {
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

export default TestResultsPage;
