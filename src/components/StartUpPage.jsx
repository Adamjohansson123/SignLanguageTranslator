import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { userToState, fetchAllUsers } from '../redux/User/userSlice';
import { connect } from 'react-redux';

const StartUpPage = ({ userToState, users, fetchAllUsers }) => {

	const history = useHistory()

	useEffect(() => {
		
			
		if(users.length > 0 ) {
			if (localStorage.getItem('user')) {
				
				const user = checkUserExists(localStorage.getItem('user'))
				userToState(user)
				history.push('/translation');
			}
		}
		else {
			fetchAllUsers()
		}
		
	}, [users])

	const [username, setUsername] = useState('')

	const onChange = (e) => {
		setUsername(e.target.value)
	}
	const onClick = () => {
		const user = checkUserExists(username)
		if (user) {
			if (username.match(/^[a-zA-Z]{1,16}$/)) {
				localStorage.setItem("user", username)
				userToState(user)
				history.push('/translation');
			}
			else {
				alert('Invalid input - name must contain between 1-16 characters and only letters')
			}
		}
		else {
			if (username.match(/^[a-zA-Z]{1,16}$/)) {		// Check if username is correct format 		

				const data = { name: username };

				fetch('http://localhost:5000/user', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				})
					.then(response => response.json())
					.then(data => {
						console.log('Success:', data);
						userToState(data)								// Send to redux user state
						localStorage.setItem('user', data.name)
						history.push('/translation');
					})
					.catch((error) => {
						console.error('Error:', error);
					});
			}
			else {
				alert('Invalid input - name must contain between 1-16 characters and only letters')
			}
		}
	}

	const checkUserExists = (username) => {
		for (const key of users) {
			if (key.name === username) {
				return key
			}
			else 
				return false
		}
	}

	return (
		<div>
			<div>Please enter your name</div>
			<input
				id="fullNameInput"
				placeholder="Enter your name"
				name="name"
				onChange={onChange}
			/>
			<button
				className="nameInputBtn"
				onClick={onClick}
			>Log in</button>
		</div>


	)
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		userToState: (args) => dispatch(userToState(args)),
		fetchAllUsers: () => dispatch(fetchAllUsers())
	}
}

const mapStateToProps = (state) => {
	return {
		activeUser: state.user.activeUser,
		users: state.user.users,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StartUpPage)