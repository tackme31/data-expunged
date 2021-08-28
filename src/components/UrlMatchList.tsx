import { useDispatch, useSelector } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

import { addNewUrlMatchAction, deleteUrlMatchAction, updateUrlMatchAction } from '../store/actions'
import { RootState } from '../store/store'
import UrlMatch from './UrlMatch'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: '2rem'
		},
		list: {
			display: 'flex',
			flexWrap: 'wrap',
			listStyle: 'none',
			width: '100%',
		},
	}),
)

const Settings = () => {
	const dispatch = useDispatch()
	const { urlMatches } = useSelector((state: RootState) => state.settings)
	const classes = useStyles()

	return (
		<div className={classes.root}>
			{
				urlMatches.map((match, i) => (
					<li key={i} className={classes.list}>
						<IconButton aria-label="delete" size="small" onClick={() => dispatch(deleteUrlMatchAction(i))}>
							<DeleteIcon />
						</IconButton>	
						<UrlMatch match={match} onChange={(m) => dispatch(updateUrlMatchAction(m, i))} />
					</li>
				))
			}
			<IconButton aria-label="add" onClick={() => dispatch(addNewUrlMatchAction())} size="small">
				<AddIcon />
			</IconButton>
		</div>
	)
}

export default Settings