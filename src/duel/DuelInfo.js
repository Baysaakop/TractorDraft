import React, { useEffect, useState } from 'react';
import Duel from './Duel';
import axios from 'axios';
import api from '../api';
import { Spin, List } from 'antd';

const DuelInfo = (props) => {

    const [managers, setManagers] = useState();        
    const [duels, setDuels] = useState();    

    useEffect(() => {      
        axios({
            method: 'GET',
            url: `${api.managers}`
        }).then(res => {                                                 
            setManagers(res.data)
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
    }, []);    

    function getOpponents() {
        let result = []
        managers.forEach(element => {            
            let duel = getDuel(props.manager, element)
            if (duel !== null) {      
                let item = { manager: element, title: duel }          
                result.push(item)
            }            
        });
        return result
    }
    
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
            return win.toString() + "W - " + draw.toString() + "D - " + loss.toString() + "L"
        }
        return null
    }

    return (
        <div>
            { managers && duels ? (
                <div>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 3,
                            xl: 3,
                            xxl: 3,
                        }}
                        pagination={{
                            pageSize: 3,
                            size: 'small'
                        }}
                        dataSource={getOpponents()}
                        renderItem={item => (
                            <List.Item>
                                <Duel manager={props.manager} opponent={item.manager} title={item.title} />
                            </List.Item>                          
                        )}
                    />                     
                </div>
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}
        </div>
    )
}

export default DuelInfo;