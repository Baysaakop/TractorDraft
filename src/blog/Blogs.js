import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import { Space, Spin, List, Avatar, Typography, Button, Breadcrumb } from 'antd';
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const Blogs = (props) => {

    const [posts, setPosts] = useState();    

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.posts}/`
        }).then(res => {
            console.log(res.data)
            setPosts(res.data)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    return (
        <div>
            { posts ? (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Нүүр хуудас</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Нийтлэл
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: '8px', margin: '16px 0' }}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                pageSize: 3,
                            }}
                            dataSource={posts}
                            renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText icon={EyeOutlined} text="156" key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text="12" key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text="5" key="list-vertical-message" />                            
                                ]}
                                extra={
                                    <a href={`/posts/${posts[1].id}`}>
                                        <img
                                            width={350}
                                            alt="logo"
                                            src={item.thumbnail}
                                        />
                                    </a>
                                }                        
                            >
                                <List.Item.Meta                            
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={`/posts/${item.id}`}>{item.title}</a>}    
                                    description={<span>Нийтлэсэн: {item.created_by.username}</span>}                                                                           
                                />
                                <Paragraph ellipsis={{ rows: 4, expandable: false }}>
                                    <div dangerouslySetInnerHTML={{__html: item.content }} />
                                </Paragraph>        
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button href={`/posts/${posts[1].id}`} type="primary" style={{ justifySelf: 'flex-end' }}>Дэлгэрэнгүй</Button>
                                </div>                        
                            </List.Item>    
                            )}
                        />
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

export default Blogs;