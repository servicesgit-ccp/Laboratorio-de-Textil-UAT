// components
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { Link, router } from "@inertiajs/react";
import { Button, CardFooter } from "react-bootstrap";

export type Row = {
  id: number;
  number: string;
  item: string;
  new_image?: string | null;
  image?: string | null;
  style?: {
    id: number;
    description: string;
  } | null;
  analyst?: string | '--';
  supervisor?: string | '--';
  provider?: string | null;
  votes?: string | '--';
  fechaIngreso: string;
  status: number;
};

export default function CommitteeTable({rows}: { rows: Row[] }) 
{
  console.log(rows);
  return (
    <>
      <div className="table-responsive mt-3">
        <table className="table table-nowrap mb-0">
          <thead className="bg-light-subtle">
            <tr>
              <th>Folio</th>
              <th>Estilo</th>
              <th>Analista</th>
              <th>Supervisor</th>
              <th>Estado</th>
              <th>Proveedor</th>
              <th>Fecha Ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((req) => (
              
              <tr key={req.id}>
                <td>{req.number}</td>
                <td>
                {(req.new_image || req.image) ? (
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <div className="avatar-md">
                            <img
                                src={req.new_image || req.image}
                                alt=" "
                                className="img-fluid rounded-2"
                            />
                        </div>
                        {req.item}
                    </div>
                    ) : (
                        req.item
                    )}
                    {req.style?.description && (
                        <p className="mb-0">
                            <span className="text-muted">{(req.style?.id !== 1 && req.style?.description) ?? req.notes}</span>
                        </p>
                    )}
                </td>
                <td>{req.analyst}</td>
                <td>{req.supervisor}</td>
                <td>
                  {req.status === 5 && (
                    <span className="badge rounded-pill bg-warning-subtle text-warning-emphasis border d-inline-flex align-items-center gap-1">
                      <IconifyIcon icon="tabler:clock" className="fs-6" />
                      Pendiente Revisión
                    </span>
                  )}

                  {req.status === 7 && (
                    <span className="badge rounded-pill bg-success-subtle text-success-emphasis border d-inline-flex align-items-center gap-1">
                      <IconifyIcon icon="tabler:circle-check" className="fs-6" />
                      Aprobada
                    </span>
                  )}

                  {req.status === 8 && (
                    <span className="badge rounded-pill bg-danger-subtle text-danger-emphasis border d-inline-flex align-items-center gap-1">
                      <IconifyIcon icon="tabler:circle-x" className="fs-6" />
                      Rechazada
                    </span>
                  )}
                  {req.status === 9 && (
                    <span className="badge rounded-pill bg-danger-subtle text-danger-emphasis border d-inline-flex align-items-center gap-1">
                      <IconifyIcon icon="tabler:arrow-back-up" className="fs-6" />
                      Reingreso
                    </span>
                  )}
                </td>

                <td>{req.provider}</td>
                <td>{req.fechaIngreso}</td>
                <td>
                  <Link href={route("committee.detail", { committee: req.id })}>
                    <Button
                      variant="soft-primary"
                      size="sm"
                      className="btn-icon rounded-circle me-2"
                    >
                      <IconifyIcon icon="tabler:eye" className="fs-16" />
                    </Button>
                  </Link>
                  {req.status === 8 && (
                    <Button
                      variant="soft-danger"
                      size="sm"
                      className="btn-icon rounded-circle"
                      title="Enviar a reingreso"
                      onClick={() =>
                        router.post(route("committee.re-entry", { committee: req.id }))
                      }
                    >
                      <IconifyIcon icon="tabler:arrow-back-up" className="fs-16" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>        
    </>
  );
}
