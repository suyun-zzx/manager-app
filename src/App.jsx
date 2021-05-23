import React, { Component,Suspense } from 'react'
import {renderRoutes} from 'react-router-config'
import './App.less'
import Loding from './components/Loding'
import routes from './router'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Suspense fallback={<Loding />}>
          {renderRoutes(routes)}
        </Suspense>
      </div>
    )
  }
}