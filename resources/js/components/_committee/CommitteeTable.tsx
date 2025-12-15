// components
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { Link } from "@inertiajs/react";
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
  provider?: string | null;
  votes?: string | '--';
  fechaIngreso: string;
};

export default function CommitteeTable({rows}: { rows: Row[] }) 
{
  return (
    <>
      <div className="table-responsive mt-3">
        <table className="table table-nowrap mb-0">
          <thead className="bg-light-subtle">
            <tr>
              <th>Folio</th>
              <th>Estilo</th>
              <th>Cliente</th>
              <th>Votos</th>
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
                <td>{req.provider}</td>
                <td>{req.votes}</td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>        
    </>
  );
}
