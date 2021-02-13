import { Button, Card, Col, Divider, Row, Typography, List, Radio, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import LeagueTableMini from '../components/LeagueTableMini';
import axios from 'axios';
import api from '../api';
import Avatar from 'antd/lib/avatar/avatar';

const { Paragraph } = Typography;

function Home (props) {    
    const [ellipsis, setEllipsis] = useState(true);
    const [posts, setPosts] = useState();
    const [leagues, setLeagues] = useState();
    const [managers, setManagers] = useState();    

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.posts}/`
        }).then(res => {            
            console.log(res.data)
            setPosts(res.data)
        }).catch(err => {
            console.log(err.message)
        })
        axios({
            method: 'GET',
            url: `${api.leagues}/`
        }).then(res => {                         
            setLeagues(res.data)                                                                        
        }).catch(err => {
            console.log(err.message)
        }); 
        axios({
            method: 'GET',
            url: `${api.managers}/`
        }).then(res => {                         
            setManagers(res.data)                                                                        
        }).catch(err => {
            console.log(err.message)
        });    
    }, [])  

    function getLastWeek() {
        let result;
        let gameweeks = leagues[leagues.length - 1].gameweeks;
        let lastweek;    
        gameweeks.forEach(week => {
            let matches = week.matches
            matches.forEach(match => {
                if (match.home_score === 0 && match.away_score === 0) {
                    if (!result) {
                        result = lastweek
                    }          
                }
            })
            lastweek = week
        })
        return result ? result : gameweeks[gameweeks.length - 1]
    }

    function getLastWeekTopScorers() {        
        let week = getLastWeek()                
        let list = []
        week.matches.forEach(match => {
            let item1 = {
                manager: match.home_team,
                score: match.home_score
            }
            let item2 = {
                manager: match.away_team,
                score: match.away_score
            }
            list.push(item1)
            list.push(item2)
        })
        return list.sort((a, b) => b.score - a.score).slice(0, 5)
    }

    function getSeasonTopWinners() {
        let list = []        
        managers.forEach(manager => {
            let wins = 0
            manager.career.forEach(career => {
                wins += career.total_win
            })
            let item = {
                manager: manager,
                wins: wins       
            }
            list.push(item)
        })        
        return list.sort((a, b) => b.wins - a.wins).slice(0, 5)
    }

    function getSeasonTopScorers() {
        let list = []        
        managers.forEach(manager => {
            let score = 0
            manager.career.forEach(career => {
                score += career.total_score
            })
            let item = {
                manager: manager,
                score: score       
            }
            list.push(item)
        })        
        return list.sort((a, b) => b.score - a.score).slice(0, 5)
    }

    function getDate(date) {
        let d = new Date(date);    
        return d.getFullYear().toString() + "/" + (d.getMonth() + 1).toString() + "/" + d.getDate();
    }

    function onChangeLevel(e) {
        console.log(e.target.value)     
    }

    return (
        <div>
            { posts && leagues && managers ? (
                <div>
                    <Row gutter={16}>
                        <Col sm={24} md={16}>
                            <a href={`/posts/${posts[0].id}`}>
                                <Card hoverable style={{ backgroundImage: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)" }}>
                                    <Row gutter={16} style={{ width: '100%' }}>                        
                                        <Col sm={24} md={12}>
                                            <img src={posts[0].thumbnail} alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
                                        </Col>
                                        <Col sm={24} md={12}>
                                            <Typography.Title level={2}>{posts[0].title}</Typography.Title>
                                            <Paragraph ellipsis={ellipsis ? { rows: 4, expandable: false, symbol: 'more' } : false}>                                                
                                                <div dangerouslySetInnerHTML={{__html: posts[0].content }} />
                                            </Paragraph>                                        
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                                                <strong>{getDate(posts[0].created_at)}</strong>
                                                <Button type="primary">Дэлгэрэнгүй</Button>
                                            </div>                        
                                        </Col>
                                    </Row>
                                </Card>
                            </a>
                            <a href={`/posts/${posts[1].id}`}>
                                <Card hoverable style={{ backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)", marginTop: '16px' }}>
                                    <Row gutter={16} style={{ width: '100%' }}>
                                        <Col sm={24} md={12}>
                                            <Typography.Title level={2}>{posts[1].title}</Typography.Title>
                                            <Paragraph ellipsis={ellipsis ? { rows: 4, expandable: false, symbol: 'more' } : false}>
                                                <div dangerouslySetInnerHTML={{__html: posts[1].content }} />
                                            </Paragraph>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                                                <strong>{getDate(posts[0].created_at)}</strong>
                                                <Button type="primary">Дэлгэрэнгүй</Button>
                                            </div>                        
                                        </Col>
                                        <Col sm={24} md={12}>
                                            <img src={posts[1].thumbnail} alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
                                        </Col>                        
                                    </Row>
                                </Card>
                            </a>
                        </Col>
                        <Col sm={24} md={8}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px' }}>
                                <Typography.Title level={4}>Лигийн хүснэгт:</Typography.Title>
                                <Radio.Group onChange={onChangeLevel} defaultValue={1}>
                                    <Radio.Button value={1}>Дээд</Radio.Button>
                                    <Radio.Button value={2} disabled>Чэмпионшип</Radio.Button>                            
                                </Radio.Group>
                            </div>
                            <LeagueTableMini id={leagues ? leagues[leagues.length - 1].id : 1} />
                        </Col>
                    </Row>
                    <div style={{ margin: '16px 0' }}>
                        <Typography.Title level={2}>Тойргийн мэргэн буучид</Typography.Title>
                        <Divider style={{ marginTop: '0px', marginBottom: '16px' }} />
                        <Row gutter={16}>
                            <Col sm={24} md={12}>
                                <Card hoverable title="Менежер 1 - 57 оноо" extra="Дээд лиг">
                                    <img src="https://resources.premierleague.com/premierleague/photo/2016/08/17/0c337304-1fba-4b00-a1e9-23d417b9367b/Manager-GW1.png" alt="motw" style={{ width: '100%', height: 'auto' }} />        
                                </Card>                        
                            </Col>
                            <Col sm={24} md={12}>
                                <Card hoverable title="Менежер 2 - 55 оноо" extra="Чэмпионшип">
                                    <img src="https://resources.premierleague.com/premierleague/photo/2016/08/23/07a9f156-0b98-4e7e-a5f5-d706539f1022/gw2-totw.png" alt="motw" style={{ width: '100%', height: 'auto' }} />        
                                </Card>                        
                            </Col>
                        </Row>         
                    </div>
                    <div style={{ margin: '16px 0' }}>
                        <Typography.Title level={2}>Тойргийн өндөр оноонууд</Typography.Title>
                        <Divider style={{ marginTop: '0px', marginBottom: '16px' }} />
                        <List
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 5,
                                xxl: 5,
                            }}
                            dataSource={getLastWeekTopScorers()}
                            renderItem={item => (
                                <List.Item>
                                    <Card hoverable title={item.manager.name} extra={<Avatar shape="square" src={item.manager.image} />}>
                                        <Typography.Title level={2}>{item.score}</Typography.Title>
                                    </Card>
                                </List.Item>
                            )}
                        />                
                    </div>            
                    <div style={{ margin: '16px 0' }}>
                        <Typography.Title level={2}>Улирлыг хожлоор тэргүүлэгчид</Typography.Title>
                        <Divider style={{ marginTop: '0px', marginBottom: '16px' }} />
                        <List
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 5,
                                xxl: 5,
                            }}
                            dataSource={getSeasonTopWinners()}
                            renderItem={item => (
                                <List.Item>
                                    <Card hoverable title={item.manager.name} extra={<Avatar shape="square" src={item.manager.image} />}>
                                        <Typography.Title level={2}>{item.wins}</Typography.Title>
                                    </Card>
                                </List.Item>
                            )}
                        />                
                    </div>
                    <div style={{ margin: '16px 0' }}>
                        <Typography.Title level={2}>Улирлыг оноогоор тэргүүлэгчид</Typography.Title>
                        <Divider style={{ marginTop: '0px', marginBottom: '16px' }} />
                        <List
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 5,
                                xxl: 5,
                            }}
                            dataSource={getSeasonTopScorers()}
                            renderItem={item => (
                                <List.Item>
                                    <Card hoverable title={item.manager.name} extra={<Avatar shape="square" src={item.manager.image} />}>
                                        <Typography.Title level={2}>{item.score}</Typography.Title>
                                    </Card>
                                </List.Item>
                            )}
                        />                
                    </div>
                </div>
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            ) }                        
        </div>
    )
}

export default Home;