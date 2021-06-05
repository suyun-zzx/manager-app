import React, { Component } from 'react'
import './index.less'

export class LinkButton extends Component {
    render() {
        return (
            <button {...this.props} className='link-button' />
        )
    }
}

export class TextButton extends Component {
    render() {
        return(
            <span {...this.props} className='text-button' />
        )
    }
}