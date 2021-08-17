import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';


const StartUpPage = () => {

	const history = useHistory()

	useEffect(() => {
		if(localStorage.length > 0) {
			history.push('/translation');
		}
	}, [])

	const [value, setValue] = useState('')

	const onChange = (e) => {
		setValue(e.target.value)
	}
	const onClick = () => {
		if(value.match(/^[a-zA-Z]{1,16}$/)) {

			localStorage.setItem('name', value)

			const data = { name: value };

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
				history.push('/translation', {data: data});
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
export default StartUpPage