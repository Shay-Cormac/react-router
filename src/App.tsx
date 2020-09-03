import * as React from 'react'
import { Route, Link, BrowserRouter, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import './App.css';



class App extends React.Component {

    public state = {
        // 路由数据
        routeList: [
            { path: '/', title: 'Home', exact: true, component: Home },
            { path: '/List/', title: 'List', exact: false, component: List },
        ]
    }
    render() {
        return (
            <BrowserRouter>
                {/* <Redirect to='/' /> 重定向到 Home 页 */}
                <Redirect to='/' />
                <div className='mainDiv'>
                    <div className='leftNav'>
                        {/* 遍历路由数据 */}
                        <ul>
                            {
                                this.state.routeList.map((item: any, index: number) => (
                                    <li key={index}><Link to={item.path}>{item.title}</Link></li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='rightMain'>
                        {
                            this.state.routeList.map((item: any, index: number) => (
                                <Route
                                    key={index}
                                    path={item.path}
                                    exact={item.exact}
                                    component={item.component}
                                />
                            ))
                        }
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App