import { Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const columns = [
    {
        title: 'Байр',
        dataIndex: 'rank',
    },
    {
        title: 'Баг',
        dataIndex: 'manager',        
        render: item => <img src={item.image} alt="teamlogo" style={{ width: 'auto', height: '24px' }} />
    },    
    {
        title: 'Менежер',
        dataIndex: 'manager',        
        render: item => 
        <a href={`/managers/${item.id}`}>                        
            {` ${item.name}`}
        </a>     
    },
    {
        title: 'Тоо',
        dataIndex: 'number',        
    },
];

const StatsTable = (props) => {

    const [data, setData] = useState();       
    
    useEffect(() => {    
        console.log(props.data)
        setData(props.data)                       
    }, [props.data])

    return (        
        <div>
            { data ? (
                <div>
                    <Table columns={columns} dataSource={data} size="small" pagination={{ pageSize: 5, }} showHeader={false} />
                </div>
            ) : (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>
            )}      
        </div>
    )
}

export default StatsTable