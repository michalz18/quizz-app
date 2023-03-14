import React from 'react';

function How({ goToQuizes }) {

    return (
        <div className='How'>
            How it works?
            <button onClick={goToQuizes}>Quizes</button>
        </div>
    )
}

export default How;