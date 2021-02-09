import { Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const columns = [
    {
        title: 'Жил',
        dataIndex: 'year',
    },
    {
        title: 'Улирал',
        dataIndex: 'number',
    },
    {
        title: 'Лиг',
        dataIndex: 'level',
    },
    {
        title: 'Байр',
        dataIndex: 'rank',
    },    
    {
        title: 'Хожил',
        dataIndex: 'wins',
        responsive: ['sm'],
    },
    {
        title: 'Тэнцээ',
        dataIndex: 'draws',
        responsive: ['sm'],
    },
    {
        title: 'Хожигдол',
        dataIndex: 'losses',
        responsive: ['sm'],
    },    
    {
        title: '+',
        dataIndex: 'score',
        responsive: ['sm'],
    },
    {
        title: '-',
        dataIndex: 'score_away',
        responsive: ['sm'],
    },
    {
        title: 'Оноо',
        dataIndex: 'points',  
    },
    {
        title: 'МБууч',
        dataIndex: 'topscorer',
        responsive: ['sm'],
    },
    {
        title: 'МБууч-н эсрэг',
        dataIndex: 'topscorer_away',
        responsive: ['sm'],
    },
    {
        title: 'Баг',
        dataIndex: 'name',  
        responsive: ['sm'],
    },
];

const CareerTable = (props) => {
    
    const [data, setData] = useState();       
    
    useEffect(() => {    
        setData(props.data)                       
    }, [props.data])

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <>
            { data ? (
                <div>
                    <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} />
                </div>
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}      
        </>  
    );
};

export default CareerTable;