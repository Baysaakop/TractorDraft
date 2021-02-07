import React from 'react';
import { Form, Input, Button, Typography, message, Result, InputNumber } from 'antd';
import axios from 'axios';
import { connect } from "react-redux";
import api from '../api';

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

const SeasonCreate = (props) => {
    
    const [form] = Form.useForm();
    
    const onFinish = values => {        
        const data = {
            "name": values.name,
            "description": values.description,
            "level": values.level,
            "year": values.year,
            "number": values.number,            
            "token": props.token
        }
        axios({
            method: 'POST',
            url: `${api.leagues}/`,
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
    };

    const onReset = () => {
        form.resetFields();
    }

    return (
        <div>    
            {props.token && props.token !== null ? (
                <>
                    <Typography.Title level={3}>
                        Шинэ улирал нэмэх                   
                    </Typography.Title>
                    <Form                        
                        {...formItemLayout}
                        form={form}  
                        name="itemaddform"                               
                        onFinish={onFinish}                              
                    >
                        <Form.Item                    
                            name="name"                            
                            label="Нэр"      
                            rules={[{ required: true, message: 'Please input item name!' }]}                                                             
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Тайлбар"                                     
                        >
                            <TextArea rows={6} />
                        </Form.Item>
                        <Form.Item
                            name="level"
                            label="Түвшин"                                     
                        >
                            <InputNumber min={1} max={2} defaultValue={1} />
                        </Form.Item>
                        <Form.Item
                            name="year"
                            label="Он"                                     
                        >
                            <InputNumber min={2020} max={2100} defaultValue={2020} />
                        </Form.Item>
                        <Form.Item
                            name="number"
                            label="Улирал"                                     
                        >
                            <InputNumber min={1} max={4} defaultValue={1} />
                        </Form.Item>                       
                        <Form.Item {...tailFormItemLayout}>
                            <div>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                                    Хадгалах
                                </Button>
                                <Button type="ghost" onClick={onReset} style={{ marginRight: '8px' }}>
                                    Арилгах
                                </Button>                                
                            </div>                                        
                        </Form.Item>
                    </Form>                    
                </>
            ) : (
                <Result
                    status="403"
                    title="403"
                    subTitle="Уучлаарай, танд энэ хуудас руу нэвтрэх эрх алга байна."
                    extra={<Button type="primary" href="/">Нуур хуудас руу буцах</Button>}
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

export default connect(mapStateToProps)(SeasonCreate);