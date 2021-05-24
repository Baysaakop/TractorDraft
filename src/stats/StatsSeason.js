import { Breadcrumb, Card, Col, Row, Avatar, Radio, Spin, Table } from "antd"
import { useEffect, useState } from "react";
import axios from 'axios';
import api from '../api';
import { FrownFilled, FrownOutlined, MehOutlined, MinusOutlined, SmileOutlined, PlusOutlined, ProjectOutlined, StarFilled } from '@ant-design/icons';
import StatsTable from './StatsTable';

function StatsSeason (props) {    
    const [teams, setTeams] = useState()
    const [managers, setManagers] = useState();        
    const [level, setLevel] = useState(0)    
    const [leagues, setLeagues] = useState()
    const [loading, setLoading] = useState()    
    useEffect(() => {     
        setLoading(true)           
        axios({
            method: 'GET',
            url: `${api.tableteams}`
        }).then(res => {                   
            setTeams(res.data)                        
        }).catch(err => {
            console.log(err.message)
        });                 
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

    function orderBySinglePoints(teams, count) {        
        let pts = teams.sort((a, b) => b.points - a.points).slice(0, count)
        let arr = []
        for (let i = 0; i < pts.length; i++) {
            let data = {
                rank: i + 1,
                manager: pts[i].manager,
                number: pts[i].points
            }
            arr.push(data)
        }
        return arr
    }

    function orderBySingleScore(teams, count) {        
        let pts = teams.sort((a, b) => b.score - a.score).slice(0, count)
        let arr = []
        for (let i = 0; i < pts.length; i++) {
            let data = {
                rank: i + 1,
                manager: pts[i].manager,
                number: pts[i].score
            }
            arr.push(data)
        }
        return arr
    }

    function orderBySingleScoreLow(teams, count) {        
        let pts = teams.sort((a, b) => a.score - b.score).slice(0, count)
        let arr = []
        for (let i = 0; i < pts.length; i++) {
            let data = {
                rank: i + 1,
                manager: pts[i].manager,
                number: pts[i].score
            }
            arr.push(data)
        }
        return arr
    }

    function onChangeLevel(e) {
        setLevel(e.target.value)
    }

    function getAverageScore(manager, level) {
        let res = 0
        let count = 0
        let list 
        if (level === 0) {
            list = leagues.filter(x => x.isFinished === true)            
        } else {
            list = leagues.filter(x => x.isFinished === true && x.level === level)
        }
        list.forEach(l => {
            l.table.teams.forEach(t => {                    
                if (t.manager.id === manager.id) {
                    res += t.score
                    count += 1
                }
            })
        })
        if (count === 0) {
            return 0
        }
        res = res / count
        return res.toFixed(1)
    }

    function getAverageScoreAway(manager, level) {
        let res = 0
        let count = 0
        let list 
        if (level === 0) {
            list = leagues.filter(x => x.isFinished === true)            
        } else {
            list = leagues.filter(x => x.isFinished === true && x.level === level)
        }
        list.forEach(l => {
            l.table.teams.forEach(t => {                    
                if (t.manager.id === manager.id) {
                    res += t.score_away
                    count += 1
                }
            })
        })
        if (count === 0) {
            return 0
        }
        res = res / count
        return res.toFixed(1)
    }

    function getAveragePoints(manager, level) {
        let res = 0
        let count = 0
        let list 
        if (level === 0) {
            list = leagues.filter(x => x.isFinished === true)            
        } else {
            list = leagues.filter(x => x.isFinished === true && x.level === level)
        }
        list.forEach(l => {
            l.table.teams.forEach(t => {                    
                if (t.manager.id === manager.id) {
                    res += t.points
                    count += 1
                }
            })
        })
        if (count === 0) {
            return 0
        }
        res = res / count
        return res.toFixed(1)
    }

    function getAverageWins(manager, level) {
        let res = 0
        let count = 0
        let list 
        if (level === 0) {
            list = leagues.filter(x => x.isFinished === true)            
        } else {
            list = leagues.filter(x => x.isFinished === true && x.level === level)
        }
        list.forEach(l => {
            l.table.teams.forEach(t => {                    
                if (t.manager.id === manager.id) {
                    res += t.wins
                    count += 1
                }
            })
        })
        if (count === 0) {
            return 0
        }
        res = res / count
        return res.toFixed(1)
    }

    function getAverageDraws(manager, level) {
        let res = 0
        let count = 0
        let list 
        if (level === 0) {
            list = leagues.filter(x => x.isFinished === true)            
        } else {
            list = leagues.filter(x => x.isFinished === true && x.level === level)
        }
        list.forEach(l => {
            l.table.teams.forEach(t => {                    
                if (t.manager.id === manager.id) {
                    res += t.draws
                    count += 1
                }
            })
        })
        if (count === 0) {
            return 0
        }
        res = res / count
        return res.toFixed(1)
    }

    function getAverageLosses(manager, level) {
        let res = 0
        let count = 0
        let list 
        if (level === 0) {
            list = leagues.filter(x => x.isFinished === true)            
        } else {
            list = leagues.filter(x => x.isFinished === true && x.level === level)
        }
        list.forEach(l => {
            l.table.teams.forEach(t => {                    
                if (t.manager.id === manager.id) {
                    res += t.losses
                    count += 1
                }
            })
        })
        if (count === 0) {
            return 0
        }
        res = res / count
        return res.toFixed(1)
    }

    function orderByAveragePoints(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAveragePoints(b, level) - getAveragePoints(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAveragePoints(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByAverageScore(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAverageScore(b, level) - getAverageScore(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAverageScore(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByAverageScoreAway(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAverageScoreAway(b, level) - getAverageScoreAway(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAverageScoreAway(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByAverageWins(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAverageWins(b, level) - getAverageWins(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAverageWins(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }
    
    function orderByAverageDraws(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAverageDraws(b, level) - getAverageDraws(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAverageDraws(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByAverageLosses(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAverageLosses(b, level) - getAverageLosses(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAverageLosses(sorted[i], level)  
            }
            result.push(item)
        }
        return result
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
            : managers && teams && leagues ? 
                <div>                    
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}style={{ padding: '8px' }}>                                
                            <Card title="Нэг улирлын оноо" size="small" extra={<Avatar shape="square" icon={<StarFilled style={{ color: 'yellow' }} />} />}>
                                <StatsTable data={orderBySinglePoints(teams, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Нэг улирлын +" size="small" extra={<Avatar shape="square" icon={<PlusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderBySingleScore(teams, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Нэг улирлын +" size="small" extra={<Avatar shape="square" icon={<MinusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderBySingleScoreLow(teams, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}style={{ padding: '8px' }}>                                
                            <Card title="Дундаж оноо (Лиг)" size="small" extra={<Avatar shape="square" icon={<StarFilled style={{ color: 'yellow' }} />} />}>
                                <StatsTable data={orderByAveragePoints(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж + (Лиг)" size="small" extra={<Avatar shape="square" icon={<PlusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageScore(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж - (Лиг)" size="small" extra={<Avatar shape="square" icon={<MinusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageScoreAway(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж хожил (Лиг)" size="small" extra={<Avatar shape="square" icon={<SmileOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageWins(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж тэнцээ (Лиг)" size="small" extra={<Avatar shape="square" icon={<MehOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageDraws(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж хожигдол (Лиг)" size="small" extra={<Avatar shape="square" icon={<FrownOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageLosses(managers, 20)} />
                            </Card>
                        </Col>    
                    </Row>
                </div>
            : <></>}
        </div>
    )
}

export default StatsSeason