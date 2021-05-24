import { Breadcrumb, Card, Col, Row, Avatar, Radio, Spin, Table } from "antd"
import { useEffect, useState } from "react";
import axios from 'axios';
import api from '../api';
import { FrownFilled, FrownOutlined, MehOutlined, MinusOutlined, PieChartOutlined, PlusOutlined, ProjectOutlined, StarFilled } from '@ant-design/icons';
import StatsTable from './StatsTable';

function StatsMatch (props) {

    const [matches, setMatches] = useState()  
    const [managers, setManagers] = useState();        
    const [level, setLevel] = useState(0)
    const [leagues, setLeagues] = useState()
    const [loading, setLoading] = useState()
    const [singleScoreHigh, setSingleScoreHigh] = useState()
    const [singleScoreLow, setSingleScoreLow] = useState()

    useEffect(() => {     
        setLoading(true)         
        axios({
            method: 'GET',
            url: `${api.matches}`
        }).then(res => {              
            setMatches(res.data)                 
            orderBySingleScore(res.data, 20)
            setLoading(false)
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

    function onChangeLevel(e) {
        setLevel(e.target.value)
    }

    function orderBySingleScore(list, size) {
        let high = []  
        list.forEach(match => {
            let home = {
                team: match.home_team,
                score: match.home_score
            }
            high.push(home)
            let away = {
                team: match.away_team,
                score: match.away_score
            }            
            high.push(away)
        })                
        high = high.sort((a, b) => b.score - a.score)       
        for (let i = 0; i < high.length; i++) {
            high[i].rank = i+1
        }        
        setSingleScoreHigh(high.slice(0, size))     
        let low = []
        for (let i = high.length - size; i < high.length; i++) {
            let item = {
                team: high[i].team,
                score: high[i].score,
                rank: high.length - i
            }
            low.push(item)
        }
        setSingleScoreLow(low.reverse())                
    }

    const columns = [
        {
            title: 'Байр',
            dataIndex: 'rank',
        },
        {
            title: 'Баг',
            dataIndex: 'team',        
            render: item => <img src={item.image} alt="teamlogo" style={{ width: 'auto', height: '24px' }} />
        },    
        {
            title: 'Менежер',
            dataIndex: 'team',        
            render: item => 
            <a href={`/managers/${item.id}`}>                        
                {` ${item.name}`}
            </a>     
        },
        {
            title: 'Тоо',
            dataIndex: 'score',        
            render: item => <div style={{ textAlign: 'right' }}>{item}</div>
        },
    ];

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

    function getMatchDrawRate(manager, level) {
        let res = 0
        let count = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_draw
                count += career.total_match
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_draw
                count = career.total_match
            }
        }
        if (count === 0) {
            return 0
        }
        res = res / count * 100
        return res.toFixed(1)
    }

    function getMatchLossRate(manager, level) {
        let res = 0
        let count = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_loss
                count += career.total_match
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_loss
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

    function orderByMatchDrawRate(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getMatchDrawRate(b, level) - getMatchDrawRate(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getMatchDrawRate(sorted[i], level)  
            }
            result.push(item)
        }
        return result
    }

    function orderByMatchLossRate(data, size) {
        let result = []
        let sorted = data.sort((a, b) => getMatchLossRate(b, level) - getMatchLossRate(a, level))
        for (let i = 0; i < size; i++) {
            let item = { 
                rank: (i + 1),
                manager: sorted[i],
                number: getMatchLossRate(sorted[i], level)  
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
            : matches && managers ? 
                <div>
                    {/* <div style={{ margin: '16px 0' }}>
                        <Radio.Group onChange={onChangeLevel} defaultValue={level}>
                            <Radio.Button value={1}>Дээд</Radio.Button>
                            <Radio.Button value={2}>Чэмпионшип</Radio.Button>
                            <Radio.Button value={0}>Нийт</Radio.Button>                                        
                        </Radio.Group>
                    </div>     */}
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>
                            <Card title="Хамгийн их оноо" size="small" extra={<Avatar shape="square" icon={<StarFilled style={{ color: 'yellow' }} />} />}>
                                <Table columns={columns} dataSource={singleScoreHigh ? singleScoreHigh : undefined} size="small" pagination={{ pageSize: 20 }} showHeader={false} />
                            </Card>                        
                        </Col>
                        <Col xs={24} sm={12} md={8} style={{ padding: '8px' }}>
                            <Card title="Хамгийн бага оноо" size="small" extra={<Avatar shape="square" icon={<FrownOutlined style={{ color: 'black' }} />} />}>
                                <Table columns={columns} dataSource={singleScoreLow ? singleScoreLow : undefined} size="small" pagination={{ pageSize: 20 }} showHeader={false} />
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