import React from 'react';
import { Row, Col } from 'antd';
import { Card } from 'antd';

class DataPanel extends React.Component {
    render() {
        const style = {backgroundColor: 'red',minHeight: '15px',marginLeft: 'auto',marginRight: 'auto',textAlign: 'justify'};
        return (
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} style={style}>
                    <div style={{ background: '#ECECEC', padding: '30px',marginLeft: 'auto',marginRight: 'auto'}}>
                        <Card title="关于我&nbsp;&nbsp;&nbsp;&nbsp;About me" bordered={false} style={{height: '485px'}}>
                            <p style={{textIndent: "2em"}}>李康,出生于1994年，第一次接触到前端是在去年的3月份，从最初的HTML，CSS,JS， 从自适应布局和响应式布局，
                                从Pure到Bootstrap等CSS框架，从Webdeveloper到Git，Github，Gitcafe,webpack等工具，从Less到Sass等动态CSS语言, 从BEM、SMACSS到RSCSS等CSS设计模式，从HTML语义化、和ES6规范,彻底激发了我对前端的认识，也引领着我学习各类的框架和库,从JQ到各种框架和库， 如Vue，React，Backbone等开发前沿的框架,从前端到后台，也开始逐渐的了解,在学习的过程中，喜欢总结遇到的问题，记录下来。
                                经常逛的网站: 慕课网,CSDN, Github,博客园、汇智网，知乎,segmentfault、腾讯前端alloyTeam以及其他个人技术博客、论坛等;目前打算学习PostCSS、CSS Modules、React等；
                            </p>
                        </Card>
                    </div>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} style={style} >
                    <div style={{ background: '#ECECEC', padding: '30px',marginLeft: 'auto',marginRight: 'auto'}}>
                        <Card title="学习经历&nbsp;&nbsp;&nbsp;&nbsp; Learn experience" bordered={false} style={{height: '485px'}}>
                            <p>2012-9~2016-7</p>
                            <p>就读于湖北大学知行学院,国际经济与贸易专业，本科</p>
                            <p >2015年的某个午后，在宿舍玩游戏的时候看到某公司的招聘前端信息，上面写着熟悉HTML，CSS,JS，jQuery等相关技能。
                                于是乎便在网上搜索相关的知识，在W3C、极客学院、潭州学院中初步接触HTML、CSS，走了不少弯路，看妙味的JavaScript视频学习前端，后来在JavaScript百度贴吧
                                认识了我的师傅，巩固了CSS相关知识，开阔了学习的视野，不仅仅局限于语言本身，更要学会使用框架，阅读源码，翻译外文文档，学习设计模式等相关技能，以更好的理念
                                来写可维护性、可扩展性、可阅读的高质量代码。学会使用Git，Github，在上面寻找丰富的学习资源，善于提问，懂得如何提问。面对日新月异的前端，希望能在前端的道路上
                                走的更远，成为一名优秀的前端开发工程师。
                            </p>
                        </Card>
                    </div>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} style={style} >
                    <div style={{ background: '#ECECEC', padding: '30px',marginLeft: 'auto',marginRight: 'auto'}}>
                        <Card title="工作经历&nbsp;&nbsp;&nbsp;&nbsp;Work experience" bordered={false} style={{height: '485px'}}>
                            <p>2015.9~2015.12</p>
                            <p>武汉车友网 前端开发实习生</p>
                            <p>在公司主要负责移动端活动页面的开发，使用REM和FrozenUI等框架进行构建,把最新的HTML5和CSS3运用到页面中增强用户体验,同时还负责公司后台界面的开发，
                                主要使用bootstrap ace admin的模板整合到网站中去， 同时在工作中也熟悉了Gulp，SVN,Git等工具的使用.遇到不懂的问题，积极请教，学会解决问题，善于思考
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </p>
                        </Card>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default DataPanel;
