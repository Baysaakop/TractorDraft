import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Spin } from 'antd';
import { LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Signup = (props) => {
    const [form] = Form.useForm();    

    useEffect(() => {
        if (props.token) {
            props.history.goBack();
        }  
    }, [props.token, props.history])
    
    const onFinish = (values) => {        
        props.onAuth(values.username, values.email, values.password, values.confirm);        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>            
            {props.loading ? (
                <Spin indicator={loadingIcon} />
            ) : (
                <div style={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '400px', border: '1px solid #a1a1a1', padding: '16px' }}>
                        <Typography.Title level={3} style={{ textAlign: 'center' }}>
                            Бүртгүүлэх                    
                        </Typography.Title>                        
                        <Form                            
                            form={form}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="email"                                
                                rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                                ]}
                            >
                                <Input prefix={<MailOutlined style={{ color: '#a1a1a1' }} />} placeholder="И-Мэйл" />
                            </Form.Item>
                            <Form.Item
                                name="username"                                                          
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                ]}
                            >
                                <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} placeholder="Нэвтрэх нэр" />
                            </Form.Item>
                            <Form.Item
                                name="password"                                
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Нууц үг" />
                            </Form.Item>
                            <Form.Item
                                name="confirm"                                
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Нууц үг давтах" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Бүртгүүлэх
                                </Button>
                                <p> эсвэл 
                                    <NavLink to="/login/"> нэвтрэх</NavLink>
                                </p>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            )}  
        </div>      
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,        
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);