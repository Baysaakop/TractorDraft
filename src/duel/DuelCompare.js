import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import { Breadcrumb, Card, Col, Row, Spin, Typography, Select } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

const DuelCompare = (props) => {    
    const [matches, setMatches] = useState();    
    const [managers, setManagers] = useState();  
    const [duels, setDuels] = useState();   
    const [team1, setTeam1] = useState();
    const [team2, setTeam2] = useState();  

    useEffect(() => {      
        axios({
            method: 'GET',
            url: `${api.matches}`
        }).then(res => {                                                 
            setMatches(res.data)
        }).catch(err => {
            console.log(err.message)
        }); 
        axios({
            method: 'GET',
            url: `${api.duels}`
        }).then(res => {                                                     
            setDuels(res.data)
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
    }, []); 

    function getDuel(manager, opponent) {
        let duel = duels.filter(x => (x.team1.id === manager.id && x.team2.id === opponent.id) || (x.team1.id === opponent.id && x.team2.id === manager.id))        
        let win = 0
        let draw = 0
        let loss = 0
        if (duel.length > 0) {
            if (duel[0].team1.id === manager.id) {
                win += duel[0].win1
                draw += duel[0].draw
                loss += duel[0].win2
            } else if (duel[0].team2.id === manager.id) {
                win += duel[0].win2
                draw += duel[0].draw
                loss += duel[0].win1
            }
            return "Хожил: " + win.toString() + " - Тэнцээ: " + draw.toString() + " - Хожил: " + loss.toString() 
        }
        return null
    }

    function getMatches() {
        return matches.filter(x => (x.home_team.id === team1.id && x.away_team.id === team2.id) || (x.home_team.id === team2.id && x.away_team.id === team1.id))
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

    function handleChange1(value) {
        setTeam1(managers.find(x => x.id === value))
    }

    function handleChange2(value) {
        setTeam2(managers.find(x => x.id === value))
    }

    return (
        <div>
            { matches && duels && managers ? (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Нүүр</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Харьцуулалт
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ margin: '16px 0' }}>
                    <strong>Баг 1: </strong>
                    <Select defaultValue={0} onChange={handleChange1} style={{ width: '200px' }}>
                        <Select.Option value={0}>----------</Select.Option>
                        {managers.map(manager => {
                            return (
                                <Select.Option value={manager.id}>{manager.name}</Select.Option>
                            )
                        })}
                    </Select>
                    <strong> Баг 2: </strong>
                    <Select defaultValue={0} onChange={handleChange2} style={{ width: '200px' }}>
                        <Select.Option value={0}>----------</Select.Option>
                        {managers.map(manager => {
                            return (
                                <Select.Option value={manager.id}>{manager.name}</Select.Option>
                            )
                        })}
                    </Select>
                    </div>
                    { team1 && team2 ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card 
                                size="small"
                                style={{ width: '500px' }}
                                title={
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <a href={`/managers/${team1.id}`}>{team1.name}</a>
                                        </div>             
                                        <div>                                    
                                            {getDuel(team1, team2)}
                                        </div>                           
                                        <div>
                                            <a href={`/managers/${team2.id}`}>{team2.name}</a>
                                        </div>
                                    </div>                                    
                                }                                
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between'  }}>                                    
                                    <div>
                                        <strong>{getWins(team1, 0)}</strong>
                                    </div>
                                    <div>
                                        Хожил
                                    </div>
                                    <div>
                                        <strong>{getWins(team2, 0)}</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'  }}>                                    
                                    <div>
                                        <strong>{getDraws(team1, 0)}</strong>
                                    </div>
                                    <div>
                                        Тэнцээ
                                    </div>
                                    <div>
                                        <strong>{getDraws(team2, 0)}</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>                                    
                                    <div>
                                        <strong>{getLosses(team1, 0)}</strong>
                                    </div>
                                    <div>
                                        Хожигдол
                                    </div>
                                    <div>
                                        <strong>{getLosses(team2, 0)}</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>                                    
                                    <div>
                                        <strong>{getMatchWinRate(team1, 0)}%</strong>
                                    </div>
                                    <div>
                                        Хожлын хувь
                                    </div>
                                    <div>
                                        <strong>{getMatchWinRate(team2, 0)}%</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>                                    
                                    <div>
                                        <strong>{getPoints(team1, 0)}</strong>
                                    </div>
                                    <div>
                                        Оноо
                                    </div>
                                    <div>
                                        <strong>{getPoints(team2, 0)}</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>                                    
                                    <div>
                                        <strong>{getScore(team1, 0)}</strong>
                                    </div>
                                    <div>
                                        +
                                    </div>
                                    <div>
                                        <strong>{getScore(team2, 0)}</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>                                    
                                    <div>
                                        <strong>{getScoreAway(team1, 0)}</strong>
                                    </div>
                                    <div>
                                        -
                                    </div>
                                    <div>
                                        <strong>{getScoreAway(team2, 0)}</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>                                    
                                    <div>
                                        <strong>{getAverageMatchScore(team1, 0)}</strong>
                                    </div>
                                    <div>
                                        + (Дундаж)
                                    </div>
                                    <div>
                                        <strong>{getAverageMatchScore(team2, 0)}</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>                                    
                                    <div>
                                        <strong>{getAverageMatchScoreAway(team1, 0)}</strong>
                                    </div>
                                    <div>
                                        - (Дундаж)
                                    </div>
                                    <div>
                                        <strong>{getAverageMatchScoreAway(team2, 0)}</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>                                    
                                    <div>
                                        <strong>{getTopScorer(team1, 0)}</strong>
                                    </div>
                                    <div>
                                        Мэргэн бууч
                                    </div>
                                    <div>
                                        <strong>{getTopScorer(team2, 0)}</strong>
                                    </div>
                                </div>                               
                                {getMatches().length === 0 ?
                                    <div>Мэдээлэл байхгүй.</div>
                                :
                                    <div>                                
                                        <Typography.Text>Өмнөх учраанууд:</Typography.Text>
                                        {getMatches().map(match => {
                                            return (
                                                <div>
                                                    <Row gutter={8} style={{ width: '100%', height: '100%', margin: '4px 0' }}>
                                                        <Col span={8} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>                                            
                                                            <div>
                                                                { match.home_score > match.away_score ?
                                                                    <Avatar size={24} style={{ color: '#fff', backgroundColor: '#87d068', fontSize: '12px' }}>W</Avatar>                                                
                                                                : match.home_score < match.away_score ?
                                                                    <Avatar size={24} style={{ color: '#f56a00', backgroundColor: '#fde3cf', fontSize: '12px' }}>L</Avatar>
                                                                :
                                                                    <Avatar size={24} style={{ fontSize: '12px' }}>D</Avatar>
                                                                }                                                
                                                            </div>
                                                            <div>
                                                                {match.home_team.name}
                                                            </div>                                            
                                                        </Col>
                                                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>                                        
                                                            <Typography.Text>{match.home_score} - {match.away_score}</Typography.Text>
                                                        </Col>
                                                        <Col span={8} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                                                                                                                                    
                                                            <div>
                                                                {match.away_team.name}
                                                            </div>
                                                            <div>
                                                                { match.home_score < match.away_score ?
                                                                    <Avatar size={24}  style={{ color: '#fff', backgroundColor: '#87d068', fontSize: '12px' }}>W</Avatar>                                                
                                                                : match.home_score > match.away_score ?
                                                                    <Avatar size={24}  style={{ color: '#f56a00', backgroundColor: '#fde3cf', fontSize: '12px' }}>L</Avatar>
                                                                :
                                                                    <Avatar size={24} style={{ fontSize: '12px' }}>D</Avatar>
                                                                }                                                
                                                            </div>
                                                        </Col>
                                                    </Row>                                                
                                                </div>
                                            )
                                        })}                                
                                    </div>
                                }   
                            </Card>       
                        </div> 
                    ) : (
                        <></>
                    )}                                
                </div>
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}
        </div>
    )
}

export default DuelCompare;