import { Badge, Breadcrumb, Card, List, Radio, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import Avatar from 'antd/lib/avatar/avatar';
import { TrophyFilled, TrophyOutlined } from '@ant-design/icons';

const ManagerList = (props) => {
     
    const [managers, setManagers] = useState();    
    const [sortType, setSortType] = useState('champ');
    const [level, setLevel] = useState(0);

    useEffect(() => {
        getData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps        

    function getData() {
        axios({
            method: 'GET',
            url: `${api.managers}`
        }).then(res => {                                            
            setManagers(orderByChamp(res.data))
        }).catch(err => {
            console.log(err.message)
        })
    }

    function getChampion(manager) {
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

    function getRunnerup(manager) {
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

    function getPoints(manager) {
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

    function getWins(manager) {
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

    function getDraws(manager) {
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

    function getLosses(manager) {
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

    function getScore(manager) {
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

    function getScoreAway(manager) {
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

    function getTopScorer(manager) {
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

    function getTopScorerAway(manager) {
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

    function orderByChamp(data) {
        return data.sort((a, b) => getChampion(b) - getChampion(a))
    }

    function orderByRunnerup(data) {
        return data.sort((a, b) => getRunnerup(b) - getRunnerup(a))
    }

    function orderByPoints(data) {
        return data.sort((a, b) => getPoints(b) - getPoints(a))
    }

    function orderByScore(data) {
        return data.sort((a, b) => getScore(b) - getScore(a))
    }

    function orderByScoreAway(data) {
        return data.sort((a, b) => getScoreAway(b) - getScoreAway(a))
    }

    function orderByTopScorer(data) {
        return data.sort((a, b) => getTopScorer(b) - getTopScorer(a))
    }

    function orderByTopScorerAway(data) {
        return data.sort((a, b) => getTopScorerAway(b) - getTopScorerAway(a))
    }

    function orderByWin(data) {
        return data.sort((a, b) => getWins(b) - getWins(a))
    }

    function orderByDraw(data) {
        return data.sort((a, b) => getDraws(b) - getDraws(a))
    }

    function orderByLoss(data) {
        return data.sort((a, b) => getLosses(b) - getLosses(a))
    }

    function sortManagers(type) {                   
        switch(type) {
            case "champ":                
                setManagers(orderByChamp(managers))
                break;
            case "runnerup":                
                setManagers(orderByRunnerup(managers))    
                break;            
            case "points": 
                setManagers(orderByPoints(managers))
                break;
            case "score": 
                setManagers(orderByScore(managers))
                break;
            case "scoreaway": 
                setManagers(orderByScoreAway(managers))
                break;
            case "win": 
                setManagers(orderByWin(managers))
                break;
            case "draw": 
                setManagers(orderByDraw(managers))
                break;
            case "loss": 
                setManagers(orderByLoss(managers))
                break;
            case "topscorer": 
                setManagers(orderByTopScorer(managers))
                break;
            case "topscoreraway": 
                setManagers(orderByTopScorerAway(managers))
                break;
            default:
                setManagers(orderByChamp(managers))
                break;
        }  
    }

    function handleSort(value) {              
        setSortType(value)          
        sortManagers(value)               
    }      

    function onChangeLevel(e) {
        setLevel(e.target.value)
        setSortType('champ')
        sortManagers('champ')         
    }

    return (
        <div>
            { managers ? (                                    
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Нүүр хуудас</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Менежер
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Radio.Group onChange={onChangeLevel} defaultValue={0}>
                            <Radio.Button value={1}>Дээд</Radio.Button>
                            <Radio.Button value={2}>Чэмпионшип</Radio.Button>
                            <Radio.Button value={0}>Нийт</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div>
                        <strong>Эрэмбэлэх: </strong>
                        <Select defaultValue={sortType} style={{ width: 200 }} onChange={handleSort}>
                            <Select.Option value="none">---------</Select.Option>
                            <Select.Option value="champ">Түрүү</Select.Option>
                            <Select.Option value="runnerup">Үзүүр</Select.Option>
                            <Select.Option value="points">Оноо</Select.Option>
                            <Select.Option value="score">Авсан оноо</Select.Option>
                            <Select.Option value="scoreaway">Алдсан оноо</Select.Option>
                            <Select.Option value="win">Хожил</Select.Option>
                            <Select.Option value="draw">Тэнцээ</Select.Option>
                            <Select.Option value="loss">Хожигдол</Select.Option>
                            <Select.Option value="topscorer">Мэргэн бууч</Select.Option>
                            <Select.Option value="topscoreraway">МБ-н эсрэг</Select.Option>
                        </Select>
                    </div>                    
                </div>
                <div style={{ margin: '16px 0' }}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 5,
                            xxl: 6,
                        }}
                        dataSource={managers}
                        renderItem={item => (
                            <List.Item>
                                <a href={`/managers/${item.id}`}>
                                <Card 
                                    hoverable             
                                    size="small"                                                            
                                    title={
                                        <div>
                                            <Avatar shape="square" size={24} style={{ marginRight: '4px' }} src={<img src={item.image} alt="teamlogo" style={{ height: '100%', width: 'auto' }} />} />
                                            {item.name}
                                        </div>
                                    }
                                    extra={
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ marginRight: '8px' }}>
                                                <Badge count={getChampion(item)}>
                                                    <Avatar shape="square" icon={<TrophyFilled style={{ color: 'yellow' }} />} />
                                                </Badge>
                                            </div>
                                            <div>
                                                <Badge count={getRunnerup(item)}>
                                                    <Avatar shape="square" icon={<TrophyOutlined />} />
                                                </Badge>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{ border: '1px solid #cecece', borderRadius: '10px', padding: '4px' }}>Оноо: {getPoints(item)}</p>                                    
                                        <p style={{ border: '1px solid #cecece', borderRadius: '10px', padding: '4px' }}>Авсан: {getScore(item)}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{ border: '1px solid #cecece', borderRadius: '10px', padding: '4px' }}>Хожил: {getWins(item)}</p>                                        
                                        <p style={{ border: '1px solid #cecece', borderRadius: '10px', padding: '4px' }}>Алдсан: {getScoreAway(item)}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{ border: '1px solid #cecece', borderRadius: '10px', padding: '4px' }}>Тэнцээ: {getDraws(item)}</p>
                                        <p style={{ border: '1px solid #cecece', borderRadius: '10px', padding: '4px' }}>Мэргэн бууч: {getTopScorer(item)}</p>                                        
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{ border: '1px solid #cecece', borderRadius: '10px', padding: '4px' }}>Хожигдол: {getLosses(item)}</p>                                                                            
                                        <p style={{ border: '1px solid #cecece', borderRadius: '10px', padding: '4px' }}>МБ-н эсрэг: {getTopScorerAway(item)}</p>
                                    </div>
                                                                    
                                </Card>
                                </a>
                            </List.Item>
                        )}
                    />
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

export default ManagerList;