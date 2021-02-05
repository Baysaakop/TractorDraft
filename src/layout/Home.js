import { Carousel } from 'antd';
import React from 'react';

function Home (props) {    
    return (
        <div>            
            <Carousel autoplay>
                <div style={{ position: 'relative' }}>
                    <img src="https://cf-images.eu-west-1.prod.boltdns.net/v1/static/4221396001/f36c86b4-1653-4a32-baf9-c3a00e0b1faa/d2429972-7e70-4201-b980-1f2d78eaa1ee/1280x720/match/image.jpg" alt="manutd" style={{ width: '100%', height: '400px', objectFit: 'cover', opacity: '0.5' }} />
                    <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'black', background: 'rgba(0, 0, 0, 0.5)',  color: 'white', padding: '16px' }}>                        
                        <h3>Манчестер Юнайтэдийн галзуурал</h3>
                    </div>                  
                </div>
                <div>
                    <h3 style={{ height: '200px', color: '#fff', background: '#364d79', lineHeight: '200px', textAlign: 'center' }}>Caruso</h3>
                </div>
                {/* <div>
                    <h3 style={{ height: '200px', color: '#fff', background: '#364d79', lineHeight: '200px', textAlign: 'center' }}>Carushow</h3>
                </div>
                <div>
                    <h3 style={{ height: '200px', color: '#fff', background: '#364d79', lineHeight: '200px', textAlign: 'center' }}>Caruzma</h3>
                </div> */}
            </Carousel>
        </div>
    )
}

export default Home;