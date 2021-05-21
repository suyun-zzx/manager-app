import React, { Component,Suspense } from 'react'
import {renderRoutes} from 'react-router-config'
import Loding from './components/Loding'
import routes from './router'

export default class App extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<Loding />}>
          {renderRoutes(routes)}
        </Suspense>
      </div>
    )
  }
}