import React, { useEffect, useState } from 'react';
import { Button, Grid, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AreaChartOutlined, BookOutlined, CalendarOutlined, HomeOutlined, MenuOutlined, TeamOutlined, ProjectOutlined, ProfileOutlined, UserOutlined, LogoutOutlined, LoginOutlined,    QuestionCircleOutlined, EditOutlined, PlusOutlined, ReadOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api';
import SubMenu from 'antd/lib/menu/SubMenu';

const { useBreakpoint } = Grid;

function CustomMenu (props) {
    const screens = useBreakpoint();
    const [current, setCurrent] = useState('home');
    const [collapsed, setCollapsed] = useState(true);      
    const [user, setUser] = useState();

    useEffect(() => {        
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(response => {     
            console.log(response.data)       
            setUser(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [props.token])

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
                        { user && user !== null ? (
                            <SubMenu key="user" icon={<UserOutlined />} title={user.username} >
                                <Menu.Item key="profile" icon={<ProfileOutlined />} >
                                    <Link to="/profile">Хэрэглэгч</Link>
                                </Menu.Item>
                                { user.profile.role === "1" ? (
                                    <Menu.Item key="addseason" icon={<PlusOutlined />} >
                                        <Link to="/addseason">Улирал нэмэх</Link>
                                    </Menu.Item>
                                ) : (
                                    <></>
                                )}
                                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                                    <Link to="/logout">Гарах</Link>
                                </Menu.Item>
                            </SubMenu>
                        ) : (
                            <Menu.Item key="login" icon={<LoginOutlined />} >
                                <Link to="/login">Нэвтрэх</Link>
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
                    <SubMenu key="posts" icon={<ReadOutlined />} title="Мэдээлэл">
                        <Menu.Item key="news" icon={<ReadOutlined />}>
                            <Link to="/posts">Нийтлэлүүд</Link>
                        </Menu.Item>
                        <Menu.Item key="newpost" icon={<EditOutlined />}>
                            <Link to="/newpost">Нийтлэл оруулах</Link>
                        </Menu.Item>
                    </SubMenu>                                                                                     
                    { user && user !== null ? (
                        <SubMenu key="user" icon={<UserOutlined />} title={user.username} style={{ float: 'right' }} >
                            <Menu.Item key="profile" icon={<ProfileOutlined />} >
                                <Link to="/profile">Хэрэглэгч</Link>
                            </Menu.Item>
                            { user.profile.role === "1" ? (
                                <Menu.Item key="newseason" icon={<PlusOutlined />} >
                                    <Link to="/newseason">Улирал нэмэх</Link>
                                </Menu.Item>
                            ) : (
                                <></>
                            )}
                            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                                <Link to="/logout">Гарах</Link>
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

export default CustomMenu;