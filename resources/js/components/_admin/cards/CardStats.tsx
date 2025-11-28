import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const CardStats = ({ cards }) => {

    const cardList = [
        {
            key: 'tests',
            title: "Total Pruebas",
            value: cards.total_tests,
            icon: "tabler:clipboard",
            iconBgClass: "bg-success-subtle",
        },
        {
            key: 'tests_month',
            title: "Pruebas este Mes",
            value: cards.tests_this_month,
            icon: "tabler:calendar-month",
            iconBgClass: "bg-secondary-subtle",
        },
        {
            key: 'tests_week',
            title: "Pruebas esta Semana",
            value: cards.tests_this_week,
            icon: "tabler:calendar-week",
            iconBgClass: "bg-info-subtle",
        },
        {
            key: 'users',
            title: "Total Usuarios",
            value: cards.total_users,
            icon: "tabler:user",
            iconBgClass: "bg-primary-subtle",
        },
    ];

    return (
        <Row className="g-3">
            {cardList.map((card) => (
                <Col key={card.key} xs={12} md={6} xl={3}>
                    <Card className="h-70 border-0 shadow-sm rounded-4">
                        <Card.Body className="d-flex flex-column justify-content-between p-3">

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
                                    <IconifyIcon
                                        icon={card.icon}
                                        className="fs-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <span className="fw-bold fs-3">
                                    {card.value}
                                </span>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default CardStats;
