import { Spin, List, Typography, Row, Col, Avatar } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../api"

function ManagerResults(props) {

    const [matches, setMatches] = useState()

    useEffect(() => {        
        getManager(props.manager)
    }, [props.manager]) // eslint-disable-line no-use-before-define

    function getManager (manager) {
        let url = api.matches + "?manager=" + props.manager.id
        axios({
            method: 'GET',
            url: url,
        })
        .then(res => {            
            setMatches(res.data)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    return (
        !matches ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin />
            </div>
        ) : (
            <div>
                <List                    
                    itemLayout="horizontal"
                    size="small"
                    pagination={{ 
                        pageSize: 9,
                        size: 'small',
                        showSizeChanger: false,
                    }}
                    dataSource={matches}
                    renderItem={match => (
                        <List.Item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Row gutter={8} style={{ width: '400px' }}>
                                <Col span={8}>                                            
                                    <Typography.Text>{match.home_team.id === props.manager.id ? match.home_team.name : match.away_team.name}</Typography.Text>                                           
                                </Col>
                                <Col span={6} style={{ textAlign: 'center' }}>                                        
                                    <Typography.Text>{match.home_team.id === props.manager.id ? match.home_score : match.away_score} - {match.home_team.id === props.manager.id ? match.away_score : match.home_score}</Typography.Text>
                                </Col>
                                <Col span={8} style={{ textAlign: 'end' }}>                                                                                                                                    
                                    <Typography.Text>{match.home_team.id === props.manager.id ? match.away_team.name : match.home_team.name}</Typography.Text>                                                                               
                                </Col>
                                <Col span={2}>
                                    <div>
                                        {
                                            match.home_team.id === props.manager.id ? (
                                                match.home_score > match.away_score ? (
                                                    <Avatar size={24}  style={{ color: '#fff', backgroundColor: '#87d068', fontSize: '12px' }}>W</Avatar>    
                                                ) : match.home_score < match.away_score ? (
                                                    <Avatar size={24}  style={{ color: '#f56a00', backgroundColor: '#fde3cf', fontSize: '12px' }}>L</Avatar>
                                                ) : (
                                                    <Avatar size={24} style={{ fontSize: '12px' }}>D</Avatar>
                                                )
                                            ) : (
                                                match.home_score < match.away_score ? (
                                                    <Avatar size={24}  style={{ color: '#fff', backgroundColor: '#87d068', fontSize: '12px' }}>W</Avatar>    
                                                ) : match.home_score > match.away_score ? (
                                                    <Avatar size={24}  style={{ color: '#f56a00', backgroundColor: '#fde3cf', fontSize: '12px' }}>L</Avatar>
                                                ) : (
                                                    <Avatar size={24} style={{ fontSize: '12px' }}>D</Avatar>
                                                )
                                            )
                                        }                                                                                       
                                    </div>
                                </Col>    
                            </Row>                                                                     
                        </List.Item>
                    )}
                />                
            </div>
        )
    )
}

export default ManagerResults