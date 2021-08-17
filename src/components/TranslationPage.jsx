import { useState, useEffect } from 'react'

const TranslationPage = (props) => {

    useEffect(() => {
        if(localStorage.length < 1) {
            props.history.push('/');
        }
    }, [])

	const [translationInput, setTranslationInput] = useState('')
	const [imageArray, setImageArray] = useState(null)

	const onChange = (e) => {
		setTranslationInput(e.target.value)
	}
	const onClick = () => {
		localStorage.setItem('translation', translationInput)

		const data = { translation: translationInput };

		fetch('http://localhost:3000/translation', {
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
		
		renderTranslation();
	}

	const renderTranslation = () => {
        
		
        setImageArray(translationInput.split('').map(e => `../img/${e}.png`))
	}

	return (
		<div>TranslationPage

            
			<input 
				id="translationInput"
				placeholder="Text to translate"
				name="translation"
				onChange={onChange}
			/>
			<button 
				className="translationInputBtn"
				onClick={onClick}
			/>	
            
            <div>
               {imageArray && imageArray.map((e,i) => <img src={e} alt="img" key={i}></img>)} 
            </div>
            
            
        
			
		</div>
	)
}
export default TranslationPage