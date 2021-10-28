import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import Snackbar from '@material-ui/core/Snackbar'
import { RootState } from '../store/store'

const SaveButton = () => {
    const [open, setOpen] = useState(false)
    const settings = useSelector((state: RootState) => state.settings)
    const handleOnSave = () => {
        if (!chrome.storage) {
            return
        }

        chrome.storage.local.set({ 'settings': settings })
        setOpen(true)
    }
    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleOnSave}
            >
                {chrome.i18n.getMessage('save')}
            </Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={chrome.i18n.getMessage('saved_text')}
            />
        </>
    )
}

export default SaveButton