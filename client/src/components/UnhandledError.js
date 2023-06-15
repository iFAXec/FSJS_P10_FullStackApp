import React from 'react'


/**
 * The helper function to display error message
 * @returns - an error message when called
 */
const UnhandledError = () => {

    return (
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    );

}

export default UnhandledError;