import { useEffect, useRef } from "react";
// Replace with open souce import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'jimu-ui'

interface popupProps {
    titleText: string;
    bodyText?: string
    onClose: () => void
    defaultIsOpen: boolean
    color: string
}

export default function Popup({ titleText, bodyText, defaultIsOpen, color, onClose}: popupProps){

    const dialogRef = useRef<HTMLDialogElement>(null);

    const handlePopupClose = () => {

        onClose();
    }

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (defaultIsOpen && !dialog.open) {
            dialog.showModal();
        }
        if (!defaultIsOpen && dialog.open) {
        dialog.close();
        }

    }, [defaultIsOpen]);


    return(
        <dialog ref={dialogRef} className="popup">

        <div className="popup-header" style={{backgroundColor: color}}>
            <h2>{titleText}</h2>
        </div>

        <div className="popup-body">
            {bodyText}
        </div>

        <div className="popup-footer">
            <button onClick={handlePopupClose}>
            Close
            </button>
        </div>

        </dialog>


    )

}