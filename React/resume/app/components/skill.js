import React from 'react';
import { Row, Col } from 'antd';
import { Progress } from 'antd';

class SkillPanel extends React.Component {
    render() {
        const style={paddingBottom: '20px'};
        return (
            <div style={{textAlign: 'center'}}>
                <h1 className="skill-title__item">我的技能 Skill</h1>
            <Row>
                <Col xs={12} sm={4} md={4}>
                    <Progress type="circle" percent={85} style={style} />
                    <p style={{paddingBottom: '10px'}}>HTML</p>
                </Col>
                <Col xs={12} sm={4} md={4}>
                    <Progress type="circle" percent={75} style={style} />
                    <p style={{paddingBottom: '10px'}}>CSS</p>
                </Col>
                <Col xs={12} sm={4} md={4} >
                    <Progress type="circle" percent={65} style={style}/>
                    <p style={{paddingBottom: '10px'}}>JS</p>
                </Col>
                <Col xs={12} sm={4} md={4}>
                    <Progress type="circle" percent={50}  style={style} />
                    <p style={{paddingBottom: '10px'}}>PS/FW</p>
                </Col>
                <Col xs={12} sm={4} md={4} >
                    <Progress type="circle" percent={45} style={style} />
                    <p style={{paddingBottom: '10px'}}>HTML5/CSS3</p>
                </Col>
                <Col xs={12} sm={4} md={4} >
                    <Progress type="circle" percent={35} style={style} />
                    <p style={{paddingBottom: '10px'}}>其他</p>
                </Col>
            </Row>
            </div>
        )
    }
}
export default SkillPanel;