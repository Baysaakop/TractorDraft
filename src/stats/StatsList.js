import { DislikeOutlined, EyeOutlined, FlagOutlined, FrownOutlined, LikeOutlined, MehOutlined, MinusOutlined, PlusOutlined, ProjectOutlined, PushpinOutlined, ScheduleOutlined, SmileOutlined, StarFilled, StarOutlined, ToTopOutlined, TrophyFilled, TrophyOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Col, Radio, Row, Spin } from 'antd';
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

    function getMatch(manager, level) {
        let res = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_match
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_match
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

    function getMatchTopScorerRate(manager, level) {
        let res = 0
        let count = 0
        if (level === 0) {
            manager.career.forEach(career => {
                res += career.total_topscorer
                count += career.total_match
            })
        } else {
            let career = manager.career.find(x => x.level === level)
            if (career) {
                res = career.total_topscorer
                count = career.total_match
            }
        }
        if (count === 0) {
            return 0
        }
        res = res / count * 100
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
                number: getMatchWinRate(sorted[i], level)  
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
    
    function onChangeLevel(e) {
        setLevel(e.target.value)
    }

    return (
        <div>
            { managers && leagues ? (
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
                            <Card title="Оролцсон" size="small" extra={<Avatar shape="square" icon={<PushpinOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAppearance(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Мэргэн бууч" size="small" extra={<Avatar shape="square" icon={<LikeOutlined style={{ color: '#000' }} />} />}>                                
                                <StatsTable data={orderByTopScorer(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="МБ-тай таарсан" size="small" extra={<Avatar shape="square" icon={<DislikeOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByTopScorerAway(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Оноо" size="small" extra={<Avatar shape="square" icon={<StarFilled style={{ color: 'yellow' }} />} />}>
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
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж оноо (Лиг)" size="small" extra={<Avatar shape="square" icon={<StarFilled style={{ color: 'yellow' }} />} />}>
                                <StatsTable data={orderByAveragePoints(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж + (Лиг)" size="small" extra={<Avatar shape="square" icon={<PlusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageScore(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж - (Лиг)" size="small" extra={<Avatar shape="square" icon={<MinusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageScoreAway(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж хожил (Лиг)" size="small" extra={<Avatar shape="square" icon={<SmileOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageWins(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж тэнцээ (Лиг)" size="small" extra={<Avatar shape="square" icon={<MehOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageDraws(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж хожигдол (Лиг)" size="small" extra={<Avatar shape="square" icon={<FrownOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageLosses(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж оноо (Тоглолт)" size="small" extra={<Avatar shape="square" icon={<StarFilled style={{ color: 'yellow' }} />} />}>
                                <StatsTable data={orderByAverageMatchPoints(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж + (Тоглолт)" size="small" extra={<Avatar shape="square" icon={<PlusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageMatchScore(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Дундаж - (Тоглолт)" size="small" extra={<Avatar shape="square" icon={<MinusOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByAverageMatchScoreAway(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Хожлийн хувь" size="small" extra={<Avatar shape="square" icon={<SmileOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByMatchWinRate(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Тэнцээний хувь" size="small" extra={<Avatar shape="square" icon={<MehOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByMatchDrawRate(managers, 10)} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: '8px' }}>                                
                            <Card title="Хожигдлын хувь" size="small" extra={<Avatar shape="square" icon={<FrownOutlined style={{ color: '#000' }} />} />}>
                                <StatsTable data={orderByMatchLossRate(managers, 10)} />
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