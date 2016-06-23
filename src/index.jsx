/**
 * 入口文件
 * Created by yinfxs on 16-6-20.
 */

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
require('whatwg-fetch');

const App = React.createClass({
    getInitialState () {
        return {
            profile: {}
        };
    },

    componentDidMount() {
        const self = this;
        this.serverRequest = fetch(this.props.source).then(function (res) {
            return res.json();
        }).then(function (result) {
            console.log('fetch......' + JSON.stringify(result));
            self.setState({
                profile: result.items[0]
            });
        });
    },

    // componentWillUnmount: function () {
    //     this.serverRequest.abort();
    // },

    render() {
        const profile = this.state.profile;
        return (
            <div>
                <div>登录名：{profile.login}</div>
                <div>头像：<img src={profile.avatar_url} width="100" height="100" style={{borderRadius:'50px'}}/></div>
                <div>主页地址：<a href={profile.html_url}>{profile.login}</a>.</div>
            </div>
        );
    }
});


const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<App source="https://api.github.com/search/users?q=yinfxs"/>, app);