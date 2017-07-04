import React, { Component } from 'react'
import firebase from 'firebase'
import config from './fb-config'
import './Chat.css'

if (!firebase.apps.length)
    firebase.initializeApp(config)

class Chat extends Component {
    constructor () {
        super()
        this.sendData = this.sendData.bind(this)
        this.login = this.login.bind(this)

        this.db = firebase.database().ref()

        this.username = null


        this.provider = new firebase.auth.GoogleAuthProvider()
    }

    sendData () {
        let text = document.getElementById('text')
        
        this.db.push({username:`${this.username}`, text:`${text.value}`})
        text.value = ""
    }

    login () {
        firebase.auth().signInWithPopup(this.provider)
            .then((result) => {
                this.username = result.user.displayName
                var loginButton =  document.getElementById('login')
                var postButton =  document.getElementById('post')
                var messageInput = document.getElementById('message')
                postButton.style.display = 'block'
                messageInput.style.display = 'block'
                loginButton.textContent = `Logged in as ${this.username}`
            })
            .catch((err) => console.log(err.message) )
    }

    componentDidMount () {
        var loginButton =  document.getElementById('login')
        var postButton =  document.getElementById('post')
        var messageInput = document.getElementById('message')
        postButton.style.display = 'none'
        messageInput.style.display = 'none'

        this.db.on('child_added', (snapshot) => {
            var msg = snapshot.val()

            var msgUsernameElement = document.createElement('b')
            msgUsernameElement.textContent = msg.username

            var msgTextElement = document.createElement('p')
            msgTextElement.textContent = msg.text

            var msgElement = document.createElement('div')
            msgElement.className = 'msg'
            msgElement.appendChild(msgUsernameElement)
            msgElement.appendChild(msgTextElement)

            document.getElementById('results').appendChild(msgElement)
        })
    }

    render () {
        return (
            <div>
                <div>
                <button id="login" onClick={this.login}>Login with Google</button><br/>
            </div>
            <div id="message">
                <label htmlFor="text">Message</label>
                <input type="text" id="text" placeholder="Message"/>
            </div>
            <button id="post" onClick={this.sendData}>Post</button>
            <div id="results"></div>
        </div>
        )
    }
}

export default Chat