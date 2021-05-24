import { DislikeOutlined, FrownOutlined, LikeOutlined, MehOutlined, MinusOutlined, PlusOutlined, PushpinOutlined, SmileOutlined, StarFilled, TrophyFilled, TrophyOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Radio, Row, Spin } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import StatsTable from './StatsTable';

const StatsList = (props) => {

    const [managers, setManagers] = useState();        
    const [level, setLevel] = useState(0);
    const [leagues, setLeagues] = useState();    

    useEffect(() => {      
        axios({
            method: 'GET',
            url: `${api.managers}`
        }).then(res => {                                            
            setManagers(res.data)
        }).catch(err => {
            console.log(err.message)
        });
        axios({
            method: 'GET',
            url: `${api.leagues}`
        }).then(res => {                   
            setLeagues(res.data)                 
        }).catch(err => {
            console.log(err.message)
        });    
    }, []);    
    
    function onChangeLevel(e) {
        setLevel(e.target.value)
    }

    return (
        <div>
            { managers && leagues ? (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Нүүр хуудас</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Статистик
                        </Breadcrumb.Item>
                    </Breadcrumb>            
                    {/* <div style={{ margin: '16px 0' }}>
                        <Radio.Group onChange={onChangeLevel} defaultValue={level}>
                            <Radio.Button value={1}>Дээд</Radio.Button>
                            <Radio.Button value={2}>Чэмпионшип</Radio.Button>
                            <Radio.Button value={0}>Нийт</Radio.Button>                                        
                        </Radio.Group>
                    </div>                              */}
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
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}
            
        </div>
    );
};

export default StatsList;