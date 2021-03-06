import React, {Component} from 'react'
import Form from 'react-bootstrap/Form';
import '../style.css'

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        };

        this.authorize = this.authorize.bind(this)
        this.createJsonLoginForm = this.createJsonLoginForm.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {

        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    async authorize() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const data = this.createJsonLoginForm(this.state.email, this.state.password);
        const options = {
            method: 'POST',
            headers,
            body: data
        }
        const request = new Request('https://omami.herokuapp.com/users/login', options);
        const response = await fetch(request);
        const status = await response.status;
        response.json().then(data =>
            this.props.setUserId(data.id)
        );

        if (status === 200) {
            this.props.goToChat(true);
            this.props.setUserName(this.state.email)

        } else if (status === 404) {
            alert("Username or password incorrect!");
        }
    }

    createJsonLoginForm(email, password) {
        var json = '{"username": "' + email + '", "password": "' + password + '"}';
        return json;
    }

    render() {
        return (
            <body className="login-form-align">
            <form className="login-form">
                <Form onSubmit={this.handleSubmit}>
                    <div className="register-box">
                        <img src="cloud-plain.ico"/>
                        <h2>Hello!</h2>
                        <Form.Group controlId="email" bsSize="large">
                            <Form.Control className="input"
                                          placeholder="info@mailaddress.com"
                                          autoFocus
                                          value={this.state.email}
                                          onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" bsSize="large">
                            <Form.Control className="input"
                                          placeholder="•••••••••••••"
                                          value={this.state.password}
                                          onChange={this.handleChange}
                                          type="password"
                            />
                        </Form.Group>
                        <button type="submit" block className="login-btn"
                                disabled={!this.validateForm()}
                                onClick={this.authorize}//.bind(this)}
                        > Login
                        </button>
                        <button type="submit" block className="signup-btn"
                            // disabled={!this.validateForm()}
                            // onClick={this.authorize}//.bind(this)}
                        > Register
                        </button>

                    </div>
                </Form>
            </form>
            </body>
        );
    }
}

// export default withRouter (Login);