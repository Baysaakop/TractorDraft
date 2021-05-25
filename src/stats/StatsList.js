import { Breadcrumb, Button, Col, Row } from 'antd';
import React from 'react';

const StatsList = (props) => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр хуудас</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Статистик
                </Breadcrumb.Item>
            </Breadcrumb>            
            <Row gutter={16} style={{ margin: '24px 0' }}>
                <Col span={8} style={{ padding: '0 24px' }}>
                    <Button href="/statsleague" type="ghost" size="large" style={{ fontSize: '32px', width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Лигийн</Button>
                </Col>
                <Col span={8} style={{ padding: '0 24px' }}>
                    <Button href="/statsseason" type="ghost" size="large" style={{ fontSize: '32px', width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Улирлын</Button>
                </Col>
                <Col span={8} style={{ padding: '0 24px' }}>
                    <Button href="/statsmatch" type="ghost" size="large" style={{ fontSize: '32px', width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Тоглолтын</Button>
                </Col>
            </Row>                                                                         
        </div>
    );
};

export default StatsList;