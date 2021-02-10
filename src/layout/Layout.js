import React, { useEffect, useState } from 'react';
import { Button, Layout, Tooltip } from 'antd';
import CustomMenu from './Menu';
import './Layout.css';
import { BulbFilled, BulbOutlined, FacebookFilled, GithubFilled, InstagramOutlined, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function CustomLayout (props) {    

    const [darkMode, setDarkMode] = useState(getInitialMode());

    useEffect(() => {
        localStorage.setItem('dark', JSON.stringify(darkMode))
    }, [darkMode])

    function getInitialMode() {
        const isReturningUser = "dark" in localStorage;
        const savedMode = JSON.parse(localStorage.getItem('dark'));
        const userPrefersDark = getPrefColorScheme();
        if (isReturningUser) {
            return savedMode;
        } else if (userPrefersDark) {
            return true;
        } else {
            return false;
        }        
    }

    function getPrefColorScheme() {
        if (!window.matchMedia) return;

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    return(
        <Layout className={darkMode ? "layout-dark" : "layout-light"}>
            <Header className="header">
                {/* <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '8px 48px' }}>                    
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t3.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t7.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t36.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t90.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t8.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t31.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t11.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t54.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t2.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t13.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t14.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t43.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t1.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t4.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t49.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t20.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t6.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t35.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t21.png" />
                    <Avatar shape="square" src="https://resources.premierleague.com/premierleague/badges/50/t39.png" />
                </div> */}
                <CustomMenu {...props} darkMode={darkMode} />                
            </Header>
            <Content className="content">                                     
                <div className="content-item">
                    {props.children}                    
                </div>                
                <div className="theme-switch-container">                   
                    <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                        <Button 
                            type={darkMode ? "primary" : "default"}
                            shape="circle" 
                            size="large" 
                            icon={darkMode ? <BulbFilled /> : <BulbOutlined />} 
                            onClick={() => setDarkMode(prevMode => !prevMode)}
                        />
                    </Tooltip>
                </div>
            </Content>
            <Footer className="footer">
                <div>
                    <Tooltip title="Facebook">
                        <Button shape="circle" icon={<FacebookFilled />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <Tooltip title="Twitter">
                        <Button shape="circle" icon={<TwitterOutlined />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <Tooltip title="Instagram">
                        <Button shape="circle" icon={<InstagramOutlined />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <Tooltip title="Youtube">
                        <Button shape="circle" icon={<YoutubeFilled />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <Tooltip title="Github">
                        <Button shape="circle" icon={<GithubFilled />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <p>
                        © 2021 Трактор Фантази Лиг. Системийг хөгжүүлсэн On Plus ХХК
                    </p>
                </div>                
            </Footer>
        </Layout>
    );  
};

export default CustomLayout;