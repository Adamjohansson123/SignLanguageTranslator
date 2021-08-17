import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { userToState } from '../redux/User/userSlice';
import { connect } from 'react-redux';

const StartUpPage = (props) => {

	const history = useHistory()

	/* useEffect(() => {
		if(props.activeUser) {
			history.push('/translation');
		}
	}, []) */

	const [username, setUsername] = useState('')

	const onChange = (e) => {
		setUsername(e.target.value)
	}
	const onClick = () => {
		if(username.match(/^[a-zA-Z]{1,16}$/)) {		// Check if username is correct format 

			

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
				props.userToState(data)								// Send to redux user state
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
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.user.activeUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartUpPage)