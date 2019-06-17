import * as React from 'react';

interface AppState {
    email: string;
    password: string;
}

class App extends React.Component<{}, AppState> {
    state = {
        email: '',
        password: '',
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name as string]: value,
        });
    };

    handleRegister = (): void => {
        console.log('LOGIN fired off');
        console.log('Login state: ', this.state);
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...this.state,
            }),
        })
            .then((res): Promise<any> => res.json())
            .then(
                (res): void => {
                    const token = res.token;
                    localStorage.setItem('jwtToken', token);
                },
            );
        setTimeout(() => {
            window.location.href = '/home';
        }, 1500);
    };

    render(): JSX.Element {
        return (
            <div className="App">
                <p>LOGIN</p>
                <div>
                    Login as a user:
                    <input name="email" type="text" placeholder="email" onChange={this.handleChange} required />
                    <input name="password" type="password" placeholder="password" onChange={this.handleChange} />
                    <button onClick={this.handleRegister}>LOGIN</button>
                </div>
            </div>
        );
    }
}

export default App;
