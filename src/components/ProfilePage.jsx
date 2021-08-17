import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ProfilePage = () => {

    const history = useHistory()
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!localStorage.name) {
            history.push('/');
        }

        fetch('http://localhost:5000/translation?_sort=id&_order=desc&_limit=10&status=active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {

                setData(data)
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    const clearTranslations = async() => {
        for (let item of data) {
					console.log(data);
						console.log(item);
            item.status = "deleted";
						

            await fetch('http://localhost:5000/translation/' + item.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
                .then(response => response.json())
                .then(data => {
                    setData(null)
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    }

    const logOut = () => {
        history.push('/');
        localStorage.clear();
    }

    return (
        <div>
            <div>ProfilePage</div>

            <table>
                <thead>
                    <th>Last 10 translations</th>
                </thead>

                {
                    data && data.map(t =>
                        <td>{t.translation}</td>
                    )
                }

            </table>

            <button
                onClick={clearTranslations}
            >Clear</button>

            <button className="logOutBtn" onClick={logOut}>Log out</button>
        </div>


    )
}
export default ProfilePage