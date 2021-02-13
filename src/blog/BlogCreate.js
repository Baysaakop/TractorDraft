import { Breadcrumb, Button, Form, Input, Result, Typography } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import api from '../api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './BlogCreate.css';
import ImageUpload from '../components/ImageUpload';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 4,
        },
    },
};

const BlogCreate = (props) => {
    const [form] = Form.useForm()    
    const [image, setImage] = useState();
    const [content, setContent] = useState();

    const onImageSelected = (path) => {
        setImage(path);
    } 

    function onContentChange(event, editor) {
        const data = editor.getData();
        // console.log( { event, editor, data } );
        setContent(data);
    }

    function onFinish (values) {
        console.log('Title:', values.title);
        console.log('Post:', content);
        console.log('Image:', image);
        var formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', content);        
        formData.append('thumbnail', image);
        formData.append('token', props.token);
        axios({
            method: 'POST',
            url: `${api.posts}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'                
            }
        }).then(res => {
            console.log(res)            
        }).catch(error => {
            console.log(error)
        })
    };

    return (
        <div>            
            {props.token && props.token !== null ? (
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Нүүр</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Шинэ нийтлэл
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ margin: '16px 0' }}>
                        <Typography.Title level={3}>
                            Шинэ нийтлэл оруулах                   
                        </Typography.Title>       
                        <Form 
                            {...formItemLayout}
                            form={form}  
                            name="postform"                               
                            onFinish={onFinish}                              
                        >
                            <Form.Item
                                label="Гарчиг"
                                name="title"
                                rules={[{ required: true, message: 'Гарчиг өгнө үү!' }]}
                            >
                                <Input />
                            </Form.Item>                            
                            <Form.Item
                                label="Нийтлэл"
                                name="post"
                                rules={[{ required: true, message: 'Нийтлэлээ оруулна уу!' }]}
                            >
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data=""                           
                                    onChange={onContentChange}                            
                                />     
                            </Form.Item>        
                            <Form.Item
                                name="image"
                                label="Зураг"
                            >                               
                                <ImageUpload onImageSelected={onImageSelected} imageUrl={undefined} />                        
                            </Form.Item>                     
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Нийтлэх
                                </Button>
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

export default connect(mapStateToProps)(BlogCreate);