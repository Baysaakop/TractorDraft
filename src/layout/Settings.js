import React from 'react';
import { Breadcrumb, Row, Col, Collapse, Tabs, Typography } from 'antd';
import { AreaChartOutlined, BookOutlined, CalendarOutlined, HomeOutlined, MenuOutlined, TeamOutlined, ProjectOutlined, ProfileOutlined, UserOutlined, LogoutOutlined, LoginOutlined, QuestionCircleOutlined, EditOutlined, PlusOutlined, ReadOutlined, InfoCircleOutlined, SettingOutlined, HistoryOutlined } from '@ant-design/icons';
import Home1 from '../images/Home/Home1.JPG';
import Home2 from '../images/Home/Home2.JPG';
import Home3 from '../images/Home/Home3.JPG';
import Home4 from '../images/Home/Home4.JPG';
import Home5 from '../images/Home/Home5.JPG';
import Home6 from '../images/Home/Home6.JPG';
import Season1 from '../images/Season/Season1.JPG';
import Season2 from '../images/Season/Season2.JPG';
import Season19 from '../images/Season/Season19.JPG';
import Managers from '../images/Managers/Managers.JPG';
import Compare from '../images/Managers/Compare.JPG';
import Stats from '../images/Managers/Stats.JPG';
import Posts from '../images/Posts/Posts.JPG';
import Newpost from '../images/Posts/Newpost.JPG';

