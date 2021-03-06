import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userToState, fetchUserByName } from '../redux/User/userSlice';
import { addNewTranslation } from '../redux/Translations/translationSlice';

const TranslationPage = (props) => {

	const { 
		activeUser, 
		userByNameResult, 
		fetchUserByName, 
		userToState, 
		addNewTranslation } = props

	const history = useHistory()
	const [translationInput, setTranslationInput] = useState('')
	const [imageArray, setImageArray] = useState(null)

	useEffect(() => {

		/**
		 * When the page is either created or refreshed the method checks if there is a username in the browsers localStorage.
		 * If there´s not then the user gets redirected to the StartUpPage to log in. If there is a username in the browsers localStorage
		 * then the method checks if there is a activeUser. If there´s not then it sets the activeUser either by userByNameResult or
		 * by sending the username from the localStorage to the fetchUserByName method. 
		 */
		const checkActiveUser = async () => {
			const storedUser = localStorage.getItem('user')
			if (!storedUser) {
				history.push('/')
			}
			if (userByNameResult && userByNameResult.length > 0) {
				await userToState(userByNameResult.find(e => e.name === storedUser))
			}
			else
				await fetchUserByName(storedUser)
		}
		checkActiveUser()
	}, [userByNameResult])

	/**
	 * Separate hook that fetches a full user object using the name stored in the localstorage,
	 * updates the fetched user since last logged in session.
	 */
	useEffect(() => {
		const refreshUser = async () => {
			await fetchUserByName(localStorage.getItem('user'))
		}
		refreshUser()
	}, [])

	const onChange = (e) => {
		setTranslationInput(e.target.value)
	}

	/**
	 * Method that checks if the translation input is valid or not. If the input is OK then a new translation is added to the database
	 * and the array that holds each image that is used to display the translation from text to sign language is also set.
	 */
	const onClick = () => {
		if (translationInput.length === 0) {
			alert('Please enter text to translate')
			return
		}
		if (translationInput.length < 40) {
			const checkForSpecialChars = /^[a-zA-Z\s]*$/
			if (!checkForSpecialChars.test(translationInput)) {
				alert('Invalid input - translation input can only contain letters')
			}
			else {
				const data = { 
					translation: translationInput, 
					status: "active", 
					FK_userId: activeUser.id 
				};

				addNewTranslation(data)
				localStorage.setItem('translation', translationInput)
				setImageArray(translationInput.replace(/[^a-zA-Z]/g, '').toLowerCase().split('').map(e => `../img/${e}.png`))
			}
		}
		else
			alert('String too long, max 40 characters')
	}

	const onClickProfile = () => {
		history.push('/profile')
	}

	return (
		<div className="pageContainer">
			<div>
				<div className="translationPageTxt">LOST IN TRANSLATION</div>
				<input
					className="translationPageInput"
					id="translationInput"
					placeholder="Text to translate..."
					name="translation"
					onChange={onChange}
				/>
			</div>
			<div>
				<button
					className="translateBtn"
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
			<div className="translationResultContainer">
				{imageArray && imageArray.map((e, i) => {
					return <img width={100} height={100} src={e} alt="img" key={i} />
				})
				}
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		userToState: (args) => dispatch(userToState(args)),
		fetchUserByName: (name) => dispatch(fetchUserByName(name)),
		addNewTranslation: (translation) => dispatch(addNewTranslation(translation))
	}
}

const mapStateToProps = (state) => {
	return {
		activeUser: state.user.activeUser,
		userByNameResult: state.user.userByNameResult
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslationPage)