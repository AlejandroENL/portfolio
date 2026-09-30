import { useRef, useState } from "react";
import type { FormEvent } from "react";
import Popup from "./Popup";

type NewInputProps = {
    onAddInput: (
        requestedBy: string,
        userEmail: string,
        requestDescription: string
    ) => void;
    onClose: () => void,
    errorTitleText: string;
    errorBodyText: string;
    confirmationTitleText: string;
    confirmationBodyText: string;
    canSubmit?: boolean;
}

const COMMENT_MAX_LENGHT = 250

export function InputForm ({onAddInput, onClose, errorTitleText, errorBodyText, confirmationTitleText, confirmationBodyText, canSubmit=false}: NewInputProps) {
    
    const requestedBy = useRef<HTMLInputElement>(null);
    const userEmail = useRef<HTMLInputElement>(null);


    const [showError, setShowError] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    // const [errorVersion, setErrorVersion] = useState(0);
    const [requestDescription, setRequestDescription] = useState("");

    const openError = () => {
        setShowError(true);
        // setErrorVersion(v => v + 1);
    }
    const openConfirmation = () => {
        setShowConfirmation(true);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!canSubmit){
            console.warn('Submit blocked: One of more inputs were empty');
            return
        }

        const enteredRequestedBy = requestedBy.current!.value;
        const enteredUserEmail = userEmail.current!.value;
        const enteredRequestDescription = requestDescription;
     
        if(
            enteredRequestedBy.trim() === "" ||
            enteredUserEmail.trim() === "" ||
            enteredRequestDescription.trim() === ""
        ) {
            openError();
            return;
        }

        event.currentTarget.reset();

        onAddInput(
            enteredRequestedBy,
            enteredUserEmail,
            enteredRequestDescription
        )
        openConfirmation();

    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            // console.log(e.target.value);
        }
    }

    return(
        <div className="input-form-modal-overlay">
            <form onSubmit={handleSubmit} className="service-request-form">
                <div className="service-request-form-scroll">
                    <div className="form-field">
                    <label htmlFor="requestedBy">
                        Name
                    </label>

                    <input
                        ref={requestedBy}
                        id="requestedBy"
                        type="text"
                        maxLength={50}
                    />
                    </div>

                    <div className="form-field">
                    <label htmlFor="userEmail">
                        Email
                    </label>

                    <input
                        ref={userEmail}
                        id="userEmail"
                        type="email"
                        maxLength={50}
                    />
                    </div>

                    <div className="form-field">
                    <label htmlFor="changeDescription">
                        Change Description
                    </label>

                    <textarea
                        id="changeDescription"
                        maxLength={COMMENT_MAX_LENGHT}
                        rows={6}
                        value={requestDescription}
                        onKeyDown={handleKeyDown}
                        onChange={(event) => {
                        setRequestDescription(event.target.value);
                        }}
                    />

                    <p className="character-count">
                        {requestDescription.length}/{COMMENT_MAX_LENGHT}
                    </p>
                    </div>

                    <div className="form-actions">
                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>         

                    <button type="submit">
                        Submit
                    </button>
                    </div>
                </div>
                {showError && (
                    <Popup
                        titleText={errorTitleText}
                        bodyText={errorBodyText}
                        color="#d93125"
                        defaultIsOpen={showError}
                        onClose={() => setShowError(false)}
                    />
                )}
                {showConfirmation && (
                    <Popup
                        titleText={confirmationTitleText}
                        bodyText={confirmationBodyText}
                        color="#2ecc71"
                        defaultIsOpen={showConfirmation}
                        onClose={() => {setShowConfirmation(false); onClose();}}
                    />
                )}
            </form>
        </div>
    )

}