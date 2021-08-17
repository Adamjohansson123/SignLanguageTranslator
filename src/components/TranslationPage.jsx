import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const TranslationPage = (props) => {

	useEffect(() => {
		if(localStorage.length < 1) {
			props.history.push('/');
		}
	}, [])

	const [translationInput, setTranslationInput] = useState('')
	const [imageArray, setImageArray] = useState(null)

	const onChange = (e) => {
		if(translationInput.length < 40)
			setTranslationInput(e.target.value)
		else 
			alert('Too long string, max 40 characters')
	}
	const onClick = () => {
		localStorage.setItem('translation', translationInput)
		
		const data = { translation: translationInput };

		fetch('http://localhost:5000/translation', {
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
		
		
		renderTranslation();
	}

	const renderTranslation = () => {
    setImageArray(translationInput.split('').map(e => `../img/${e}.png`))
	}

	return (
		<div>TranslationPage
			<div className="translationContainer">
				<div className="translationInputContainer">
					<input 
						id="translationInput"
						placeholder="Text to translate"
						name="translation"
						onChange={onChange}
					/>
					<button 
						className="translationInputBtn"
						onClick={onClick}
					>Translate</button>	
				</div>
				
				<div className="translationResultContainer">
					{imageArray && imageArray.map((e,i) => <img src={e} alt="img" key={i}></img>)} 
				</div>
			</div>
			
		</div>
	)
}
export default withRouter(TranslationPage)