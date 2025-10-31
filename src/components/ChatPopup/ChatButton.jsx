import { useEffect, useState } from 'react';
import './ChatButton.css';


export default function ChatButton() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const parentID = window.localStorage.getItem('parentID');
        const nannyID = window.localStorage.getItem('nannyID');
        if (parentID || nannyID) {
            setIsUserLoggedIn(true);
        }
    }, []);

    const handleClick = () => {
        const chatPopup = document.getElementById('chat_popup_window');
        if (chatPopup) {
            if (chatPopup.style.display === 'none' || chatPopup.style.display === '') {
                chatPopup.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    }

    return (
        isUserLoggedIn && (
            <button className="chat_button" onClick={handleClick}>
              <i className="fa-solid fa-comments"></i>
            </button>
        )
    )
}
