import { Button, Result } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const Logout = (props) => {

    function onOk() {
        props.logout();
        props.history.goBack();
    }

    function onCancel() {
        props.history.goBack();
    }

    return (
        <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Result
                status="warning"
                title="Та системээс гарахдаа итгэлтэй байна уу?"
                extra={
                    <div>
                        <Button type="primary" key="console" style={{ marginRight: '16px' }} onClick={onOk}>
                            Тийм
                        </Button>
                        <Button type="default" key="console" onClick={onCancel}>
                            Үгүй
                        </Button>
                    </div>
                }
            />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())        
    }
}

export default connect(null, mapDispatchToProps)(Logout);