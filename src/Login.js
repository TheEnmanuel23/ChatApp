import React, { Component } from 'react'

class Login extends Component {
    
    render () {
        return <div>
            <button id="login">Login with Google</button><br/>
            <input type="text" id="text" placeholder="Message" />
        </div>
    }
}

export default Login