import { useState, useEffect } from 'react';
import Contact from './Contact';
import Chat from './Chat';
import { collection, getDocs,getDoc, updateDoc, addDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import './ChatPopup.css';

export default function ChatPopup({ newContact }) {
    const [userID, setUserID] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [selectedSenderID, setSelectedSenderID] = useState(null);
    const [selectedContactID, setSelectedContactID] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const storedUserRole = window.localStorage.getItem('userRole');
        if (storedUserRole) {
            setUserRole(storedUserRole);
            if (storedUserRole === 'parent') {
                const parentID = window.localStorage.getItem('parentID');
                setUserID(parentID);
            } else if (storedUserRole === 'nanny') {
                const nannyID = window.localStorage.getItem('nannyID');
                setUserID(nannyID);
            }
        }
    }, []);

    useEffect(() => {
        const fetchParentContacts = async (parentID) => {
            const contactsSnapshot = await getDocs(collection(firestore, `Parents/${parentID}/Chats`));
            const contacts = contactsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return contacts;
        }

        const fetchNannyContacts = async (nannyID) => {
            const contactsSnapshot = await getDocs(collection(firestore, `Nannies/${nannyID}/Chats`));
            const contacts = contactsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return contacts;
        }

        const fetchUserContacts = async () => {
            try {
                if (userRole && userID) {
                    let fetchedContacts = [];
                    if (userRole === 'parent') {
                        fetchedContacts = await fetchParentContacts(userID);
                    }
                    else if (userRole === 'nanny') {
                        fetchedContacts = await fetchNannyContacts(userID);
                    }
                    
                    // Check if newContact is provided and not already in the list
                    if (newContact && !fetchedContacts.some(c => c.sender_id === newContact.sender_id)) {
                        fetchedContacts = [newContact, ...fetchedContacts];
                    }
                    
                    setContacts(fetchedContacts);
                }
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchUserContacts();
    })

    // Effect to handle newContact selection and save to Firebase
    useEffect(() => {
        const saveContactToFirebase = async () => {
            if (newContact && newContact.isTemporary && userID && userRole) {
                try {
                    const collectionName = userRole === 'parent' ? 'Parents' : 'Nannies';
                    const contactCollectionName = userRole === 'parent' ? 'Nannies' : 'Parents';
                    
                    // Generate a consistent chat ID by sorting the two user IDs
                    // This ensures the same chat ID is used for both users
                    const chatID = [userID, newContact.sender_id].sort().join('_');
                    
                    // Create chat document for current user (parent/nanny)
                    const chatRef = doc(firestore, `${collectionName}/${userID}/Chats`, chatID);
                    await setDoc(chatRef, {
                        sender_id: newContact.sender_id,
                        id: chatID,
                        created_at: new Date()
                    });
                    
                    // Create reciprocal chat document for the contact (nanny/parent)
                    const reciprocalChatRef = doc(firestore, `${contactCollectionName}/${newContact.sender_id}/Chats`, chatID);
                    await setDoc(reciprocalChatRef, {
                        sender_id: userID,
                        id: chatID,
                        created_at: new Date()
                    });
                    
                    console.log('Contact saved to Firebase successfully with chat ID:', chatID);
                    
                    // Select the contact using the shared chat ID
                    setSelectedSenderID(newContact.sender_id);
                    setSelectedContactID(chatID);
                } catch (error) {
                    console.error('Error saving contact to Firebase:', error);
                }
            } else if (newContact) {
                // If it's not temporary, just select it
                setSelectedSenderID(newContact.sender_id);
                setSelectedContactID(newContact.id);
            }
        };
        
        saveContactToFirebase();
    }, [newContact, userID, userRole]);

    const closePopup = (e) => {
        if (e.target.id === 'chat_popup_window' || e.target.className === 'fa-solid fa-xmark close_button') {
            const chatPopup = document.getElementById('chat_popup_window');
            if (chatPopup) {
                chatPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    }

    const handleSendMessage = async () => {
        if (messageInput.trim()) {
            let collectionName = userRole === 'parent' ? 'Parents' : 'Nannies';
            await addDoc(collection(firestore, `${collectionName}/${userID}/Chats/${selectedContactID}/receiver_messages`), {
                message: messageInput,
                time_created: new Date()
            })
            collectionName = userRole === 'parent' ? 'Nannies' : 'Parents';
            await addDoc(collection(firestore, `${collectionName}/${selectedSenderID}/Chats/${selectedContactID}/sender_messages`), {
                message: messageInput,
                time_created: new Date()
            })
            console.log('Sending message:', messageInput);
            setMessageInput('');
            // Trigger chat refresh
            setRefreshTrigger(prev => prev + 1);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div id='chat_popup_window' className="outer_container" onClick={closePopup}>
            <div className="popup_window">
                <i className="fa-solid fa-xmark close_button" onClick={closePopup}></i>
                <div className="contacts_panel">
                    {contacts.map((contact, index) => (
                        <Contact 
                            key={index}
                            userID={contact.sender_id}
                            contact_id={contact.id}
                            userRole={userRole === 'parent' ? 'nanny' : 'parent'}
                            isSelected={selectedContactID === contact.id}
                            onClick={() => {
                                setSelectedSenderID(contact.sender_id);
                                setSelectedContactID(contact.id);
                            }}
                        />
                    ))}
                </div>
                <div className="messages_panel">
                    <Chat 
                        receiverID={userID} 
                        senderID={selectedSenderID}
                        contactID={selectedContactID}
                        receiverRole={userRole}
                        senderRole={userRole === 'parent' ? 'nanny' : 'parent'}
                        refreshTrigger={refreshTrigger}
                    />
                    <div className="message_input_container">
                        <input
                            type="text"
                            className="message_input"
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button 
                            className="send_button" 
                            onClick={handleSendMessage}
                            disabled={!messageInput.trim()}
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
