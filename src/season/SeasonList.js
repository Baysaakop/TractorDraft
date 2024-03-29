import { Breadcrumb, Button, Col, message, Radio, Row, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import GameWeek from '../components/GameWeek';
import LeagueTable from '../components/LeagueTable';
import axios from 'axios';
import api from '../api';
import { connect } from 'react-redux';
import { CheckOutlined } from "@ant-design/icons"

const SeasonList = (props) => {

    const [leagues, setLeagues] = useState();
    const [leagueID, setLeagueID] = useState(10);
    const [level, setLevel] = useState(1);
    const [user, setUser] = useState();

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.leagues}`
        }).then(res => {             
            let allseason = res.data.filter(x => x.level === level)
            setLeagues(allseason)                        
            setLeagueID(allseason[allseason.length - 1].id)                                           
        }).catch(err => {
            console.log(err.message)
        });    
        if (props.token) {
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
        }
    }, [level, props.token])    

    function handleChange(value) {
        setLeagueID(value)
    }

    function onChangeLeague(e) {
        // console.log(e.target.value)
        setLevel(e.target.value)
    }

    function onFinish() {
        const url = api.leagues + "/" + leagueID + "/"
        axios({
            method: 'PUT',
            url: url,
            data: {
                'finish': true
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        })
        .then(res => {
            console.log(res.data)
            message.success("FINISHED")
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    return (
        <div>
            { leagues ? (            
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Нүүр хуудас</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Улирал
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ margin: '16px 0' }}>                     
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={16}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div>
                                    <Radio.Group onChange={onChangeLeague} defaultValue={level}>
                                        <Radio.Button value={1}>Дээд Лиг</Radio.Button>
                                        <Radio.Button value={2}>Пад Пад Лиг</Radio.Button>                                        
                                    </Radio.Group>
                                </div>
                                <div>
                                    <strong>Улирал сонгох: </strong>
                                    <Select defaultValue={leagueID} onChange={handleChange}>
                                        {leagues.map(league => {
                                            return (
                                                <Select.Option value={league.id}>{league.year} оны {league.number}-р улирал</Select.Option>
                                            )
                                        })}
                                    </Select>
                                    {user && user.profile.role === "1" ? (
                                        <Button type="primary" icon={<CheckOutlined />} style={{ marginLeft: '8px' }} onClick={onFinish}>Дуусгах</Button>
                                    ) : (
                                        <></>
                                    )}
                                </div>                                                                
                            </div>                            
                            <LeagueTable id={leagueID ? leagueID : leagues[leagues.length - 1].id} />
                        </Col>
                        <Col xs={24} sm={8}>
                            <GameWeek id={leagueID ? leagueID : leagues[leagues.length - 1].id} />
                        </Col>
                    </Row>                   
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

const mapStateToProps = state => {
    return {                
        token: state.token
    }
}

export default connect(mapStateToProps)(SeasonList);