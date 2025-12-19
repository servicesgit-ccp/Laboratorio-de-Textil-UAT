import React, { useState } from 'react';
import { Card, Nav, Tab, Row, Col, Table, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

interface TestResultContentProps {
  result: any;
}

const TestRequestShowDetailContent: React.FC<TestResultContentProps> = ({ result }) => {
  if (!result?.content) return <div className="text-muted">Sin contenido disponible.</div>;

  // Aseguramos que content sea un objeto
  const content = typeof result.content === 'string' ? JSON.parse(result.content) : result.content;
  const groupKeys = Object.keys(content).filter((key) => key !== 'img');
  const [activeGroup, setActiveGroup] = useState(groupKeys[0] || '');

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <Tab.Container activeKey={activeGroup} onSelect={(k) => k && setActiveGroup(k)}>
          <Nav variant="pills" className="mb-3 flex-wrap">
            {groupKeys.map((group) => (
              <Nav.Item key={group}>
                <Nav.Link eventKey={group}>
                  <IconifyIcon icon="tabler:microscope" className="me-1" />
                  {group}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <Tab.Content>
            {groupKeys.map((group) => {
              const groupData = content[group];
              const entries = Object.entries(groupData || {}).filter(
                  ([key]) => key !== 'img' && key !== 'status' && key !== 'approved' && key !== 'user_id' && key !== 'user_name'
              );
              return (
                <Tab.Pane eventKey={group} key={group}>
                  <Card className="border rounded-3 mb-3">
                    <Card.Body>
                      <h6 className="fw-semibold mb-3">
                        <IconifyIcon
                          icon="tabler:list-details"
                          className="me-1"
                        />
                          Detalles de {group}
                      </h6>

                      <Table bordered hover responsive size="sm">
                        <thead>
                          <tr>
                            <th>Campo</th>
                            <th>Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map(([termId, termData]: any) => (
                            <tr key={termId}>
                              <td>{termData?.display_name ?? ''}</td>
                              <td>
                                {termData?.value !== null
                                  ? termData?.value
                                  : (
                                      <Badge bg="secondary">
                                          Sin valor
                                      </Badge>
                                  )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      {/* Si hay imágenes asociadas */}
                      {Array.isArray(groupData.img) &&
                          groupData.img.length > 0 && (
                            <>
                              <h6 className="fw-semibold mt-3">
                                <IconifyIcon
                                  icon="tabler:photo"
                                  className="me-1"
                                />
                                  Imágenes
                              </h6>
                              <Row className="g-2">
                                {groupData.img.map(
                                  (imgSrc: string, idx: number) => (
                                    <Col md={3} key={idx}>
                                      <img
                                        src={imgSrc}
                                        alt={`img-${idx}`}
                                        className="img-fluid rounded shadow-sm border"
                                      />
                                    </Col>
                                  )
                                )}
                              </Row>
                            </>
                          )}
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                );
            })}
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default TestRequestShowDetailContent;
