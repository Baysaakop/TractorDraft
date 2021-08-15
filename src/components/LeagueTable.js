import { Spin, Table, Tag, Tooltip } from 'antd';
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
        title: <Tag color="green">W</Tag>,
        dataIndex: 'wins',
        key: 'wins',
        sorter: {
            compare: (a, b) => b.wins - a.wins,
        },
        
    },
    {
        title: <Tag color="warning">D</Tag>,
        dataIndex: 'draws',
        key: 'draws',
        sorter: {
            compare: (a, b) => b.draws - a.draws,
        },
        responsive: ['md'],
    },
    {
        title: <Tag color="red">L</Tag>,
        dataIndex: 'losses',
        key: 'losses',
        sorter: {
            compare: (a, b) => b.losses - a.losses,
        },
        responsive: ['md'],
    },   
    {
        title: 'Оноо',
        dataIndex: 'points',
        key: 'points',
        sorter: {
            compare: (a, b) => b.points - a.points,
        },        
    },         
    {
        title: '+',
        dataIndex: 'score',
        key: 'score',
        sorter: {
            compare: (a, b) => b.score - a.score,            
        },
        responsive: ['md'],
    },
    {
        title: '-',
        dataIndex: 'score_away',
        key: 'score_away',
        sorter: {
            compare: (a, b) => b.score_away - a.score_away,            
        },
        responsive: ['md'],
    },    
    {
        title: <Tooltip title="Мэргэн бууч">МБ</Tooltip>,
        dataIndex: 'topscorer',
        key: 'topscorer',
        sorter: {
            compare: (a, b) => b.topscorer - a.topscorer,            
        },
        responsive: ['md'],
    },
    {
        title: 'МБЗ',
        dataIndex: 'topscorer_away',
        key: 'topscorer_away',
        sorter: {
            compare: (a, b) => b.topscorer_away - a.topscorer_away,            
        },
        responsive: ['md'],
    },
    {
        title: 'В',
        dataIndex: 'vanga',
        key: 'vanga',
        sorter: {
            compare: (a, b) => b.vanga - a.vanga,            
        },
        responsive: ['md'],
    },
];

const LeagueTable = (props) => {
    
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
                    />
                    <div style={{ backgroundColor: '#fff', padding: '16px' }}>
                        <strong>Тайлбар:</strong>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                            <div>
                                <Tag color='green'>1-3</Tag> Шагналт байр        
                            </div>
                            <div>
                                <Tag color='geekblue'>4-7</Tag> Аюулгүй бүс        
                            </div>
                            <div>
                                <Tag color='volcano'>8-10</Tag> Унах бүс         
                            </div>
                            <div>
                                <Tag color='green'>W</Tag> Хожил      
                            </div>
                            <div>
                                <Tag color='warning'>D</Tag> Тэнцээ       
                            </div>
                            <div>
                                <Tag color='red'>L</Tag> Хожигдол         
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                            <div>
                                <Tag>Оноо</Tag> Хожлын оноо        
                            </div>
                            <div>
                                <Tag>+</Tag> Авсан оноо         
                            </div>
                            <div>
                                <Tag>-</Tag> Алдсан оноо        
                            </div>                           
                            <div>
                                <Tag>МБ</Tag> Мэргэн бууч         
                            </div>
                            <div>
                                <Tag>МБЗ</Tag> Мэргэн буучийн золиос         
                            </div>
                            <div>
                                <Tag>В</Tag> Ванга        
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

export default LeagueTable;