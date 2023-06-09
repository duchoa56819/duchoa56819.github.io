// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyD2YC897SE46ZnDmKLv-IpbwLXy2hz9cmY",
  authDomain: "kindnessfirstimpression.firebaseapp.com",
  projectId: "kindnessfirstimpression",
  storageBucket: "kindnessfirstimpression.appspot.com",
  messagingSenderId: "966424172653",
  appId: "1:966424172653:web:05fa1302af3182cc388764",
  measurementId: "G-XBDJW8VRZK"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Retrieve and display chat messages
db.collection('messages')
  .orderBy('timestamp')
  .onSnapshot((snapshot) => {
    messageContainer.innerHTML = '';
    snapshot.forEach((doc) => {
      const message = doc.data().text;
      const p = document.createElement('p');
      p.innerText = message;
      messageContainer.appendChild(p);
    });
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });

// Send new chat messages
sendButton.addEventListener('click', () => {
  const messageText = messageInput.value;
  if (messageText.trim() !== '') {
    db.collection('messages').add({
      text: messageText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = '';
  }
});