const { Text, Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const Settings = (props) => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр хуудас</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Системийн дэлгэрэнгүй
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: '16px 0' }}>
                <Title level={4}>Үндсэн цэс</Title>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={<span><HomeOutlined />Нүүр</span>}
                        key="1"
                    >
                        <Title level={5}>Энэ нь манай веб системийн нүүр хуудас бөгөөд доорх хэсгүүдээс бүрдэнэ.</Title>
                        <Collapse defaultActiveKey={['1']}>
                            <Panel header="Шинэ нийтлэлүүд" key="1">
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт системд хамгийн сүүлд шинээр нийтлэгдсэн 2 нийтлэл гарчиг, зураг болон хураангуйн хамт байрлана. 2 нийтлэлийн баруун доор байрлах 'Цааш үзэх' товчийг дарснаар 'Нийтлэлүүд' цэс рүү үсрэх бөгөөд 'Нийтлэлүүд' цэснээс бүх нийтлэлийг оруулсан дарааллаар нь үзэх боломжтой.</Text>
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Home1} alt="home1" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row>                                                                
                            </Panel>
                            <Panel header="Лигийн хүснэгт" key="2">
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт одоо идэвхитэй явагдаж буй лиг эсвэл хамгийн сүүлд явагдаж өнгөрсөн лигийн хүснэгт байрлана.</Text>
                                        <br />
                                        <br />
                                        <br />
                                        <Text type="warning">* Одоогоор энэ хэсэгт зөвхөн дээд лигийн хүснэгт харагдах бөгөөд удахгүй доод лигийн хүснэгтийг харах боломжтой болох болно.</Text>
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Home2} alt="home2" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row>                                
                            </Panel>
                            <Panel header="Тойргийн мэргэн буучид" key="3">
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт тухайн тойргийн дээд лиг болон чэмпионшип лигийн мэргэн буучдын багуудыг зургаар харуулна.</Text>
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Home3} alt="home3" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row>                                       
                            </Panel>
                            <Panel header="Тойргийн өндөр оноонууд" key="4">
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт тухайн тойрогт хамгийн өндөр оноо авсан 5 менежер онооны хамт байрлана.</Text>
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Home4} alt="home4" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row>                                 
                            </Panel>
                            <Panel header="Лигийг хожлоор тэргүүлэгчид" key="5">
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт лигт хамгийн их хожил байгуулсан 5 менежер хожлын тооны хамт байрлана.</Text>
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Home5} alt="home5" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row>                                
                            </Panel>
                            <Panel header="Лигийг оноогоор тэргүүлэгчид" key="6">
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт лигт хамгийн их оноо цуглуулсан 5 менежер онооны хамт байрлана.</Text>
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Home6} alt="home6" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row>                                
                            </Panel>
                        </Collapse>
                    </TabPane>
                    <TabPane
                        tab={<span><QuestionCircleOutlined />Тусламж</span>}
                        key="2"
                    >
                        <Title level={5}>Дэд цэс</Title>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><InfoCircleOutlined />Лигийн тухай</span>} key={1}>
                                <Title level={5}>Лигийн танилцуулга болон дүрэм журам</Title>
                            </TabPane>
                            <TabPane tab={<span><SettingOutlined />Системийн дэлгэрэнгүй</span>} key={2}>
                                <Title level={5}>Системийг ашиглах дэлгэрэнгүй мэдээлэл буюу таны яг одоо харж буй хуудас</Title>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane
                        tab={<span><CalendarOutlined />Улирал</span>}
                        key="3"
                    >
                        <Title level={5}>Дэд цэс</Title>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><CalendarOutlined />Улирал</span>} key={1}>
                                <Title level={5}>Энэ нь улирал тус бүрийн үр дүн болон явцын хүснэгтийг харах боломж бүхий хуудас бөгөөд доорх хэсгүүдээс бүрдэнэ.</Title>
                                <Collapse defaultActiveKey={['1']}>
                                    <Panel header="Улирлын хүснэгт" key="1">
                                        <Row gutter={16}>
                                            <Col sm={24} md={12}>
                                                <Text>Энэ хэсэгт сонгогдсон улирлын үр дүнгийн хүснэгт байрлана.</Text>
                                                <br />      
                                                <br />                                            
                                                <Text mark>* Дээд | Чэмпионшип</Text>
                                                <Text> буюу зүүн дээд буланд байгаа 2 товчийг дарснаар дээд лиг эсвэл Чэмпионшип лиг эсэхээ сонгох боломжтой.</Text>
                                                <br />   
                                                <br />                                               
                                                <Text mark>* Улирал сонгох</Text>
                                                <Text> буюу баруун дээд  булан дах хэсгээс хэдэн оны хэд дүгээр улирал гэдгээ сонгох боломжтой.</Text>
                                                <br />
                                                <br />  
                                                <Text mark>* 'Байр', 'Хожил', 'Тэнцээ', 'Хожигдол', '+', '-', 'Оноо', 'Мэргэн бууч', 'МБ-н эсрэг'</Text>
                                                <Text> зэрэг багануудын толгой хэсгүүд дээр дарснаар тухайн баганаар эрэмбэлэх боломжтой.</Text>
                                                <br />   
                                                <br />                                               
                                                <Text mark>* Ерөнхий тохиолдолд</Text>
                                                <Text> одоо идэвхитэй явагдаж буй улирлын хүснэгт байх бөгөөд хэрэв улирал завсарласан бол сүүлчийн улирлын үр дүнгийн хүснэгт харагдана.</Text>
                                            </Col>
                                            <Col sm={24} md={12}>
                                                <img src={Season1} alt="season1" style={{ width: '100%', height: 'auto' }} />
                                            </Col>
                                        </Row>                                                                
                                    </Panel>
                                    <Panel header="Тойргийн үр дүн" key="2">
                                        <Row gutter={16}>
                                            <Col sm={24} md={12}>
                                                <Text>Энэ хэсэгт сонгогдсон улирал дах нийт тойргуудын хуваарь болон үр дүн байрлана.</Text>
                                                <br />
                                                <br />
                                                <Text mark>* Тойрог сонгох</Text>
                                                <Text> буюу баруун дээд булан дах хэсгээс хэд дүгээр тойрог гэдгээ сонгох боломжтой.</Text>
                                                <br />
                                                <br />
                                                <Text mark>* Үр дүн</Text>
                                                <Text> хэсэгт тухайн сонгогдсон тойрогт явагдсан тоглолтуудын үр дүн байрлана.</Text>
                                            </Col>
                                            <Col sm={24} md={12}>
                                                <img src={Season2} alt="season2" style={{ width: '100%', height: 'auto' }} />
                                            </Col>
                                        </Row>                                                                
                                    </Panel>
                                </Collapse>
                            </TabPane>
                            <TabPane tab={<span><HistoryOutlined />19-20 улирал</span>} key={2}>
                                <Title level={5}>2019-2020 оны улирлын хүснэгт</Title>
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>2019-2020 оны улирлын төгсгөлөөс бид бүхэн статистик хөтлөдөг болцгооё гэж ярилцсан бөгөөд тухайн үед боломжоороо бүртгэж авсан статистикийн хүснэгтийг энэ хэсэгт тусгайлан оруулж өгсөн байгаа.</Text>                                        
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Season19} alt="season19" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row> 
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane
                        tab={<span><TeamOutlined />Менежер</span>}
                        key="4"
                    >
                        <Title level={5}>Дэд цэс</Title>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><TeamOutlined />Менежер</span>} key={1}>
                                <Title level={5}>Лиг дэх нийт менежерүүдийн жагсаалт</Title>
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт лигт бүртгэлтэй нийт менежерүүдийн жагсаалт байрлана.</Text>
                                        <br />  
                                        <br />                         
                                        <Text mark>* Тухайн менежерийн</Text>
                                        <Text> мэдээлэл хэсэг нь дэмждэг багийн лого, нэр, лигт түрүүлсэн тоо, үзүүрлэсэн тоо, оноо, хожиль мэргэн бууч гэх мэт тоон үзүүлэлтүүдээс бүрдэнэ. Мөн дээр нь дарснаар тухайн менежерийн дэлгэрэнгүй мэдээллийг харах боломжтой.</Text>
                                        <br />
                                        <br />                         
                                        <Text mark>* Дээд | Чэмпионшип | Нийт</Text>
                                        <Text> буюу зүүн дээд буланд байгаа 2 товчийг дарснаар Дээд лиг, Чэмпионшип лиг эсвэл аль алийг нь эсэхээ сонгох боломжтой.</Text>
                                        <br />  
                                        <br />                                                
                                        <Text mark>* Эрэмбэлэх</Text>
                                        <Text> буюу баруун дээд булан дах хэсгээс нийт менежерүүдийг ямар үзүүлэлтээр эрэмбэлэхээ сонгох боломжтой.</Text>
                                        <br />     
                                        <br />                                                                                     
                                        <Text mark>* Ерөнхий тохиолдолд</Text>
                                        <Text> нийт менежерүүдийг түрүү авсан тоогоор нь эрэмбэлнэ.</Text>                                        
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Managers} alt="managers" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row> 
                            </TabPane>
                            <TabPane tab={<span><ProjectOutlined />Харьцуулалт</span>} key={2}>
                                <Title level={5}>Менежерүүдийг хос хосоор нь хооронд нь харьцуулах хуудас</Title>
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт менежерүүдийг хос хосоор нь сонгож хооронд нь харьцуулна.</Text>
                                        <br />      
                                        <br />                   
                                        <Text mark>* Баг сонгох</Text>
                                        <Text> хэсгээс харьцуулах 2 менежерээ сонгоно.</Text>
                                        <br />
                                        <br />                       
                                        <Text mark>* Харьцуулалт</Text>
                                        <Text> -н хэсгээс тухайн 2 менежерийн хоорондын хожил хожигдлын харьцаа, тус тусын кареерийн үзүүлэлтүүд болон хоорондын өмнө учраануудыг харах боломжтой.</Text>                                    
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Compare} alt="compare" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane
                        tab={<span><AreaChartOutlined />Статистик</span>}
                        key="5"
                    >
                        <Title level={5}>Энэ нь манай веб системийн статистик үзүүлэлтийн хуудас юм.</Title>
                        <Row gutter={16}>
                            <Col sm={24} md={12}>
                                <Text>Энэ хэсэгт leaderboard буюу ерөнхий үзүүлэлтүүдээр тэргүүлэгчдийн жагсаалтуудыг харуулсан.</Text>
                                <br />      
                                <br />                   
                                <Text mark>* Дээд | Чэмпионшип | Нийт</Text>
                                <Text> буюу зүүн дээд буланд байгаа 2 товчийг дарснаар Дээд лиг, Чэмпионшип лиг эсвэл аль алийг нь эсэхээ сонгох боломжтой.</Text>
                                <br />
                                <br />                       
                                <Text mark>* Жагсаалт</Text>
                                <Text> тус бүр нь тухайн үзүүлэлтийн нэршил, лого, жагсаалтын байр, менежер, тухайн үзүүлэлтийн тоо ширхэг зэргээс бүрдэнэ.</Text>                                    
                            </Col>
                            <Col sm={24} md={12}>
                                <img src={Stats} alt="stats" style={{ width: '100%', height: 'auto' }} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane
                        tab={<span><ReadOutlined />Мэдээлэл</span>}
                        key="6"
                    >
                        <Title level={5}>Дэд цэс</Title>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><ReadOutlined />Нийтлэл</span>} key={1}>
                                <Title level={5}>Веб дээр оруулсан нийтлэлүүдийг он цагийн дарааллаар үзэх хуудас</Title>
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт лигт бүртгэлтэй нийт менежерүүдийн жагсаалт байрлана.</Text>
                                        <br />  
                                        <br />                         
                                        <Text mark>* Тухайн нийтлэл</Text>
                                        <Text> нь гарчиг, нийтлэгч, нийтлэлийн эхлэл хэсэг болон зураг хэсгээс бүрдэнэ.</Text>
                                        <br />
                                        <br />                         
                                        <Text mark>* Тухайн нийтлэлийн</Text>
                                        <Text> гарчиг, зураг эсвэл дэлгэрэнгүй товч дээр дарснаар тухайн нийтлэлийн дэлгэрэнгүйг унших боломжтой.</Text>                                       
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Posts} alt="posts" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row> 
                            </TabPane>
                            <TabPane tab={<span><EditOutlined />Нийтлэл оруулах</span>} key={2}>
                                <Title level={5}>Шинэ нийтлэл бичих хуудас</Title>
                                <Row gutter={16}>
                                    <Col sm={24} md={12}>
                                        <Text>Энэ хэсэгт шинээр нийтлэл бичих форм харагдана.</Text>
                                        <br />      
                                        <br />                   
                                        <Text mark>* Гарчиг</Text>
                                        <Text> хэсэгт нийтлэлийхээ гарчигийг өгнө.</Text>
                                        <br />
                                        <br />                       
                                        <Text mark>* Нийтлэл</Text>
                                        <Text> хэсэгт нийтлэлээ текст хэлбэрээр бичиж өгнө.</Text>  
                                        <br />
                                        <br />                       
                                        <Text mark>* Зураг</Text>
                                        <Text> хэсэгт нийтлэлээ зургийг зааж өгнө.</Text>   
                                        <br />
                                        <br />                       
                                        <Text mark>* Нийтлэх</Text>
                                        <Text> товчийг дарснаар таны нийтлэл системд байрших болно.</Text>                                    
                                    </Col>
                                    <Col sm={24} md={12}>
                                        <img src={Newpost} alt="newpost" style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                </Tabs>
            </div>            
        </div>
    )
}

export default Settings;