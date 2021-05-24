import { Breadcrumb, Card, Col, Row, Avatar, Radio, Spin, Table } from "antd"
import { useEffect, useState } from "react";
import axios from 'axios';
import api from '../api';
import { FrownFilled, FrownOutlined, MehOutlined, MinusOutlined, SmileOutlined, PlusOutlined, ProjectOutlined, StarFilled, TrophyFilled, TrophyOutlined, PushpinOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import StatsTable from './StatsTable';

function StatsLeague (props) {

    const [managers, setManagers] = useState();        
    const [level, setLevel] = useState(0)
    const [leagues, setLeagues] = useState()
    const [loading, setLoading] = useState()    

    useEffect(() => {     
        setLoading(true)                          
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
        setLoading(false)
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

    function getTopScorerAway(manager, level) {        
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_topscorer_away
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_topscorer_away
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

    function orderByTopScorerAway(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getTopScorerAway(b, level) - getTopScorerAway(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getTopScorerAway(sorted[i], level)  
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
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр хуудас</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/stats">Статистик</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Тоглолт
                </Breadcrumb.Item>
            </Breadcrumb>      
            { loading ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <Spin />
                </div>
            : managers && leagues ? 
                <div>                    
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>
                            <Card title="Түрүү" size="small" extra={<Avatar shape="square" icon={<TrophyFilled style={{ color: 'yellow' }} />} />}>
                                <StatsTable data={orderByChamp(managers, 20)} />
                            </Card>                        
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>
                            <Card title="Үзүүр" size="small" extra={<Avatar shape="square" icon={<TrophyOutlined />} />}>
                                <StatsTable data={orderByRunnerup(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="3-р байр" size="small" extra={<Avatar shape="square" icon={<TrophyFilled style={{ color: '#cd7f32' }} />} />}>
                                <StatsTable data={orderByThird(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Оролцсон" size="small" extra={<Avatar shape="square" icon={<PushpinOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAppearance(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Мэргэн бууч" size="small" extra={<Avatar shape="square" icon={<LikeOutlined style={{ color: '#000' }} />} />}>                                
                                <StatsTable data={orderByTopScorer(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="МБ-тай таарсан" size="small" extra={<Avatar shape="square" icon={<DislikeOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByTopScorerAway(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Оноо" size="small" extra={<Avatar shape="square" icon={<StarFilled style={{ color: 'yellow' }} />} />}>
                                <StatsTable data={orderByPoints(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Авсан" size="small" extra={<Avatar shape="square" icon={<PlusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByScore(managers, 20)} />
                            </Card> 
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Алдсан" size="small" extra={<Avatar shape="square" icon={<MinusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByScoreAway(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Хожил" size="small" extra={<Avatar shape="square" icon={<SmileOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByWins(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Тэнцээ" size="small" extra={<Avatar shape="square" icon={<MehOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByDraws(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Хожигдол" size="small" extra={<Avatar shape="square" icon={<FrownOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByLosses(managers, 20)} />
                            </Card>
                        </Col>    
                    </Row>
                </div>
            : <></>}
        </div>
    )
}

export default StatsLeague