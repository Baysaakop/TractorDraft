import React from 'react';
import { Breadcrumb, Typography } from 'antd';

const About = (props) => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр хуудас</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Лигийн тухай
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ border: '1px solid #ddd', background: '#fff', padding: '16px', margin: '16px 0' }}>
                <Typography.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam suscipit vel lacus eu convallis. Curabitur maximus ultrices pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut efficitur vehicula egestas. Ut efficitur arcu mauris, id volutpat orci mollis et. Vivamus sollicitudin ipsum in consequat luctus. In consectetur felis diam, id fermentum nunc molestie vel. Etiam eu eros ac metus condimentum luctus ut quis mauris.</Typography.Text>
            </div>
        </div>
    )
}

export default About;