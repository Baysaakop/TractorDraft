import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Result } from 'antd';
import axios from 'axios';
import { connect } from "react-redux";
import api from '../api';
import ImageUpload from "../components/ImageUpload";

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 12,
            offset: 6,
        },
    },
};

function ItemCreate (props) {    
    const [form] = Form.useForm()    
    const [image, setImage] = useState();    

    const onFinish = values => {        
        const data = {
            "name": values.name,
            "description": values.description,
            "image": image,
            "token": props.token
        }
        axios({
            method: 'POST',
            url: `${api.items}/`,
            data: data
        })            
        .then(res => {
            console.log(res)
            message.info(res.statusText)   
            form.resetFields()             
        })
        .catch(err => {                
            console.log(err)
            message.error(err.message)
        })            
        // if (image) {
        //     axios({
        //         method: 'POST',
        //         url: `${api.mediaItems}`,
        //         data: formData
        //     })
        // }
    };

    const onReset = () => {
        form.resetFields();
    }

    const onImageSelected = (path) => {
        setImage(path);
    } 

    return (
        <div>    
            {props.token && props.token !== null ? (
                <>
                    <Typography.Title level={3}>
                        Create new item                   
                    </Typography.Title>
                    <Form                        
                        {...formItemLayout}
                        form={form}  
                        name="itemaddform"                               
                        onFinish={onFinish}                              
                    >
                        <Form.Item                    
                            name="name"                            
                            label="Name"      
                            rules={[{ required: true, message: 'Please input item name!' }]}                                                             
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"                                     
                        >
                            <TextArea rows={6} />
                        </Form.Item>
                        <Form.Item
                            name="image"
                            label="Image"
                        >                               
                            <ImageUpload onImageSelected={onImageSelected} imageUrl={undefined} />                        
                        </Form.Item>                        
                        <Form.Item {...tailFormItemLayout}>
                            <div>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                                    Submit
                                </Button>
                                <Button type="ghost" onClick={onReset} style={{ marginRight: '8px' }}>
                                    Reset
                                </Button>                                
                            </div>                                        
                        </Form.Item>
                    </Form>                    
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

export default connect(mapStateToProps)(ItemCreate);