import React, { useState } from 'react';
import { Button, Grid, Menu, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { AreaChartOutlined, BookOutlined, CalendarOutlined, HomeOutlined, MenuOutlined, SearchOutlined, TeamOutlined, ProjectOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { useBreakpoint } = Grid;

function CustomMenu (props) {
    const screens = useBreakpoint();
    const [current, setCurrent] = useState('home');
    const [collapsed, setCollapsed] = useState(true);  
    const [searchValue, setSearchValue] = useState('');

    const handleMenuClick = (e) => {        
        if (e.key === 'search') {
            return;
        }        
        setCurrent(e.key);
        setCollapsed(true);
        setSearchValue('');
    };

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const onSearchChange = e => {
        setSearchValue(e.target.value);
    }

    const onSearch = e => {        
        var name = e.target.value;
        console.log(name)
        // props.history.push(`/items?search=${name}`)
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
                    <Menu.Item key="seasons" icon={<CalendarOutlined />}>
                        <Link to="/seasons">Улирал</Link>
                    </Menu.Item>
                    <Menu.Item key="managers" icon={<TeamOutlined />}>
                        <Link to="/managers">Менежер</Link>
                    </Menu.Item>
                    <Menu.Item key="stats" icon={<AreaChartOutlined />}>
                        <Link to="/stats">Статистик</Link>
                    </Menu.Item>
                    <Menu.Item key="compare" icon={<ProjectOutlined />}>
                        <Link to="/compare">Харьцуулалт</Link>
                    </Menu.Item>
                    <Menu.Item key="season19" icon={<BookOutlined />}>
                        <Link to="/season19">19-20 улирал</Link>
                    </Menu.Item>                    
                    <Input 
                        placeholder="Хайх..."
                        allowClear
                        prefix={<SearchOutlined />}
                        style={{ width: 200, float: 'right', margin: '16px' }}
                        onChange={onSearchChange}
                        onPressEnter={onSearch}
                        value={searchValue}                                                                       
                    />               
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