import { Spin, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';

const columns = [
    {
        title: 'Байр',
        dataIndex: 'rank',
        key: 'rank',
        responsive: ['md'],    
        sorter: {
            compare: (a, b) => a.rank - b.rank,
        },
        render: item => <Tag color={item < 4 ? 'green' : item < 8 ? 'geekblue' : 'volcano'}>{item}</Tag>            
    },
    {
        title: 'Менежер',
        dataIndex: 'manager',
        key: 'manager',
        render: item => <a href={`/managers/${item.id}`}>{item.name}</a>
    },    
    {
        title: 'Оноо',
        dataIndex: 'points',
        key: 'points',
        sorter: {
            compare: (a, b) => b.points - a.points,
        },        
    },
];

const LeagueTableMini = (props) => {
    
    const [league, setLeague] = useState();       
    
    useEffect(() => {    
        // GET TABLE
        setLeague(undefined)
        axios({
            method: 'GET',
            url: `${api.leagues}/${props.id}/`
        }).then(res => { 
            setLeague(res.data)                 
        }).catch(err => {
            console.log(err.message)
        });                       
    }, [props.id])

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <>
            { league ? (
                <div>
                    <Table 
                        columns={columns} 
                        dataSource={league.table.teams.sort((a, b) => a.rank - b.rank)} 
                        onChange={onChange} 
                        pagination={false} 
                        size="middle"
                    />
                    <div style={{ backgroundColor: '#fff', padding: '16px' }}>
                        <strong>Тайлбар:</strong>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                            <div>
                                <Tag color='green'>1-3</Tag>- Шагналт       
                            </div>
                            <div>
                                <Tag color='geekblue'>4-7</Tag>- Аюулгүй        
                            </div>
                            <div>
                                <Tag color='volcano'>8-10</Tag>- Унах        
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}      
        </>  
    );
};

export default LeagueTableMini;