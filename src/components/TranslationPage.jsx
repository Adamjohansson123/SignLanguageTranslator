import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userToState, fetchUserByName } from '../redux/User/userSlice';
import { addNewTranslation } from '../redux/Translations/translationSlice';

const TranslationPage = ({activeUser, userByNameResult, fetchUserByName, userToState, addNewTranslation}) => {

	const history = useHistory()

	useEffect(() => {

		document.body.style.backgroundColor = '#F79824'

		const checkActiveUser = async () => {
			if (!localStorage.getItem('user')) {
				history.push('/');
			}
			else if(!activeUser) {
				if(userByNameResult)
					await userToState(userByNameResult[0])
				else
					await fetchUserByName(localStorage.getItem('user')) 
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
		addNewTranslation(data)

		
		setImageArray(translationInput.toLowerCase().split('').map(e => `../img/${e}.png`))
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


const mapDispatchToProps = (dispatch, ownProps) => {
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