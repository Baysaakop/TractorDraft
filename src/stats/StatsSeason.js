import { Breadcrumb, Card, Col, Row, Avatar, Radio, Spin } from "antd"
import { useEffect, useState } from "react";
import axios from 'axios';
import api from '../api';
import { FrownOutlined, MehOutlined, MinusOutlined, SmileOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import StatsTable from './StatsTable';

function StatsSeason (props) {    
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
            console.log(res.data)
            setLeagues(res.data)                 
        }).catch(err => {
            console.log(err.message)
        });    
        setLoading(false)
    }, []);    

    function orderBySinglePoints(list, size) {        
        if (level > 0) {
            list = list.filter(x => x.level === level)
        }        
        let arr = []
        list.forEach(league => {
            league.table.teams.forEach(team => {
                let item = {
                    manager: team.manager,
                    number: team.points
                }
                arr.push(item)
            })
        })
        arr = arr.sort((a, b) => b.number - a.number).slice(0, size)
        for (let i = 0; i < arr.length; i++) {
            arr[i].rank = i+1
        }
        return arr     
    }

    function orderBySingleScore(list, size) {        
        if (level > 0) {
            list = list.filter(x => x.level === level)
        }        
        let arr = []
        list.forEach(league => {
            league.table.teams.forEach(team => {
                let item = {
                    manager: team.manager,
                    number: team.score
                }
                arr.push(item)
            })
        })
        arr = arr.sort((a, b) => b.number - a.number).slice(0, size)
        for (let i = 0; i < arr.length; i++) {
            arr[i].rank = i+1
        }
        return arr  
    }

    function orderBySingleScoreLow(list, size) {        
        if (level > 0) {
            list = list.filter(x => x.level === level)
        }        
        let arr = []
        list.forEach(league => {
            league.table.teams.forEach(team => {
                let item = {
                    manager: team.manager,
                    number: team.score
                }
                arr.push(item)
            })
        })
        arr = arr.sort((a, b) => a.number - b.number).slice(0, size)
        for (let i = 0; i < arr.length; i++) {
            arr[i].rank = i+1
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
            : managers && leagues ? 
                <div>                
                    <div style={{ margin: '16px 0' }}>
                        <Radio.Group onChange={onChangeLevel} defaultValue={level}>
                            <Radio.Button value={1}>Дээд</Radio.Button>
                            <Radio.Button value={2}>Чэмпионшип</Radio.Button>
                            <Radio.Button value={0}>Нийт</Radio.Button>                                        
                        </Radio.Group>
                    </div>        
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}style={{ padding: '8px' }}>                                
                            <Card title="Нэг улирлын оноо" size="small" extra={<Avatar shape="square" icon={<StarFilled style={{ color: 'yellow' }} />} />}>
                                <StatsTable data={orderBySinglePoints(leagues, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Нэг улирлын +" size="small" extra={<Avatar shape="square" icon={<PlusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderBySingleScore(leagues, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Нэг улирлын -" size="small" extra={<Avatar shape="square" icon={<MinusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderBySingleScoreLow(leagues, 20)} />
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