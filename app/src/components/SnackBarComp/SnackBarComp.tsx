import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Snackbar } from '@mui/material';

type Props = {
    message: string;
}

export type SnackBarRef = {
    showSnackBar: () => void;
}

export const SnackBarComp = forwardRef(( props: Props, ref ) => {
    // State to open the SnackBar
    const [open, setOpen] = useState<boolean>(false);

    // Method exposed to parent component using forwardRef. Method is called by parent component (TaskList) in order to show SnackBar having correct message
    const showSnackBar = (): void => {
        setOpen(true);
    }
    useImperativeHandle(ref, () => ({ showSnackBar }));

    // Method to close SnackBar before auto-hide
    const handleClose = (): void => {
        setOpen(false);
    };

    const action = (
        <Button color="secondary" size="small" onClick={handleClose}>Close</Button>
    );

    return (
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} message={props.message} action={action} />
    )
})