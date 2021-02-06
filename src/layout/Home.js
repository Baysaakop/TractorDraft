import { Button, Card, Col, Divider, Row, Typography, List, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import LeagueTableMini from '../components/LeagueTableMini';
import axios from 'axios';
import api from '../api';
import Avatar from 'antd/lib/avatar/avatar';

const data = [
    {
        title: 'Баясаа',
        points: '100 оноо',
        image: "https://resources.premierleague.com/premierleague/badges/50/t14.png"
    },
    {
        title: 'Мөнхсайхан',
        points: '56 оноо',
        image: "https://resources.premierleague.com/premierleague/badges/50/t43.png"
    },
    {
        title: 'Зундуй',
        points: '49 оноо',
        image: "https://resources.premierleague.com/premierleague/badges/50/t14.png"
    },
    {
        title: 'Луугий',
        points: '47 оноо',
        image: "https://resources.premierleague.com/premierleague/badges/50/t8.png"
    },
    {
        title: 'Төгсөө',
        points: '47 оноо',
        image: "https://resources.premierleague.com/premierleague/badges/50/t3.png"
    },
    {
        title: 'Очироо',
        points: '44 оноо',
        image: "https://resources.premierleague.com/premierleague/badges/50/t3.png"
    }
  ];

function Home (props) {    

    const [leagues, setLeagues] = useState();
    const [level, setLevel] = useState(0);

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.leagues}`
        }).then(res => {                         
            setLeagues(res.data)                                                                        
        }).catch(err => {
            console.log(err.message)
        });    
    }, [])  

    function onChangeLevel(e) {
        setLevel(e.target.value)     
    }

    return (
        <div>            
            <Row gutter={16}>
                <Col sm={24} md={16}>
                    <Card hoverable style={{ backgroundImage: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)" }}>
                        <Row gutter={16} style={{ width: '100%' }}>                        
                            <Col sm={24} md={12}>
                                <img src="https://resources.premierleague.com/photos/2020/08/22/e29e779e-6d19-4b7f-8b01-659de3e405a5/son.jpg?width=930&height=620" alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
                            </Col>
                            <Col sm={24} md={12}>
                                <Typography.Title level={1}>Онцлох тоглогч: Сон Хён Мин</Typography.Title>
                                <Typography.Text>Сон Хёнг-Мин (сол. 손흥민, 1992 оны долоодугаар сарын 8-нд Канвондо аймгийн Чунчон хотод төрсөн) — Өмнөд Солонгосын хөлбөмбөгчин бөгөөд Тоттенхэм Хотспур болон Өмнөд Солонгосын шигшээд тоглодог.</Typography.Text>                                                        
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                                    <strong>06/02/2021</strong>
                                    <Button type="primary">Дэлгэрэнгүй</Button>
                                </div>                        
                            </Col>
                        </Row>
                    </Card>
                    <Card hoverable style={{ backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)", marginTop: '16px' }}>
                        <Row gutter={16} style={{ width: '100%' }}>
                            <Col sm={24} md={12}>
                                <Typography.Title level={1}>Тойргийн дараах</Typography.Title>
                                <Typography.Text>Анхны хожлоо арай гэж авсан тойрог боллоо. Бүр 1 оноогоор хэмжиж шүү. Солилцоогоор авсан Калверт-Левин болон чөлөөт агент Маркос Алонсо нар хожилд хөтөлжээ. Харин Тэлмэнгийн хувьд багийнхаа довтолгоонд бус Челси хамгаалалтанд итгээд Мендиг гаргаад үзсэн бол намайг 1 оноогоор туух байждээ. Ингээд цувралын харьцаа 1-1</Typography.Text>                                                        
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                                    <strong>06/02/2021</strong>
                                    <Button type="primary">Дэлгэрэнгүй</Button>
                                </div>                        
                            </Col>
                            <Col sm={24} md={12}>
                                <img src="https://resources.premierleague.com/photos/2020/11/19/fe0e782e-09ea-4dad-aef8-90b3949122ba/1229281405.jpg?width=930&height=620" alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
                            </Col>                        
                        </Row>
                    </Card>
                </Col>
                <Col sm={24} md={8}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px' }}>
                        <Typography.Title level={4}>Лигийн хүснэгт:</Typography.Title>
                        <Radio.Group onChange={onChangeLevel} defaultValue={2}>
                            <Radio.Button value={1}>Дээд</Radio.Button>
                            <Radio.Button value={2}>Чэмпионшип</Radio.Button>                            
                        </Radio.Group>
                    </div>
                    <LeagueTableMini id={leagues ? leagues[leagues.length - 1].id : 1} />
                </Col>
            </Row>
            <div style={{ margin: '16px 0' }}>
                <Typography.Title level={2}>Тойргийн шилдэг менежерүүд</Typography.Title>
                <Divider style={{ marginTop: '0px', marginBottom: '16px' }} />
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card hoverable title={item.title} extra={<Avatar shape="square" src={item.image} />}>
                                <Typography.Title level={2}>{item.points}</Typography.Title>
                            </Card>
                        </List.Item>
                    )}
                />                
            </div>            
        </div>
    )
}

export default Home;