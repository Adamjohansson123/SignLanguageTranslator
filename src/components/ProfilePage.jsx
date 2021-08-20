import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userToState, fetchUserByName } from '../redux/User/userSlice';
import { fetchTranslationById, updateTranslation, fetchAllTranslations } from '../redux/Translations/translationSlice';
import { connect } from 'react-redux';

const ProfilePage = (props) => {

	const {
		translations,
		userToState,
		userByNameResult,
		activeUser,
		updateTranslation,
		fetchTranslationById,
		allTranslations,
		fetchAllTranslations,
		fetchUserByName
	} = props

	const history = useHistory()

	useEffect(() => {

		/**
		 * When the page is either created or refreshed the method checks if there is a username in the browsers localStorage.
		 * If there´s not then the user gets redirected to the StartUpPage to log in. If there is a username in the browsers localStorage
		 * then the method checks if there is a activeUser. If there´s not then it sets the activeUser either by userByNameResult or
		 * by sending the username from the localStorage to the fetchUserByName method. If there is a activeUser then the id of that user
		 * is sent to the fetchTranslationById method and the fetchAllTranslations to fetch all translations that are connected to the current user.
		 */
		const checkActiveUser = async () => {
			if (!localStorage.getItem('user')) {
				history.push('/');
			}
			else if(!activeUser) {
				await fetchUserByName(localStorage.getItem('user')) 
				
				if(userByNameResult)
				await userToState(userByNameResult[0])
			}
			if (activeUser) {
				fetchTranslationById(activeUser.id)
				fetchAllTranslations(activeUser.id)
			}
		}
		checkActiveUser()

	}, [userByNameResult, activeUser])


	/**
	 * Method that sets all translations for the current user to 'deleted'. 
	 */
	const clearTranslations = async () => {

		for (let translation of allTranslations) {
			const update = {
				FK_userId: translation.FK_userId,
				id: translation.id,
				status: 'deleted',
				translation: translation.translation
			}
			await updateTranslation(update)
		}
	}

	const onClickGoBack = () => {
		history.push('/translation')
	}

	/**
	 * Method for logging out. If the user logs out then the current user is set to null with the userToState
	 * method, the localStorage gets cleared and the user gets redirected to the StartUpPage. 
	 */
	const logOut = () => {
		userToState(null);
		localStorage.clear();
		history.push('/');
	}

	return (
		<div className="pageContainer">
			<div className="profilePageTxt">Profile</div>
			<div className="lastTranslationsTxt">Your 10 last translations</div>

			<div className="goBackArrow" onClick={onClickGoBack}>
				<img
					width={40}
					height={40}
					src="../img/gobackicon/arrow.png"
					alt="user icon"
				/>
			</div>

			<div>
				<table>
					{
						translations && translations.map((t,i) => {
							if (t.status === 'active')
								return <tbody key={i}>
									<tr>
										<td>{t.translation}</td>
									</tr>
								</tbody>
							else
								return <tbody />
						})
					}
				</table>
			</div>

			<button className="clearBtn" onClick={clearTranslations}>Clear</button>
			<button className="logOutBtn" onClick={logOut}>Log out</button>
		</div>
	)
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		userToState: (args) => dispatch(userToState(args)),
		fetchUserByName: (name) => dispatch(fetchUserByName(name)),
		fetchTranslationById: (userId) => dispatch(fetchTranslationById(userId)),
		fetchAllTranslations: (userId) => dispatch(fetchAllTranslations(userId)),
		updateTranslation: (translation) => dispatch(updateTranslation(translation)),

	}
}

const mapStateToProps = (state) => {
	return {
		activeUser: state.user.activeUser,
		userByNameResult: state.user.userByNameResult,
		translations: state.translations.translations,
		allTranslations: state.translations.allTranslations,
		loading: state.translations.loading,
		error: state.translations.error
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)