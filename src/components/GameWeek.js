import { Col, Row, Select, Spin, List, Typography, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import { connect } from 'react-redux';

const GameWeek = (props) => {
    
    const [league, setLeague] = useState();    
    const [gameweek, setGameweek] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        setLeague(undefined)
        axios({
            method: 'GET',
            url: `${api.leagues}/${props.id}/`
        }).then(res => {           
            let l = res.data     
            setLeague(l)             
            setGameweek(l.gameweeks[l.gameweeks.length - 1])            
        }).catch(err => {
            console.log(err.message)
        });
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(response => {            
            setUser(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [props.id, props.token])

    function handleChange(value) {
        console.log(value)   
        setGameweek(league.gameweeks.find(x => x.id === value))     
    }

    return (
        <>
            { league ? (
                <div>                             
                    <strong>Тойрог сонгох: </strong>
                    <Select defaultValue={league.gameweeks[league.gameweeks.length - 1].id} style={{ marginBottom: '16px' }} onChange={handleChange}>
                        {league.gameweeks.map(gm => {
                            return (
                                <Select.Option value={gm.id}>{gm.name}</Select.Option>
                            )
                        })}
                    </Select>     
                    { gameweek ? (
                        <List 
                            header={
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div><strong>Үр дүн:</strong></div>
                                    <div>
                                        {user && user.profile.role === "1" ? (
                                            <a href={`/updategameweek/${gameweek.id}`}>Засах</a>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            }
                            footer={
                                <div>
                                    <strong>Тайлбар:</strong>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                        <div>
                                            <Avatar style={{ color: '#fff', backgroundColor: '#87d068' }}>W</Avatar> - Хожил 
                                        </div>
                                        <div>
                                            <Avatar>D</Avatar> - Тэнцээ 
                                        </div>
                                        <div>
                                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>L</Avatar> - Хожигдол 
                                        </div>
                                    </div>
                                </div>
                            }
                            bordered
                            style={{ backgroundColor: '#fff' }}
                            dataSource={gameweek.matches}
                            renderItem={match => (
                                <List.Item>
                                    <Row gutter={[16, 16]} style={{ width: '100%', height: '100%', margin: '0' }}>
                                        <Col span={8} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                                            
                                            <div>
                                                { match.home_score > match.away_score ?
                                                    <Avatar style={{ color: '#fff', backgroundColor: '#87d068' }}>W</Avatar>                                                
                                                : match.home_score < match.away_score ?
                                                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>L</Avatar>
                                                :
                                                    <Avatar>D</Avatar>
                                                }                                                
                                            </div>
                                            <div>
                                                <a href={`/managers/${match.home_team.id}`}>{match.home_team.name}</a>
                                            </div>                                            
                                        </Col>
                                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>                                        
                                            <Typography.Text>{match.home_score} - {match.away_score}</Typography.Text>
                                        </Col>
                                        <Col span={8} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                                                                                                                                    
                                            <div>
                                                <a href={`/managers/${match.away_team.id}`}>{match.away_team.name}</a>
                                            </div>
                                            <div>
                                                { match.home_score < match.away_score ?
                                                    <Avatar style={{ color: '#fff', backgroundColor: '#87d068' }}>W</Avatar>                                                
                                                : match.home_score > match.away_score ?
                                                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>L</Avatar>
                                                :
                                                    <Avatar>D</Avatar>
                                                }                                                
                                            </div>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        /> 
                    ) : (
                        <></>
                    )}                             
                </div>
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}      
        </>  
    );
};

const mapStateToProps = state => {
    return {                
        token: state.token
    }
}

export default connect(mapStateToProps)(GameWeek);