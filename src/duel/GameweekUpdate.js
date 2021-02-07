import React, { useEffect, useState } from "react";
import { Form, Button, Typography, message, Result, InputNumber } from 'antd';
import axios from 'axios';
import { connect } from "react-redux";
import api from '../api';

function GameweekUpdate (props) {    
    const [form] = Form.useForm()    
    const [gameweek, setGameweek] = useState();    

    useEffect(() => {
        if (props.match.params.weekID) {
            var id = props.match.params.weekID;
            var url = api.gameweeks + "/" + id + "/";
            axios({
                method: 'GET',
                url: url
            }).then(res => {        
                console.log(res.data);        
                setGameweek(res.data);
            }).catch(err => {
                console.log(err.message)
            })
        }
    }, [props.match.params.weekID])

    const onFinish = values => {         
        let week = gameweek            
        for (const [key, value] of Object.entries(values)) {
            let match = key.toString().split("|");            
            if (match[1] === "home_score") {
                week.matches.find(x => x.id === parseInt(match[0])).home_score = parseInt(value)
            } else if (match[1] === "away_score") {
                week.matches.find(x => x.id === parseInt(match[0])).away_score = parseInt(value)
            }            
        }                  
        axios({
            method: 'PUT',
            url: `${api.gameweeks}/${gameweek.id}/`,
            data: week                
        })            
        .then(res => {
            console.log(res)
            message.info(res.statusText)                
        })
        .catch(err => {                
            console.log(err)
            message.info(err)
        })  
    };

    const onReset = () => {
        form.resetFields();
    }

    return (
        <div>    
            {gameweek && props.token && props.token !== null ? (
                <>
                    <Typography.Title level={3} style={{ textAlign: 'center' }}>
                        {gameweek.name} засах                   
                    </Typography.Title>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Form                                
                            form={form}                                
                            name="gameweekform"        
                            layout="horizontal"      
                            style={{ width: '500px', border: '1px solid #ddd', padding: '16px', background: '#fff' }}            
                            onFinish={onFinish}                              
                        >
                        {gameweek.matches.map(match => {
                            return (
                                <div style={{ display: 'flex', justifyContent: 'space-around' }} key={match.id}>
                                    <div>
                                        <strong>{match.home_team.name}</strong>
                                        <Form.Item                    
                                            name={`${match.id}|home_score`}                                                                                                                                                                 
                                        >
                                            <InputNumber defaultValue={match.home_score}/>
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <br></br>
                                        <p>vs</p>
                                    </div>
                                    <div>
                                        <strong>{match.away_team.name}</strong>
                                        <Form.Item                    
                                            name={`${match.id}|away_score`}                                                                                                                                                                
                                        >
                                            <InputNumber defaultValue={match.away_score} />
                                        </Form.Item>
                                    </div>                                    
                                </div>
                            )
                        })}
                            <Form.Item>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                                        Хадгалах
                                    </Button>
                                    <Button type="ghost" onClick={onReset} style={{ marginRight: '8px' }}>
                                        Арилгах
                                    </Button>
                                </div>                                        
                            </Form.Item>
                        </Form> 
                    </div>                                                             
                </>
            ) : (
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary" href="/">Back Home</Button>}
                />
            )}                                                           
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(GameweekUpdate);