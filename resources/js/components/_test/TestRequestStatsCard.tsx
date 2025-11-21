import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

type TestRequestStatsCardProps = {
    stats: {
        total: number;
        total_variation: number;
        pending: number;
        pending_variation: number;
        send: number;
        send_variation: number;
        finished: number;
        finished_variation: number;
    };
};

const TestRequestStatsCard: React.FC<TestRequestStatsCardProps> = ({ stats }) => {
    const cards = [
        {
            key: "total",
            title: "Total Solicitudes",
            value: stats.total,
            variation: stats.total_variation,
            icon: "tabler:clipboard",
            iconBgClass: "bg-primary-subtle",
            color: "primary",
        },
        {
            key: "pending",
            title: "Pendientes",
            value: stats.pending,
            variation: stats.pending_variation,
            icon: "tabler:clock",
            iconBgClass: "bg-warning-subtle",
            color: "warning",
        },
        {
            key: "send",
            title: "Enviadas",
            value: stats.send,
            variation: stats.send_variation,
            icon: "tabler:send",
            iconBgClass: "bg-info-subtle",
            color: "info",
        },
        {
            key: "finished",
            title: "Finalizadas",
            value: stats.finished,
            variation: stats.finished_variation,
            icon: "tabler:circle-check",
            iconBgClass: "bg-success-subtle",
            color: "success",
        },
    ];

    return (
        <Row className="g-3">
            {cards.map((card) => (
                <Col key={card.key} xs={12} md={6} xl={3}>
                    <Card className="h-70 border-0 shadow-sm rounded-4">
                        <Card.Body className="d-flex flex-column justify-content-between p-3">

                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="me-1">
                                    <div className="fw-semibold fs-5">
                                        {card.title}
                                    </div>
                                </div>

                                <div
                                    className={`d-inline-flex align-items-center justify-content-center rounded-3 ${card.iconBgClass}`}
                                    style={{ width: 46, height: 46 }}
                                >
                                    <IconifyIcon icon={card.icon} className="fs-3" />
                                </div>
                            </div>

                            {/* Value + variation */}
                            <div className="mt-3">
                                <span className="fw-bold fs-3">{card.value}</span>

                                <div className={`fw-semibold mt-1 text-${card.variation >= 0 ? "success" : "danger"}`}>
                                    <IconifyIcon
                                        icon={card.variation >= 0 ? "tabler:trending-up" : "tabler:trending-down"}
                                        className="me-1"
                                    />
                                    {card.variation}%
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default TestRequestStatsCard;
