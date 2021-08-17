import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const TranslationPage = () => {

	const history = useHistory()
	const location = useLocation()

	useEffect(() => {
		if(!localStorage.name) {
			history.push('/');
		}
	}, [])

	const [translationInput, setTranslationInput] = useState('')
	const [imageArray, setImageArray] = useState(null)

	const onChange = (e) => {
		setTranslationInput(e.target.value)
	}
	const onClick = () => {
		if(translationInput.length < 40) {

		localStorage.setItem('translation', translationInput)
		
		const data = { translation: translationInput, status: "active", FK_userId: location.state.data.id };

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
	else 
			alert('String too long, max 40 characters')
	}

	const renderTranslation = () => {
       setImageArray(translationInput.split('').map(e => `../img/${e}.png`))
	}

	return (
		<div className="translationPageContainer">
			<div className="translationContainer">
				<div className="translationInputContainer">
					<div className="translationInputWrapper">
						<input 
							id="translationInput"
							placeholder="Text to translate"
							name="translation"
							onChange={onChange}
						/>
						<button 
							id="translationInputBtn"
							onClick={onClick}
						>Translate</button>	
					</div>
					
				</div>
				
				<div className="translationResultContainer">
					{imageArray && imageArray.map((e,i) => {
						return <img width={100} height={100} src={e} alt="img" key={i}/>
						})
					}
 
				</div>
			</div>
			
		</div>
	)
}
export default TranslationPage