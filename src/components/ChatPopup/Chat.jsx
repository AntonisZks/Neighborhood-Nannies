import { useEffect, useState } from 'react';
import { doc, getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebase';
import './Chat.css';


export default function Chat(props) {
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        const collectionName = props.receiverRole === 'parent' ? 'Parents' : 'Nannies';

        const fetchMessages = async () => {
            try {
                // Fetch sender messages
                console.log(`${collectionName}/${props.receiverID}/Chats/${props.contactID}/sender_messages`);
                const senderSnapshot = await getDocs(collection(firestore, `${collectionName}/${props.receiverID}/Chats/${props.contactID}/sender_messages`));
                const senderMessagesArray = senderSnapshot.docs.map(doc => ({
                    id: doc.id,
                    type: 'sender',
                    ...doc.data()
                }));

                // Fetch receiver messages
                console.log(`${collectionName}/${props.receiverID}/Chats/${props.contactID}/receiver_messages`);
                const receiverSnapshot = await getDocs(collection(firestore, `${collectionName}/${props.receiverID}/Chats/${props.contactID}/receiver_messages`));
                const receiverMessagesArray = receiverSnapshot.docs.map(doc => ({
                    id: doc.id,
                    type: 'receiver',
                    ...doc.data()
                }));

                // Merge and sort by time_created
                const merged = [...senderMessagesArray, ...receiverMessagesArray];
                const sorted = merged.sort((a, b) => {
                    // Handle both Firestore Timestamp and regular date objects
                    const timeA = a.time_created?.toDate ? a.time_created.toDate() : new Date(a.time_created);
                    const timeB = b.time_created?.toDate ? b.time_created.toDate() : new Date(b.time_created);
                    return timeA - timeB;
                });

                setAllMessages(sorted);
            }
            catch (error) {
                console.log(error.message);
            }
        }

        fetchMessages();

    }, [props.contactID, props.refreshTrigger]);

    return (
        <div className="messages_container">
            {allMessages.map((message) => (
                <div 
                    key={message.id} 
                    className={`message ${message.type === 'sender' ? 'sender_message' : 'receiver_message'}`}
                >
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    )
}
