import { Breadcrumb, Spin, Avatar, Typography, Row, Col, Statistic, Radio } from 'antd';
import { FlagOutlined, FrownOutlined, MehOutlined, MinusOutlined, PlusOutlined, ProjectOutlined, SmileOutlined, TrophyOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import CareerTable from '../components/CareerTable';
import DuelInfo from '../duel/DuelInfo';

const ManagerDetail = (props) => {

    const [manager, setManager] = useState();    
    const [level, setLevel] = useState(0);
    const [leagues, setLeagues] = useState();    

    useEffect(() => {
        const id = props.match.params.itemID;
        axios({
            method: 'GET',
            url: `${api.managers}/${id}`
        }).then(res => {                        
            setManager(res.data)                 
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
    }, [props.match])        

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

    function getTeams() {
        let teams = []
        let list = level === 0 ? leagues : leagues.filter(x => x.level === level)
        list.forEach(league => {
            let team = league.table.teams.find(x => x.manager.id === manager.id)      
            if (team) { 
                let data = {
                    id: team.id,
                    name: team.name,
                    rank: team.rank,
                    points: team.points,
                    score: team.score,
                    score_away: team.score_away,
                    topscorer: team.topscorer,
                    topscorer_away: team.topscorer_away,                    
                    wins: team.wins,
                    draws: team.draws,
                    losses: team.losses,
                    year: league.year,
                    number: league.number
                }     
                if (league.level === 1) {
                    data.level = "Дээд"
                } else if (league.level === 2) {
                    data.level = "Чэмпионшип"
                }
                teams.push(data)
            }            
        });
        return teams;
    }

    function onChangeLevel(e) {        
        setLevel(e.target.value)
    }

    return (
        <div>
            { manager && leagues ? (            
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Нүүр хуудас</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/managers">Менежер</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {manager.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ margin: '16px 0', padding: '16px', backgroundColor: '#fff' }}>    
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} style={{ textAlign: 'end' }}>                            
                            <Avatar shape="square" size={180} src={<img src={manager.image} alt="teamlogo" style={{ height: '100%', width: 'auto' }} />} />                    
                        </Col>
                        <Col xs={24} sm={12}>
                            {/* <Typography.Title level={3} style={{ margin: 0 }}>Менежер</Typography.Title>      */}
                            <Typography.Title level={2} style={{ margin: 0 }}>{manager.name}</Typography.Title>                           
                            <Typography.Title level={5} style={{ marginBottom: 0 }}>Түрүү - {getChampion(manager, level)}</Typography.Title>
                            <Typography.Title level={5} style={{ margin: 0 }}>Үзүүр - {getRunnerup(manager, level)}</Typography.Title>          
                            <Typography.Title level={5} style={{ margin: 0 }}>3-р байр - {getThird(manager, level)}</Typography.Title>                     
                            <Typography.Title level={5} style={{ margin: 0 }}>Мэргэн бууч - {getTopScorer(manager, level)}</Typography.Title>     
                            <Typography.Title level={5} style={{ margin: 0 }}>Ванга - {getVanga(manager, level)}</Typography.Title>                                
                        </Col>                    
                    </Row>           
                    <div style={{ margin: '16px' }}>
                        <Radio.Group onChange={onChangeLevel} defaultValue={level}>
                            <Radio.Button value={1}>Дээд</Radio.Button>
                            <Radio.Button value={2}>Чэмпионшип</Radio.Button>
                            <Radio.Button value={0}>Нийт</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Row gutter={16} style={{ margin: '8px' }}>
                        <Col xs={24} sm={24} md={12}>
                            <Row>
                                <Col span={6} style={{ border: '1px solid #f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                                    <TrophyOutlined style={{ fontSize: '24px' }} />   
                                </Col>
                                <Col span={6} style={{ border: '1px solid #f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                                    <PlusOutlined style={{ fontSize: '24px' }} />    
                                </Col>
                                <Col span={6} style={{ border: '1px solid #f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                                    <MinusOutlined style={{ fontSize: '24px' }} />    
                                </Col>
                                <Col span={6} style={{ border: '1px solid #f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                                    <ProjectOutlined style={{ fontSize: '24px' }} />    
                                </Col>                                                
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Түрүү" value={getChampion(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>                                                
                                    <Statistic title="Нийт +" value={getScore(manager, level)} />
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>                                                
                                    <Statistic title="Нийт -" value={getScoreAway(manager, level)} />
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>                                                
                                    <Statistic title="Нийт оноо" value={getPoints(manager, level)} />  
                                </Col>                                   
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Дэд байр" value={getRunnerup(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>                                                
                                    <Statistic title="+ (1 Лигт)" value={getAverageScore(manager, level)} />
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>                                                
                                    <Statistic title="- (1 Лигт)" value={getAverageScoreAway(manager, level)} />
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>                                                
                                    <Statistic title="Оноо (1 Лигт)" value={getAveragePoints(manager, level)} />  
                                </Col>                        
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Гутгаар байр" value={getThird(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>                                                
                                    <Statistic title="+ (1 тоглолтод)" value={getAverageMatchScore(manager, level)} />
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>                                                
                                    <Statistic title="- (1 тоглолтод)" value={getAverageMatchScoreAway(manager, level)} />
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>                                                
                                    <Statistic title="Оноо (1 тоглолтод)" value={getAverageMatchPoints(manager, level)} />  
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <Row>
                                <Col span={6} style={{ border: '1px solid #f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                                    <FlagOutlined style={{ fontSize: '24px' }} />    
                                </Col>
                                <Col span={6} style={{ border: '1px solid #f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                                    <SmileOutlined style={{ fontSize: '24px' }} />    
                                </Col>
                                <Col span={6} style={{ border: '1px solid #f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                                    <MehOutlined style={{ fontSize: '24px' }} />    
                                </Col>
                                <Col span={6} style={{ border: '1px solid #f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                                    <FrownOutlined style={{ fontSize: '24px' }} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Мэргэн бууч" value={getTopScorer(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Нийт хожил" value={getWins(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Нийт тэнцээ" value={getDraws(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Нийт хожигдол" value={getLosses(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="МБ-н эсрэг" value={getTopScorerAway(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Дундаж хожил" value={getAverageWins(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Дундаж тэнцээ" value={getAverageDraws(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Дундаж хожигдол" value={getAverageLosses(manager, level)} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="МБ хувь" value={`${getMatchTopScorerRate(manager, level)}%`} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Хожлын хувь" value={`${getMatchWinRate(manager, level)}%`} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Тэнцээний хувь" value={`${getMatchDrawRate(manager, level)}%`} />    
                                </Col>
                                <Col span={6} style={{ textAlign: 'center', border: '1px solid #f1f1f1' }}>
                                    <Statistic title="Хожигдлын хувь" value={`${getMatchLossRate(manager, level)}%`} />    
                                </Col>
                            </Row>
                        </Col>                                                  
                    </Row>                   
                    <div style={{ margin: '16px' }}>
                        <Typography.Title level={4}>Түүх</Typography.Title>
                        <CareerTable data={getTeams()} />
                    </div>
                    <div style={{ margin: '16px' }}>
                        <Typography.Title level={4}>Өрсөлдөгчид</Typography.Title>
                        <DuelInfo manager={manager} />
                    </div>
                </div>
            </div>
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default ManagerDetail;