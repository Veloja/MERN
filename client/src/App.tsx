import * as React from 'react';
import './App.css';

interface AppState {
    name: string;
    email: string;
    password: string;
}

class App extends React.Component<{}, AppState> {
    state = {
        name: '',
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
        console.log('register fired off');
        console.log(this.state);
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...this.state,
            }),
        })
            .then((res): Promise<any> => res.json())
            .then((res): void => console.log(res));
    };

    render(): JSX.Element {
        return (
            <div className="App">
                <p>Working...aaa</p>
                <div>
                    Register as a user:
                    <input name="name" type="text" placeholder="name" onChange={this.handleChange} />
                    <input name="email" type="text" placeholder="email" onChange={this.handleChange} required />
                    <input name="password" type="password" placeholder="password" onChange={this.handleChange} />
                    <button onClick={this.handleRegister}>Register</button>
                </div>
            </div>
        );
    }
}

export default App;
