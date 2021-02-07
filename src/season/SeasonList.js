import { Breadcrumb, Col, Radio, Row, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import GameWeek from '../components/GameWeek';
import LeagueTable from '../components/LeagueTable';
import axios from 'axios';
import api from '../api';

const SeasonList = (props) => {

    const [leagues, setLeagues] = useState();
    const [leagueID, setLeagueID] = useState(5);
    const [level, setLevel] = useState(1);

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
    }, [level])    

    function handleChange(value) {
        setLeagueID(value)
    }

    function onChangeLeague(e) {
        // console.log(e.target.value)
        setLevel(e.target.value)
    }

    return (
        <div>
            { leagues ? (            
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Нүүр</a>
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
                                    <strong>Улирал сонгох: </strong>
                                    <Select defaultValue={leagueID} onChange={handleChange}>
                                        {leagues.map(league => {
                                            return (
                                                <Select.Option value={league.id}>{league.year} оны {league.number}-р улирал</Select.Option>
                                            )
                                        })}
                                    </Select>
                                </div>
                                <div>
                                    <Radio.Group onChange={onChangeLeague} defaultValue={level}>
                                        <Radio.Button value={1}>Дээд</Radio.Button>
                                        <Radio.Button value={2}>Чэмпионшип</Radio.Button>                                        
                                    </Radio.Group>
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

export default SeasonList;