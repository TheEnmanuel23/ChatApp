import React, { Component } from 'react'
import firebase from 'firebase'
import config from './fb-config'

if (!firebase.apps.length)
    firebase.initializeApp(config)

class Chat extends Component {
    constructor () {
        super()
        this.sendData = this.sendData.bind(this)
        this.state = { name: 'pepe' }
        this.db = firebase.database().ref()
    }

    sendData () {
        let username = document.getElementById('username')
        let text = document.getElementById('text')
        
        this.db.set(`${username.value} says: ${text.value}`)
    }

    componentDidMount () {
        const nameRef = this.db.child('object').child('name')
        nameRef.on('value', snapshot => {
            this.setState({
                name: snapshot.val()
            })
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
                <div id="results">{ this.state.name }</div>
            </div>
        )
    }
}

export default Chat