import { Breadcrumb, Button, Result, Typography } from 'antd';
import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import api from '../api';

const BlogCreate = (props) => {
    return (
        <div>
            <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Нүүр</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Шинэ нийтлэл
                    </Breadcrumb.Item>
                </Breadcrumb>
            {props.token && props.token !== null ? (
                <>
                    <Typography.Title level={3}>
                        Шинэ нийтлэл оруулах                   
                    </Typography.Title>                                        
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