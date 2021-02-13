import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Divider, Image, Row, Spin, Typography } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';

const { Paragraph } = Typography;

const BlogDetail = (props) => {

    const [post, setPost] = useState();

    useEffect(() => {
        const id = props.match.params.postID;
        const url = api.posts + "/" + id + "/";        
        axios({
            method: 'GET',
            url: url
        })
        .then(res => {            
            setPost(res.data);
        })
        .catch(err => {
            console.log(err.message);
        })
    }, [props.match]);

    function getDate(date) {
        let d = new Date(date);    
        return d.getFullYear().toString() + "/" + (d.getMonth() + 1).toString() + "/" + d.getDate();
    }
    
    return (
        <div>
            { post ? (
                <div>                    
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Нүүр хуудас</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="/posts/">Нийтлэл</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {post.title}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: '16px', margin: '16px 0' }}>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={4} lg={6}>                                
                            </Col>
                            <Col xs={24} sm={24} md={16} lg={12}>
                                <img src={post.thumbnail} alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
                                <Typography.Title level={1} style={{ textAlign: 'center' }}>{post.title}</Typography.Title>
                                <div dangerouslySetInnerHTML={{__html: post.content }} />
                                <Divider />
                                <div style={{display: 'flex', justifyContent: 'space-between' }}>                                    
                                    <div>Нийтлэсэн: {post.created_by.username}</div>
                                    <div>Огноо: {getDate(post.created_at)}</div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={4} lg={6}>                                
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
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(BlogDetail);