import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import { Card, Col, Row, Spin, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

const Duel = (props) => {    
    const [matches, setMatches] = useState();    

    useEffect(() => {      
        axios({
            method: 'GET',
            url: `${api.matches}`
        }).then(res => {                                                 
            setMatches(res.data)
        }).catch(err => {
            console.log(err.message)
        });                                   
    }, []); 

    function getMatches() {
        return matches.filter(x => (x.home_score > 0 && x.away_score > 0) && ((x.home_team.id === props.manager.id && x.away_team.id === props.opponent.id) || (x.home_team.id === props.opponent.id && x.away_team.id === props.manager.id)))
    }    

    return (
        <div>
            { matches ? (
                <div>
                    <Card 
                        size="small"
                        title={<a href={`/managers/${props.opponent.id}`}>{props.opponent.name}</a>}
                        extra={props.title} 
                    >
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
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}
        </div>
    )
}

export default Duel;