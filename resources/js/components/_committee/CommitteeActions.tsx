import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "@inertiajs/react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

type Props = {
  initialComment?: string;
  onSendComment?: (comment: string) => void;
  onReject?: (comment: string) => void;
  onApprove?: (comment: string) => void;

  // opcional: para deshabilitar botones si estás cargando
  loading?: boolean;
};

export default function CommitteeActions({
  initialComment = "",
  onSendComment,
  onReject,
  onApprove,
  loading = false,
}: Props) {
  const [comment, setComment] = useState(initialComment);

  const handleSend = () => onSendComment?.(comment.trim());
  const handleReject = () => onReject?.(comment.trim());
  const handleApprove = () => onApprove?.(comment.trim());

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
          </div>

          <Form.Group className="mt-3">
            <Form.Control
              as="textarea"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe comentarios adicionales sobre la muestra, observaciones especiales, recomendaciones, etc..."
              style={{
                background: "#f5f6f7",
                border: "1px solid #eef0f2",
                resize: "none",
              }}
            />
          </Form.Group>

          <div className="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-2">
            <Button
              type="button"
              disabled={loading || !comment.trim()}
              onClick={handleSend}
              className="rounded-pill px-3"
              style={{
                background: "#8aa4ff",
                borderColor: "#8aa4ff",
              }}
            >
              <IconifyIcon icon="tabler:send" className="me-2" />
              Enviar Comentario
            </Button>
          </div>
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
          disabled={loading}
          onClick={handleReject}
        >
          <IconifyIcon icon="tabler:x" className="me-2" />
          Rechazar
        </Button>

        <Button
          variant="success"
          className="rounded-pill px-4"
          disabled={loading}
          onClick={handleApprove}
        >
          <IconifyIcon icon="tabler:check" className="me-2" />
          Aprobar
        </Button>
      </div>
    </div>
  );
}
