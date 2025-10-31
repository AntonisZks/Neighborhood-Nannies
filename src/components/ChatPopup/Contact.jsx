import { useEffect, useState } from 'react';
import { doc, getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebase';
import DefaultProfileImage from '../../assets/imgs/default_profile_picture.jpg';
import './Contact.css';


export default function Contact(props) {
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userProfileImage, setUserProfileImage] = useState(DefaultProfileImage);

    useEffect(() => {
        const fetchUserFullName = async () => {
            const collectionName = props.userRole === 'parent' ? 'Parents' : 'Nannies';
            try {
                const querySnapshot = await getDocs(collection(firestore, `${collectionName}`));
                const usersArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const user = usersArray.find(user => user.id === props.userID);
                if (user) {
                    setUserFirstName(user.first_name);
                    setUserLastName(user.last_name);
                    // Use user's profile image if it exists, otherwise use default
                    setUserProfileImage(user.profileImageUrl || DefaultProfileImage);
                }
            }
            catch (error) {
                console.log(error.message);
            }
        }
        
        fetchUserFullName();

    }, [props.userID, props.userRole]);

    return (
        <div className="contact_outer_container" onClick={props.onClick}>
            <div className={`contact_inner_container ${props.isSelected ? 'selected' : ''}`}>
                <img src={userProfileImage} alt="Profile" />
                <h1>{userFirstName} {userLastName}</h1>
            </div>
        </div>
    )
}
