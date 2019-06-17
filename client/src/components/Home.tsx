import * as React from 'react';

class Home extends React.Component<{}> {
    handleLogout = () => {
        const token = localStorage.getItem('jwtToken');
        console.log('Token before deleting', token);
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
    };

    render(): JSX.Element {
        return (
            <div className="App">
                HOMEPAGE
                <button type="button" onClick={this.handleLogout}>
                    Log out
                </button>
            </div>
        );
    }
}

export default Home;
