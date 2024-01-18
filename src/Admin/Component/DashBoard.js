// Dashboard.js
import React from 'react';
import { Card, Row, Col, Statistic, Divider } from 'antd';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Example: Displaying some charts or statistics */}
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Orders" value={150} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Revenue" value={12000} prefix="$" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Product Count" value={300} />
          </Card>
        </Col>
      </Row>

      {/* Divider for visual separation */}
      <Divider />

      {/* Example: Additional metrics */}
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Category Count" value={15} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Danh Mục Count" value={10} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Account Count" value={50} />
          </Card>
        </Col>
      </Row>

      {/* Divider for visual separation */}
      <Divider />

      {/* Example: Recent activities */}
  

      {/* Add more sections and content based on your dashboard requirements */}
    </div>
  );
};

export default Dashboard;
