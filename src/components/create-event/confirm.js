import { useSelector } from "react-redux"

export const ConfirmFlags = () => {
    const {loading, submittedForm, savedDraft} = useSelector(state => state.eventFormState)
    console.log("All flags: ", loading, submittedForm, savedDraft)
    return(
        <>
            <h3>Loading: {''+loading}</h3>
            <h3>Submitted Form?: {''+submittedForm}</h3>
            <h3>Saved Draft?: {''+savedDraft}</h3>
        </>
    )
} 