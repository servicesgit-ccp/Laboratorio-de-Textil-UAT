import React, { useMemo, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "@inertiajs/react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

type Props = {
  initialComment?: string;
  onReject?: (comment: string) => void;
  onApprove?: (comment: string) => void;
  loading?: boolean;
};

export default function CommitteeActions({
  initialComment = "",
  onReject,
  onApprove,
  loading = false,
}: Props) {
  const [comment, setComment] = useState(initialComment);
  const [touched, setTouched] = useState(false);

  const trimmed = useMemo(() => comment.trim(), [comment]);
  const isValid = trimmed.length > 0;
  const showError = touched && !isValid;

  const requireCommentOrMark = () => {
    if (!isValid) {
      setTouched(true);
      return false;
    }
    return true;
  };

  const handleReject = () => {
    if (!requireCommentOrMark()) return;
    onReject?.(trimmed);
  };

  const handleApprove = () => {
    if (!requireCommentOrMark()) return;
    onApprove?.(trimmed);
  };

  return (
    <div className="d-flex flex-column gap-3">
      {/* Caja de comentarios */}
      <Card className="border rounded-4">
        <Card.Body className="p-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <IconifyIcon icon="tabler:message" className="fs-18" />
            <div className="fw-semibold">Comentarios del Comité</div>
          </div>

          <div className="text-muted" style={{ fontSize: 13 }}>
            Agrega observaciones o comentarios adicionales sobre esta muestra que serán incluidos en la decisión final.
            <span className="ms-1 text-danger fw-semibold">*</span>
          </div>

          <Form.Group className="mt-3">
            <Form.Control
              as="textarea"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Escribe comentarios sobre la muestra, observaciones especiales, recomendaciones, etc..."
              isInvalid={showError}
              style={{
                background: "#f5f6f7",
                border: "1px solid #eef0f2",
                resize: "none",
              }}
            />
            {showError && (
              <div className="invalid-feedback d-block">
                El comentario es obligatorio para aprobar o rechazar.
              </div>
            )}
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Barra de acciones */}
      <div className="d-flex justify-content-end gap-2 flex-wrap">
        <Link href={route("committee.index")} className="text-decoration-none">
          <Button variant="outline-secondary" className="rounded-pill px-4" disabled={loading}>
            Cancelar
          </Button>
        </Link>

        <Button
          variant="outline-danger"
          className="rounded-pill px-4"
          disabled={loading || !isValid}
          onClick={handleReject}
          title={!isValid ? "Agrega un comentario para continuar" : undefined}
        >
          <IconifyIcon icon="tabler:x" className="me-2" />
          Rechazar
        </Button>

        <Button
          variant="success"
          className="rounded-pill px-4"
          disabled={loading || !isValid}
          onClick={handleApprove}
          title={!isValid ? "Agrega un comentario para continuar" : undefined}
        >
          <IconifyIcon icon="tabler:check" className="me-2" />
          Aprobar
        </Button>
      </div>
    </div>
  );
}
