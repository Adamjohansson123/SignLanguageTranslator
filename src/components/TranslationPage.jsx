import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userToState, fetchUserByName } from '../redux/User/userSlice';

const TranslationPage = ({activeUser, userByNameResult, fetchUserByName, userToState}) => {

	const history = useHistory()

	useEffect(() => {
		const checkActiveUser = async () => {
			if (!localStorage.getItem('user')) {
				history.push('/');
			}
			else if(!activeUser) {
				console.log('runs');
				if(!userByNameResult)
				await fetchUserByName(localStorage.getItem('user')) 
				if(userByNameResult)
				await userToState(userByNameResult[0])
			}
		}
		checkActiveUser()
	}, [userByNameResult])

	const [translationInput, setTranslationInput] = useState('')
	const [imageArray, setImageArray] = useState(null)

	const onChange = (e) => {
		setTranslationInput(e.target.value)
	}
	const onClick = () => {
		if(translationInput.length < 40) {

		localStorage.setItem('translation', translationInput)
		
		const data = { translation: translationInput, status: "active", FK_userId: activeUser.id };

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
	const onClickProfile = () => {
		history.push('/profile')
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

					<div className="userProfile" onClick={onClickProfile}>
						<div className="userProfileWrapper">
							<h3 className="userProfileName">{activeUser && activeUser.name}</h3>
						</div>
						<img 
							width={40} 
							height={40} 
							src="../img/usericon/usericon.png" 
							alt="user icon"
							/>
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


const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		userToState: (args) => dispatch(userToState(args)),
		fetchUserByName: (name) => dispatch(fetchUserByName(name)),
	}
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.user.activeUser,
		userByNameResult: state.user.userByNameResult
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslationPage)