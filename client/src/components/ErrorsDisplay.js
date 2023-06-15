/**
 * The helper function checks for error and displays on the screen
 * @param {errors} param0 - take a error object
 * Initialise a errorDisplay variable 
 * Checks if object has any elements
 * @returns teh error validation in html format
 */


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
