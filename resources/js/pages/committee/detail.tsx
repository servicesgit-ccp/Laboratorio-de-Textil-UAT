import React, { useMemo } from "react";
import { Link, router } from "@inertiajs/react";
import { Badge } from "react-bootstrap";
import MainLayout from "@/layouts/MainLayout";
import SummaryCommitee from "@/components/_committee/SummaryCommitee";
import TableDetail, { SummaryRow } from "@/components/_committee/TableDetail";
import CommitteeActions from "@/components/_committee/CommitteeActions";

type Props = {
  testResult: any; // tipa después si quieres
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  try {
    const d = new Date(value);
    return d.toLocaleDateString("es-MX");
  } catch {
    return "-";
  }
}

export default function Detail({ testResult }: Props) {
  console.log(testResult);
  const folio = testResult?.number ?? "REQ-????-???";
  const status = Number(testResult?.status ?? 0);

  const summaryRows: SummaryRow[] = useMemo(() => {
    const rows: SummaryRow[] = [];
    const tests = testResult?.test ?? [];

    tests.forEach((t: any) => {
      (t.results ?? []).forEach((r: any) => {
        const content = r.content ?? {};
        Object.entries(content).forEach(([sectionName, section]: any) => {
          if (!section || typeof section !== "object") return;

          const statusValue = Number(section.status ?? 0);
          let statusLabel: SummaryRow["statusLabel"] = "Pendiente";
          if (statusValue === 2) statusLabel = section.approved ? "Aprobada" : "Rechazada";

          rows.push({
            name: sectionName,
            statusLabel,
            reviewer: section.reviewed_by ?? "--",
            date: section.finished_at ? formatDate(section.finished_at) : "-", // o lo que tengas
            href: route("test-results.detail", { test: t.id }),
            section, // <--- aquí
          });
        });
      });
    });
    return rows;
  }, [testResult]);

  const statusLabel = useMemo(() => {
    switch (status) {
      case 5:
        return { text: "Pendiente", className: "bg-warning-subtle text-warning-emphasis border" };
      case 7:
        return { text: "Aprobada", className: "bg-info-subtle text-info-emphasis border" };
      case 8:
        return { text: "Rechazada", className: "bg-success-subtle text-success-emphasis border" };
      case 9:
        return { text: "Reingreso", className: "bg-warning-subtle text-success-emphasis border" };
      default:
        return { text: "Pendiente", className: "bg-warning-subtle text-warning-emphasis border" };
    }
  }, [status]);

  const handleReject = (comment: string) => {
  router.post(
    route("committee.reject", { committee: testResult.id }),
    { comment },
    {
      preserveScroll: true,
      onSuccess: () => router.visit(route("committee.index")),
    }
  );
};

const handleApprove = (comment: string) => {
  router.post(
    route("committee.approve", { committee: testResult.id }),
    { comment },
    {
      preserveScroll: true,
      onSuccess: () => router.visit(route("committee.index")),
    }
  );
};

  return (
    <MainLayout>
      <div className="container py-4">
        {/* Volver */}
        <div className="mb-3">
          <Link href={route("committee.index")} className="text-decoration-none">
            ← Volver al listado
          </Link>
        </div>

        {/* Header */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h2 className="m-0 fw-semibold">
              Revisión de Comité - {folio}
            </h2>

            <Badge pill className={statusLabel.className} style={{ fontSize: 12 }}>
              {statusLabel.text}
            </Badge>
          </div>

          <div className="text-muted mt-1">
            Revisa los resultados de las pruebas y toma una decisión
          </div>
        </div>

        {/* Resumen + tabla */}
        <SummaryCommitee testResult={testResult} summaryRows={summaryRows} />  
        <div className="border rounded-3 py-2 text-center fw-semibold">
          Pruebas Realizadas
        </div>

        <TableDetail rows={summaryRows} />

        <CommitteeActions
          initialComment={testResult?.comment_committee ?? ""}
          status={Number(testResult?.status)}
          onReject={handleReject}
          onApprove={handleApprove}
        />
      </div>
    </MainLayout>
    
  );
}
