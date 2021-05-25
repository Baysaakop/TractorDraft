import { Breadcrumb, Card, Col, Row, Avatar, Radio, Spin } from "antd"
import { useEffect, useState } from "react";
import axios from 'axios';
import api from '../api';
import { FrownOutlined, MinusOutlined, PieChartOutlined, PlusOutlined, ProjectOutlined, StarFilled } from '@ant-design/icons';
import StatsTable from './StatsTable';

function StatsMatch (props) {
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
    
    function onChangeLevel(e) {
        setLevel(e.target.value)
    }

    function orderBySingleScore(list, size) {
        if (level > 0) {
            list = list.filter(x => x.level === level)
        }        
        let arr = []
        list.forEach(league => {
            league.gameweeks.forEach(gameweek => {
                gameweek.matches.forEach(match => {
                    let home = {
                        manager: match.home_team,
                        number: match.home_score
                    } 
                    let away = {
                        manager: match.away_team,
                        number: match.away_score
                    }
                    arr.push(home)
                    arr.push(away)
                })
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
            league.gameweeks.forEach(gameweek => {
                gameweek.matches.forEach(match => {
                    let home = {
                        manager: match.home_team,
                        number: match.home_score
                    } 
                    let away = {
                        manager: match.away_team,
                        number: match.away_score
                    }
                    arr.push(home)
                    arr.push(away)
                })
            })
        })
        arr = arr.sort((a, b) => a.number - b.number).slice(0, size)
        for (let i = 0; i < arr.length; i++) {
            arr[i].rank = i+1
        }
        return arr      
    }

    function getAverageMatchScore(manager, level) {
        let res = 0
        let count = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_score
                count += career.total_match
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_score
                count = career.total_match
            }
        }
        if (count === 0) {
            return 0
        }
        res = res / count
        return res.toFixed(1)
    }

    function getAverageMatchScoreAway(manager, level) {
        let res = 0
        let count = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_score_away
                count += career.total_match
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_score_away
                count = career.total_match
            }
        }
        if (count === 0) {
            return 0
        }
        res = res / count
        return res.toFixed(1)
    }

    function getAverageMatchPoints(manager, level) {
        let res = 0
        let count = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_point
                count += career.total_match
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_point
                count = career.total_match
            }
        }
        if (count === 0) {
            return 0
        }
        res = res / count
        return res.toFixed(1)
    }

    function getMatchWinRate(manager, level) {
        let res = 0
        let count = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_win
                count += career.total_match
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_win
                count = career.total_match
            }
        }
        if (count === 0) {
            return 0
        }
        res = res / count * 100
        return res.toFixed(1)
    }

    function orderByAverageMatchPoints(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAverageMatchPoints(b, level) - getAverageMatchPoints(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAverageMatchPoints(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByAverageMatchScore(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAverageMatchScore(b, level) - getAverageMatchScore(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAverageMatchScore(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByAverageMatchScoreAway(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getAverageMatchScoreAway(b, level) - getAverageMatchScoreAway(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getAverageMatchScoreAway(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByMatchWinRate(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getMatchWinRate(b, level) - getMatchWinRate(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: `${getMatchWinRate(sorted[i], level)}%`
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
            : leagues && managers ? 
                <div>
                    <div style={{ margin: '16px 0' }}>
                        <Radio.Group onChange={onChangeLevel} defaultValue={level}>
                            <Radio.Button value={1}>Дээд</Radio.Button>
                            <Radio.Button value={2}>Чэмпионшип</Radio.Button>
                            <Radio.Button value={0}>Нийт</Radio.Button>                                        
                        </Radio.Group>
                    </div>    
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>
                            <Card title="Хамгийн их оноо" size="small" extra={<Avatar shape="square" icon={<StarFilled style={{ color: 'yellow' }} />} />}>                                
                                <StatsTable data={orderBySingleScore(leagues, 20)} />
                            </Card>                        
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>
                            <Card title="Хамгийн бага оноо" size="small" extra={<Avatar shape="square" icon={<FrownOutlined style={{ color: 'black' }} />} />}>
                                <StatsTable data={orderBySingleScoreLow(leagues, 20)} />
                            </Card>                        
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Хожлийн хувь" size="small" extra={<Avatar shape="square" icon={<PieChartOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByMatchWinRate(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>
                            <Card title="Дундаж оноо" size="small" extra={<Avatar shape="square" icon={<ProjectOutlined style={{ color: 'black' }} />} />}>
                                <StatsTable data={orderByAverageMatchPoints(managers, 20)} />
                            </Card>                        
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж + (Тоглолт)" size="small" extra={<Avatar shape="square" icon={<PlusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageMatchScore(managers, 20)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж - (Тоглолт)" size="small" extra={<Avatar shape="square" icon={<MinusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageMatchScoreAway(managers, 20)} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            : <></>}
        </div>
    )
}

export default StatsMatch