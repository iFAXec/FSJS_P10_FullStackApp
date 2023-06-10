const ErrorsDisplay = ({ errors }) => {

    let errorsDisplay = null;

    if (errors.length) {

        errorsDisplay = (
            <div>
                <h2 className='validation--errors--label'>Validation errors</h2>
                <div className='validation--errors'>
                    <ul>
                        {errors.map((error, index) => <li key={index}>{error}</li>)}
                    </ul>
                </div>
            </div>
        )
    }

    return errorsDisplay;

}

export default ErrorsDisplay;
