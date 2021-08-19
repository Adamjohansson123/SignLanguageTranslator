import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userToState } from '../redux/User/userSlice';
import { fetchTranslationById, updateTranslation, fetchAllTranslations } from '../redux/Translations/translationSlice';
import { connect } from 'react-redux';

const ProfilePage = (props) => {

	const {
		translations, 
		userToState, 
		activeUser, 
		updateTranslation, 
		fetchTranslationById, 
		allTranslations,
		fetchAllTranslations
	} = props

	const history = useHistory()
	//const [translations, setTranslations] = useState(null)

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			history.push('/');
		}
		
		fetchTranslationById(activeUser.id)
		fetchAllTranslations(activeUser.id)
	}, [])


    /**
	 * Method that sets all translations for the current user to 'deleted'.
	 */
	const clearTranslations = async() => {
	
		for (let translation of allTranslations) {
			console.log('runs: ' + translation);
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
		<div>
			<div>ProfilePage</div>
			<table>
				<thead>
					<th>Last 10 translations</th>
				</thead>
				{
					translations && translations.map(t => {
						if(t.status === 'active')
							return <td>{t.translation}</td>
						else 
							return <div/>
					})
				}
			</table>
			
			<button
				onClick={clearTranslations}
			>Clear</button>
			<button className="logOutBtn" onClick={logOut}>Log out</button>
		</div>
	)
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		userToState: (args) => dispatch(userToState(args)),
		fetchTranslationById: (userId) => dispatch(fetchTranslationById(userId)),
		fetchAllTranslations: (userId) => dispatch(fetchAllTranslations(userId)),
		updateTranslation: (translation) => dispatch(updateTranslation(translation)),
		
}
}

const mapStateToProps = (state) => {
	return {
		activeUser: state.user.activeUser,
		translations: state.translations.translations,
		allTranslations: state.translations.allTranslations,
		loading: state.translations.loading,
		error: state.translations.error
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)