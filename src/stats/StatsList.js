import { EyeOutlined, FlagOutlined, FrownOutlined, MehOutlined, MinusOutlined, PlusOutlined, ProjectOutlined, SmileOutlined, ToTopOutlined, TrophyFilled, TrophyOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Col, Radio, Row, Spin } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import StatsTable from './StatsTable';

const StatsList = (props) => {

    const [managers, setManagers] = useState();        
    const [level, setLevel] = useState(0);

    useEffect(() => {      
        axios({
            method: 'GET',
            url: `${api.managers}`
        }).then(res => {                                            
            setManagers(res.data)
        }).catch(err => {
            console.log(err.message)
        });                          
    }, []);    

    function getChampion(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_champion
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_champion
            }
        }
        return res
    }

    function getRunnerup(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_runnerup
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_runnerup
            }
        }
        return res
    }

    function getThird(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_third
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_third
            }
        }
        return res
    }

    function getAppearance(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_appearance
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_appearance
            }
        }
        return res
    }

    function getTopScorer(manager, level) {        
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_topscorer
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_topscorer
            }
        }
        return res
    }

    function getVanga(manager, level) {        
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_vanga
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_vanga
            }
        }
        return res
    }

    function getPoints(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_point
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_point
            }
        }
        return res
    }

    function getWins(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_win
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_win
            }
        }
        return res
    }

    function getDraws(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_draw
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_draw
            }
        }
        return res
    }

    function getLosses(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_loss
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_loss
            }
        }
        return res
    }

    function getScore(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_score
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_score
            }
        }
        return res
    }

    function getScoreAway(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_score_away
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_score_away
            }
        }
        return res
    }

    function orderByChamp(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getChampion(b, level) - getChampion(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getChampion(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByRunnerup(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getRunnerup(b, level) - getRunnerup(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getRunnerup(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByThird(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getThird(b, level) - getThird(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getThird(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByAppearance(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAppearance(b, level) - getAppearance(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAppearance(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByTopScorer(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getTopScorer(b, level) - getTopScorer(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getTopScorer(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByVanga(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getVanga(b, level) - getVanga(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getVanga(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }  
    
    function orderByPoints(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getPoints(b, level) - getPoints(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getPoints(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }  

    function orderByScore(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getScore(b, level) - getScore(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getScore(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }  

    function orderByScoreAway(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getScoreAway(b, level) - getScoreAway(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getScoreAway(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    } 
    
    function orderByWins(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getWins(b, level) - getWins(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getWins(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    } 

    function orderByDraws(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getDraws(b, level) - getDraws(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getDraws(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    } 

    function orderByLosses(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getLosses(b, level) - getLosses(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getLosses(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    } 
    
    function onChangeLevel(e) {
        setLevel(e.target.value)
    }

    return (
        <div>
            { managers ? (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Нүүр</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Статистик
                        </Breadcrumb.Item>
                    </Breadcrumb>            
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Radio.Group onChange={onChangeLevel} defaultValue={level}>
                            <Radio.Button value={1}>Дээд</Radio.Button>
                            <Radio.Button value={2}>Чэмпионшип</Radio.Button>
                            <Radio.Button value={0}>Нийт</Radio.Button>                                        
                        </Radio.Group>
                    </div>                             
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>
                            <Card title="Түрүү" size="small" extra={<Avatar shape="square" icon={<TrophyFilled style={{ color: 'yellow' }} />} />}>
                                <StatsTable data={orderByChamp(managers, 10)} />
                            </Card>                        
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>
                            <Card title="Үзүүр" size="small" extra={<Avatar shape="square" icon={<TrophyOutlined />} />}>
                                <StatsTable data={orderByRunnerup(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="3-р байр" size="small" extra={<Avatar shape="square" icon={<TrophyFilled style={{ color: '#cd7f32' }} />} />}>
                                <StatsTable data={orderByThird(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Оролцсон" size="small" extra={<Avatar shape="square" icon={<ToTopOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAppearance(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Мэргэн бууч" size="small" extra={<Avatar shape="square" icon={<FlagOutlined style={{ color: '#000' }} />} />}>                                
                                <StatsTable data={orderByTopScorer(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Ванга" size="small" extra={<Avatar shape="square" icon={<EyeOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByVanga(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Оноо" size="small" extra={<Avatar shape="square" icon={<ProjectOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByPoints(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Авсан" size="small" extra={<Avatar shape="square" icon={<PlusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByScore(managers, 10)} />
                            </Card> 
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Алдсан" size="small" extra={<Avatar shape="square" icon={<MinusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByScoreAway(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Хожил" size="small" extra={<Avatar shape="square" icon={<SmileOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByWins(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Тэнцээ" size="small" extra={<Avatar shape="square" icon={<MehOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByDraws(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Хожигдол" size="small" extra={<Avatar shape="square" icon={<FrownOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByLosses(managers, 10)} />
                            </Card>
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