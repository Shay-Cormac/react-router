import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Index from './List/Index';
import ReactPage from './List/ReactPage';
export default class List extends Component {
    render() {
        return (
            <div>
                <div className='topNav'>
                    <ul>
                        {/* 注意：此处路径，Link 中的 to= ，
                        和 Route 中的 path= 必须一样，
                        要么都有后缀，要么都没有，不然无法显示 */}
                        <li> <Link to='/List/Index'>Index</Link> </li>
                        <li> <Link to='/List/ReactPage.tsx'>ReactPage</Link> </li>
                    </ul>
                </div>
                <div className='videoContent'>
                    <div><h3>List function</h3></div>
                    <Route path='/List/Index' component={Index} />
                    <Route path='/List/ReactPage.tsx' component={ReactPage} />
                </div>
            </div>
        )
    }
}
