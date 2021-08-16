import { useEffect } from 'react';

const ProfilePage = (props) => {

    useEffect(() => {
        if(localStorage.length < 1) {
            props.history.push('/');
        }
    }, [])

    return (
        <div>ProfilePage</div>
    )
}
export default ProfilePage