import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import { Breadcrumb, Spin, Table, Tag, Typography } from 'antd';

const columns = [    
    {
        title: 'Менежер',
        dataIndex: 'manager',
        key: 'manager',
        render: item => <a href={`/managers/${item.id}`}>{item.name}</a>
    },
    {
        title: 'Хожил',
        dataIndex: 'wins',
        key: 'wins',
        sorter: {
            compare: (a, b) => b.wins - a.wins,            
        },
        responsive: ['md'],
    },
    {
        title: 'Тэнцээ',
        dataIndex: 'draws',
        key: 'draws',
        sorter: {
            compare: (a, b) => b.draws - a.draws,            
        },
        responsive: ['md'],
    },
    {
        title: 'Хожигдол',
        dataIndex: 'losses',
        key: 'losses',
        sorter: {
            compare: (a, b) => b.losses - a.losses,            
        },
        responsive: ['md'],
    },    
    {
        title: '+',
        dataIndex: 'score',
        key: 'score',
        sorter: {
            compare: (a, b) => b.score - a.score,            
        },
        responsive: ['sm'],
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
        title: 'Улирал 1',
        dataIndex: 'league1',
        key: 'league1',
        sorter: {
            compare: (a, b) => a.league1 - b.league1,            
        },
        render: item => <Tag color={item === 0 ? 'white' : item < 3 ? 'green' : item < 9 ? 'geekblue' : 'volcano'}>{item}</Tag>        
    },
    {
        title: 'Улирал 2',
        dataIndex: 'league2',
        key: 'league2',
        sorter: {
            compare: (a, b) => a.league2 - b.league2,            
        },
        render: item => <Tag color={item === 0 ? 'white' : item < 3 ? 'green' : item < 9 ? 'geekblue' : 'volcano'}>{item}</Tag>        
    },
    {
        title: 'Улирал 3',
        dataIndex: 'league3',
        key: 'league3',
        sorter: {
            compare: (a, b) => a.league3 - b.league3,            
        },
        render: item => <Tag color={item === 0 ? 'white' : item < 3 ? 'green' : item < 9 ? 'geekblue' : 'volcano'}>{item}</Tag>        
    },
    {
        title: 'Улирал 4',
        dataIndex: 'league4',
        key: 'league4',
        sorter: {
            compare: (a, b) => a.league4 - b.league4,            
        },
        render: item => <Tag color={item === 0 ? 'white' : item < 3 ? 'green' : item < 9 ? 'geekblue' : 'volcano'}>{item}</Tag>        
    },
];

const Season19 = (props) => {

    const [season19, setSeason19] = useState();

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.league19}`
        }).then(res => {                    
            setSeason19(res.data)                                         
        }).catch(err => {
            console.log(err.message)
        });    
    }, [])    

    return (
        <div>
            { season19 ? (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Нүүр</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            19-20 оны Улирал
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ margin: '16px 0' }}>
                        <Typography.Title level={4}>2019-2020 оны улирал</Typography.Title>
                        <Table columns={columns} dataSource={season19[0].teams} pagination={false} />
                        <div style={{ backgroundColor: '#fff', padding: '16px' }}>
                            <strong>Тайлбар:</strong>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                <div>
                                    <Tag color='green'>1-2</Tag> - Шагналт байр        
                                </div>
                                <div>
                                    <Tag color='geekblue'>4-8</Tag> - Аюулгүй бүс        
                                </div>
                                <div>
                                    <Tag color='volcano'>9-10</Tag> - Унах бүс         
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}
        </div>
    )
}

export default Season19;