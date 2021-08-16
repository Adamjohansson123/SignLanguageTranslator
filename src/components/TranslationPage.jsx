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
		//const translation = translationInput.split('')
		//setImageArray(translation)
        let arr = []
        translationInput.split('').map(e => {
            let image = <img src = {require("../img/individial_signs/" + e + ".png")} />
            arr.push(image);
            console.log(e);
        });
        console.log(arr);
        return arr;
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
               {renderTranslation} 
            </div>
            
            
            <img>{image}</img>
        
			
		</div>
	)
}
export default TranslationPage