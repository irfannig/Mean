import React from 'react';

class About extends React.Component {

    render() {
        return (
            <>
                <h1>I am About page</h1>
                <button onClick={() => this.props.history.push('/')}>Lets Navigate</button>
            </>
        )
    }

}

export default About;