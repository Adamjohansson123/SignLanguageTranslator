import { useState } from 'react'
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const StartUpPage = (props) => {

    useEffect(() => {
        if(localStorage.length > 0) {
            props.history.push('/translation');
        }
    }, [])

	const [value, setValue] = useState('')

	const onChange = (e) => {
		setValue(e.target.value)
		console.log(value);
	}
	const onClick = () => {
		localStorage.setItem('name', value)

		const data = { name: value };

		fetch('http://localhost:3000/user', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
			console.log(props.history);

        props.history.push('/translation');
    
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
					/>
		</div>

			
	)
}
export default withRouter(StartUpPage)