// react
import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
// bootstrap
import { Button, Card, CardFooter, CardHeader, Col, Row, Tooltip } from 'react-bootstrap';
// components
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import CommitteeSummary from '@/components/_committee/CommitteeSummary';
import ConfirmModal from '@/components/_general/ConfirmModal';
import CommitteeTable from "@/components/_committee/CommitteeTable";

const formatDate = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const CommitteePage = () => {
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

  const { testResults, filters, stats } = usePage().props as unknown as {
    testResults: Paginated<TestResult>;
    filters?: {
      q?: string;
      per_page?: number | string;
    };
    stats: {
      total: number;
      pending_review: number;
      approved: number;
      rejected: number;
    };
  };

  const [search, setSearch] = useState(filters?.q ?? '');
  const perPage = Number(filters?.per_page ?? 10);
  const [confirmModal, setConfirmModal] = useState<{ show: boolean; testId: number | null }>({
    show: false,
    testId: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const rows: Row[] = (testResults.data ?? []).map((item: any) => {
    const analystSet = new Set<string>();
    let totalSectionsWithStatus = 0;
    let pendingSections = 0;

    const tests = item.test ?? [];
    tests.forEach((t: any) => {
      (t.results ?? []).forEach((r: any) => {
        const content = r.content ?? {};

        Object.values(content).forEach((section: any) => {
          if (!section || typeof section !== "object") return;

          if (section.user_name) analystSet.add(section.user_name);

          if ("status" in section) {
            totalSectionsWithStatus++;
            const statusValue = Number(section.status);
            if (statusValue === 0 || statusValue === 1) pendingSections++;
          }
        });
      });
    });

  return {
    id: item.id,
    number: item.number ?? "",
    item: item.item ?? "DESCONOCIDO",
    notes: item.notes ?? null,
    new_image: item.new_image ?? null,
    image: item.image ?? null,
    style: item.style
      ? { id: Number(item.style.id), description: item.style.description ?? "" }
      : null,
    provider: item.style?.provider.name ?? null,
    votes: item.votes ?? '--',
    fechaIngreso: formatDate(item.created_at),
  };
});

  const handleSearch = () => {
    router.get(
      route('committee.index'),
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
      route('committee.index'),
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

  const handleSendToReview = () => {
    if (!confirmModal.testId) return;
    setSubmitting(true);
    router.put(
      route('test-results.review', { id: confirmModal.testId }),
      {},
      {
        preserveScroll: true,
        onFinish: () => {
          setSubmitting(false);
          setConfirmModal({ show: false, testId: null });
        },
      },
    );
  };

  return (
    <MainLayout>
      <PageTitle
        title="Comité de Análisis"
        subTitle="Comité"
      />
      <div className="mt-3">
        <p className="mb-0 text-muted">
          Gestiona casos especiales que requieren revisión del comité técnico
        </p>
        <br />
        <CommitteeSummary stats={stats} />
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
                      className="form-control border-0 bg-transparent"
                      placeholder="Buscar Muestra (folio, sku, estilo, cliente)"
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
            <CommitteeTable rows={rows}/>
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
      <ConfirmModal
        show={confirmModal.show}
        title="Enviar a revisión"
        body="Se enviará la solicitud a revisión. ¿Deseas continuar?"
        confirmText="Enviar a revisión"
        confirmVariant="success"
        cancelText="Cancelar"
        loading={submitting}
        onConfirm={handleSendToReview}
        onClose={() => {
          if (!submitting) {
            setConfirmModal({ show: false, testId: null });
          }
        }}
      />
    </MainLayout>
  );
};

export default CommitteePage;
