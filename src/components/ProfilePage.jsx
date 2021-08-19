import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userToState, fetchUserByName } from '../redux/User/userSlice';
import { fetchTranslationById, updateTranslation, fetchAllTranslations } from '../redux/Translations/translationSlice';
import { connect } from 'react-redux';
import { act } from 'react-dom/test-utils';

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

		document.body.style.backgroundColor = '#F79824'

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

	const logOut = () => {
		userToState(null);
		localStorage.clear();
		history.push('/');
	}

	return (
		<div className="pageContainer">
			<div className="profilePageTxt">Profile</div>
			<div className="lastTranslationsTxt">Your 10 last translations</div>
			<div>
				<table>
					{
						translations && translations.map(t => {
							if (t.status === 'active')
								return <div>
									<tr>
										<td>{t.translation}</td>
									</tr>
								</div>
							else
								return <div />
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