import * as React from 'react';
import './App.css';

interface User {
    _id: number;
    name: string;
    password: string;
    email: string;
}
interface AppState {
    users: User[];
}

class App extends React.Component<{}, AppState> {
    public state: AppState = {
        users: [],
    };

    public componentDidMount(): void {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(users => this.setState({ users: users.users }));
    }

    public render(): React.ReactNode {
        console.log(this.state.users);
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        {this.state.users.map(
                            (user): JSX.Element => (
                                <li key={user._id}>
                                    index: {user._id} {user.name}
                                </li>
                            ),
                        )}
                    </p>
                </header>
            </div>
        );
    }
}

export default App;
