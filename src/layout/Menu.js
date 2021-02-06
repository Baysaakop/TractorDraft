import React, { useState } from 'react';
import { Button, Grid, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { AreaChartOutlined, BookOutlined, CalendarOutlined, HomeOutlined, MenuOutlined, TeamOutlined, ProjectOutlined, ProfileOutlined, UserOutlined, LogoutOutlined, LoginOutlined,    QuestionCircleOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import SubMenu from 'antd/lib/menu/SubMenu';

const { useBreakpoint } = Grid;

function CustomMenu (props) {
    const screens = useBreakpoint();
    const [current, setCurrent] = useState('home');
    const [collapsed, setCollapsed] = useState(true);      

    const handleMenuClick = (e) => {             
        setCurrent(e.key);
        setCollapsed(true);        
    };

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed);
    }    

    return (
        <div>
            <div className="logo" style={{ marginLeft: '5%' }}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1920px-Premier_League_Logo.svg.png" style={{ height: '100%' }} alt="logo" />                  
            </div>
            { screens.xs ? (
                <div>
                    <Button type="primary" onClick={handleMenuCollapsed} style={{ float: 'right', marginTop: '5%', marginRight: '5%' }}>
                        <MenuOutlined />
                    </Button>
                    <Menu 
                        className="menu" 
                        theme={props.darkMode ? "dark" : "light"} 
                        mode="inline" hidden={collapsed} 
                        onClick={handleMenuClick}
                        defaultSelectedKeys={[current]}
                    >
                        <Menu.Item key="home" icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="seasons" icon={<CalendarOutlined />}>
                            <Link to="/seasons">Seasons</Link>
                        </Menu.Item>
                        <Menu.Item key="managers" icon={<TeamOutlined />}>
                            <Link to="/managers">Managers</Link>
                        </Menu.Item>
                        <Menu.Item key="stats" icon={<AreaChartOutlined />}>
                            <Link to="/stats">Statistic</Link>
                        </Menu.Item>             
                        <Menu.Item key="compare" icon={<ProjectOutlined />}>
                            <Link to="/compare">Харьцуулалт</Link>
                        </Menu.Item>  
                        <Menu.Item key="season19" icon={<BookOutlined />}>
                            <Link to="/season19">19-20 улирал</Link>
                        </Menu.Item>         
                        { props.username !== null ? (
                             <SubMenu key="user" icon={<UserOutlined />} title={props.username} >
                                <Menu.Item key="profile" icon={<ProfileOutlined />} >
                                    <Link to="/profile">Profile</Link>
                                </Menu.Item>
                                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={props.logout}>
                                    Log out
                                </Menu.Item>
                            </SubMenu>
                        ) : (
                            <Menu.Item key="signin" icon={<LoginOutlined />} >
                                <Link to="/login">Sign in</Link>
                            </Menu.Item>
                        ) }               
                    </Menu>
                </div>
            ) : (
                <Menu 
                    className="menu" 
                    theme={props.darkMode ? "dark" : "light"} 
                    mode="horizontal" 
                    onClick={handleMenuClick} 
                    defaultSelectedKeys={[current]} 
                    style={{ marginRight: '5%' }}
                >
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/">Нүүр</Link>
                    </Menu.Item>
                    <Menu.Item key="about" icon={<QuestionCircleOutlined />}>
                        <Link to="/about">Лигийн тухай</Link>
                    </Menu.Item>
                    <SubMenu key="seasons" icon={<CalendarOutlined />} title="Улирал">
                        <Menu.Item key="seasons" icon={<CalendarOutlined />}>
                            <Link to="/seasons">Улирал</Link>
                        </Menu.Item>
                        <Menu.Item key="season19" icon={<BookOutlined />}>
                            <Link to="/season19">19-20 улирал</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="managers" icon={<TeamOutlined />} title="Менежер">
                        <Menu.Item key="managers" icon={<TeamOutlined />}>
                            <Link to="/managers">Менежер</Link>
                        </Menu.Item>
                        <Menu.Item key="compare" icon={<ProjectOutlined />}>
                            <Link to="/compare">Харьцуулалт</Link>
                        </Menu.Item>
                    </SubMenu>                    
                    <Menu.Item key="stats" icon={<AreaChartOutlined />}>
                        <Link to="/stats">Статистик</Link>
                    </Menu.Item>
                    <Menu.Item key="news" icon={<EditOutlined />}>
                        <Link to="/news">Нийтлэл</Link>
                    </Menu.Item>                                                                 
                    { props.username !== null ? (
                        <SubMenu key="user" icon={<UserOutlined />} title={props.username} style={{ float: 'right' }} >
                            <Menu.Item key="profile" icon={<ProfileOutlined />} >
                                <Link to="/profile">Хэрэглэгч</Link>
                            </Menu.Item>
                            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={props.logout}>
                                Гарах
                            </Menu.Item>
                        </SubMenu>
                    ) : (
                        <Menu.Item key="login" icon={<LoginOutlined />} style={{ float: 'right' }} >
                            <Link to="/login">Нэвтрэх</Link>
                        </Menu.Item>
                    ) }                   
                </Menu>
            )}                
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())        
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomMenu));