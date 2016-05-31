import React from 'react';

class Footer extends React.Component {
    render() {
        return (
           <footer className="bs-docs-footer">
               <h1 className="contact-title__item">联系方式 Contact</h1>
               <div className="container">
                   <div className="bs-docs-social">
                       <ul className="bs-docs-social-button">
                           <li><span className="glyphicon glyphicon-phone"></span>电话 Tel: 13517242953</li>
                           <li>微信 Wechat: 13517242953</li>
                           <li><a href="http://weibo.com/3377229124" target="_blank">新浪微博 Sina</a></li>
                           <li>QQ: 540664191</li>
                       </ul>
                   </div>
               </div>
               <p>感谢您花时间阅读我的简历，期待能有机会和您共事</p>
           </footer>
        )
    }
}


export default Footer;