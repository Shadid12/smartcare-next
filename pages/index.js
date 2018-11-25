import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'


//icons
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import {airPlane} from 'react-icons-kit/metrize/airPlane'
import {blockMenu} from 'react-icons-kit/metrize/blockMenu'

// material ui
import Button from '@material-ui/core/Button'

// css
import '../styles/main.sass'

class Index extends React.Component {

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    return (
        <div>
            <div className="landing-container">
            <div className="side">
                <ul>
                    <li>
                        <Icon icon={home}  size={32} />
                    </li>
                    <li><Icon icon={airPlane}  size={32} /></li>
                    <li><Icon icon={blockMenu}  size={32} /></li>
                </ul>
            </div>
            <div className="first-land">
                <div>
                    <img src="https://images.unsplash.com/photo-1534774592507-488885376ad3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8f04cb891ad2a6483753e937b01e6cf1&auto=format&fit=crop&w=1350&q=80" />
                </div>
            </div>
            <div className="second-page">
                
            </div>
            </div>
            <h1 className="main-header">
                Smart Care
            </h1>
            <div className="btn-container">
            <Link href="/login">
                <Button 
                    variant="contained" 
                    color="primary"
                >
                    Get Started
                </Button>
            </Link>
            </div>
        </div>
    )
  }
}

export default connect()(Index)
