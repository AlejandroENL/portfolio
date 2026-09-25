import React, { FormEvent, useRef, useState } from 'react';
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
    canSubmit?: boolean;
}

const COMMENT_MAX_LENGHT = 250

export function InputForm ({onAddInput, onClose, errorTitleText, errorBodyText, canSubmit=false}: NewInputProps) {
    
    const requestedBy = useRef<HTMLInputElement>(null);
    const userEmail = useRef<HTMLInputElement>(null);


    const [showError, setShowError] = useState(false);
    // const [errorVersion, setErrorVersion] = useState(0);
    const [requestDescription, setRequestDescription] = useState("");

    const openError = () => {
        setShowError(true);
        // setErrorVersion(v => v + 1);
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
            enteredRequestDescription.trim() === " "
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
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
        }
    }

    return(
        <div className="input-form-modal-overlay">
            <form onSubmit={handleSubmit} className="service-request-form">
                <div className="service-request-form-scroll">
                    <div className="form-field">
                    <label htmlFor="requestedBy">
                        Requested By
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
                        titleText='Error'
                        bodyText='One or More Inputs Were Empty'
                        defaultIsOpen={showError}
                        onClose={() => setShowError(false)}
                    />
                )}
            </form>
        </div>
    )

}