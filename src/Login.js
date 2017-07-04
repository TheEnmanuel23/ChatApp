import React, { Component } from 'react'
import firebase from 'firebase'

class Login extends Component {  
    constructor (props) {
        super(props)
        this.login = this.login.bind(this)
        this.provider = new firebase.auth.GoogleAuthProvider()
        this.state = { username: null }
    }

    login () {
        firebase.auth().signInWithPopup(this.provider)
            .then((result) => {
                this.setState({
                    username: result.user.displayName
                })

                var loginButton =  document.getElementById('login')
                var postButton =  document.getElementById('post')
                var messageInput = document.getElementById('message')

                postButton.style.display = 'block'
                messageInput.style.display = 'block'
                loginButton.textContent = `Logged in as ${this.state.username}`

                this.props.setUserName(this.state.username)
            })
            .catch((err) => console.log(err.message) )
    }

    render () {
        return <div>
              <button id="login" onClick={this.login}>Login with Google</button>
        </div>
    }
}

export default Login