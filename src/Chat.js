import React, { Component } from 'react'
import firebase from 'firebase'
import config from './fb-config'
import './Chat.css'
import Login from './Login'

if (!firebase.apps.length)
    firebase.initializeApp(config)

class Chat extends Component {
    constructor () {
        super()
        this.sendData = this.sendData.bind(this)
        this.db = firebase.database().ref()
        this.state = { username: null }
        this.setUserName = this.setUserName.bind(this)
    }

    sendData () {
        let text = document.getElementById('text')
        
        this.db.push({username:`${this.state.username}`, text:`${text.value}`})
        text.value = ""
    }

    setUserName (username) {
        this.setState({ username: username })
    }

    componentDidMount () {
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
                <Login setUserName={this.setUserName} />
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