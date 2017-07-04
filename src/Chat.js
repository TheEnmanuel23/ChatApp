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
        this.db = firebase.database().ref()
    }

    sendData () {
        let username = document.getElementById('username')
        let text = document.getElementById('text')
        
        this.db.push({username:`${username.value}`, text:`${text.value}`})
        text.value = ""
    }

    componentDidMount () {
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
                    <label htmlFor="username">UserName</label>
                    <input type="text" id="username" placeholder="Name" />
                </div>
                <div>
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