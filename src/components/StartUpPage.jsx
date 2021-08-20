import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { userToState, fetchAllUsers } from '../redux/User/userSlice';
import { connect } from 'react-redux';

const StartUpPage = ({ userToState, users, fetchAllUsers }) => {

	const history = useHistory()

	useEffect(() => {

		document.body.style.backgroundColor = '#F79824'

		/**
		 * When the page is either created or refreshed the method fetch all users. If there is a username in the browsers localStorage
		 * then the username gets sent to the checkUserExists method that checks if the user exists or not. If it exists then the method returns 
		 * the user object that´s connected with that username. The user object is then sent to the userToState method in redux which sets the current user.
		 * The user then gets redirected to the translation page.  
		 */
		const checkActiveUser = async () => {
			await fetchAllUsers()

			if (localStorage.getItem('user')) {
				const user = checkUserExists(localStorage.getItem('user'))
				userToState(user)
				history.push('/translation');
			}

		}
		checkActiveUser()
	}, [])

	const [username, setUsername] = useState('')

	const onChange = (e) => {
		setUsername(e.target.value)
	}

	/**
	 * Method that takes in a username from the input field. It then sends the username to another method that checks if the user already exist or not. 
	 * If it exists in the database then the user gets logged in as the existing user and redirected to the translation page. If the user doesn´t exist in the database
	 * then a new user is created and stored in the database. 
	 */
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
			if (username.match(/^[a-zA-Z]{1,16}$/)) {  // Check if username is correct format 		

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
						userToState(data) // Send the data to redux user state
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

	/**
	 * 
	 * @param {*} username Takes in a username (string) as a argument
	 * @returns Either a user object or false, depending on if the user exists in the database or not. 
	 */
	const checkUserExists = (username) => {
		for (const key of users) {
			if (key.name === username) {
				return key
			}
		}
		return false
	}

	return (
		<div className="pageContainer">
			<div className="startPageTxt">Sign Language Translator</div>
			<div>
				<input
					className="startPageInput"
					id="fullNameInput"
					placeholder="Enter your name..."
					name="name"
					onChange={onChange}
				/>
			</div>

			<div>
				<button
					className="nameInputBtn"
					onClick={onClick}
				>Log in</button>
			</div>


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