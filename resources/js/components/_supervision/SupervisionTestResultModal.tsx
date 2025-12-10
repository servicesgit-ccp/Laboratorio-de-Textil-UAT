import React, { useState } from "react";
import { Button, Modal, Tabs, Tab, Form } from "react-bootstrap";
import { router } from "@inertiajs/react";

const SupervisionTestResultModal = ({ show, testResult, onClose }) => {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    if (!testResult) return null;

    const testName = testResult.testName;
    const testData = testResult.testData ?? {};

    const excluded = ["img", "status", "user_id", "user_name", "approved", "REJECTED"];

    const handleApprove = async () => {
        setLoading(true);

        router.post(
            route("supervision.approve"),
            {
                test_id: testResult.test_id,
                test_name: testResult.testName,
            },
            {
                onFinish: () => setLoading(false),
            }
        );

        setLoading(false);
        onClose();
    };

    const handleReject = () => {
        if (comment.trim() === "") {
            alert("El motivo de rechazo es obligatorio");
            return;
        }

        setLoading(true);

        router.post(
            route("supervision.reject"),
            {
                test_id: testResult.test_id,
                test_name: testName,
                observations: comment,
            },
            {
                onFinish: () => setLoading(false),
            }
        );
        setLoading(false);
        onClose();
    };

    const rejectedBlock = testData.REJECTED ?? {};

    return (
        <Modal show={show} onHide={onClose} size="lg" centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className="bg-light rounded">
                        {testResult.testName}
                    </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {/* TABLA DE CAMPOS */}
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Campo</th>
                        <th>Valor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(testData)
                        .filter(([k]) => !excluded.includes(k))
                        .map(([key, field]) => (
                            <tr key={key}>
                                <td className="fw-semibold">{field?.display_name ?? ""}</td>
                                <td>{field?.value ?? "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* SECCIÓN DE RECHAZOS ANTERIORES */}
                <div className="mt-4">
                    <h5 className="fw-bold">Historial de Rechazos</h5>

                    {Object.keys(rejectedBlock).length === 0 ? (
                        <p className="text-muted">No hay rechazos previos.</p>
                    ) : (
                        <table className="table table-sm table-striped">
                            <thead>
                            <tr>
                                <th>Prueba</th>
                                <th>Intentos</th>
                                <th>Observaciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(rejectedBlock).map(([testName, data], i) => (
                                <tr key={i}>
                                    <td className="fw-semibold">{testName}</td>
                                    <td>{data.intentos ?? 0}</td>
                                    <td>{data.observations ?? "—"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* IMÁGENES */}
                {Array.isArray(testData.img) && testData.img.length > 0 && (
                    <div className="mt-3">
                        <h5 className="fw-bold">Imágenes</h5>
                        <div className="d-flex gap-2 flex-wrap">
                            {testData.img.map((imgUrl, i) => (
                                <img
                                    key={i}
                                    src={imgUrl}
                                    alt="evidencia"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* COMENTARIOS */}
                <Form.Group className="mt-4">
                    <Form.Label>Comentarios de Rechazo</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Form.Group>

                {/* BOTONES */}
                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button
                        variant="outline-danger"
                        disabled={loading}
                        onClick={handleReject}
                    >
                        Rechazar Prueba
                    </Button>

                    <Button
                        variant="success"
                        disabled={testData.approved}
                        onClick={handleApprove}
                    >
                        Aprobar Prueba
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SupervisionTestResultModal;
