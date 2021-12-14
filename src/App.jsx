import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot } from "firebase/firestore"
import moment from 'moment';
import './App.css';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom'

const App = () => {

  const [newMsg, setNewMsg] = useState('')
  const [messages, setMessages] = useState([])

  const db = getFirestore()
  const chatRef = collection(db, 'chat')

  const q = query(chatRef, orderBy("timestamp", "asc"), limit(100));
  
  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();

  const sendMsg = async () => {
    setNewMsg('')
    try {
      await addDoc(collection(db, "chat"), {
        message: newMsg,
        timestamp: moment.utc().valueOf()
      });
      scrollToBottom()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => { 
    const unsub = onSnapshot(q, (snapshot) => {
      const tmp = []
      snapshot.forEach(doc => {
        const utc = doc.data().timestamp
        const local = moment(utc).local().format('YYYY-MM-DD HH:mm:ss')
        const msg = {
          id: doc.id,
          message: doc.data().message,
          timestamp: local
        }
        tmp.push(msg)
      })
      setMessages(tmp)
      
    });
  })

  return (
    <div className="app">
      <div className="sign-form">
        <ScrollToBottom className="chat" sticky>
          {messages.length > 0 && 
            messages.map( (message) => (
              <div key={message.id}>
                <hr />
                <h5>
                  {message.timestamp}
                </h5>
                <p>
                  {message.message}
                </p>
              </div>
            ))
          }
        </ScrollToBottom>
        <input type="text" placeholder='message'
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)} />
        <button onClick={sendMsg} disabled={!newMsg}>Send</button>
      </div>
    </div>
  );
}

export default App;
