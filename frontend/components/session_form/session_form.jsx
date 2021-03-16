import React from 'react'
import { Link } from 'react-router-dom';

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.formType === 'Log In') {
            this.state = {
                email: "",
                password: "",
            };
        } else {
            this.state = {
                email: "",
                username: "",
                password: "",
                birthdate: ""
            };
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.errors = this.errors.bind(this)
        this.update = this.update.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    errors() {
        return(
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={i}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        const usernameField = this.props.formType === 'Log In' ? "" : (
            <label>username<input type="text" onChange={this.update('username')}/></label>
        );
        const birthdateField = this.props.formType === 'Log In' ? "" : (
            <label>Date of Birth<input type="text" onChange={this.update('birthdate')}/></label>
        );
        const submitVal =  this.props.formType === 'Log In' ? 'Login' : 'Continue';
        const header = this.props.formType === 'Log In' ? 'Welcome Back!' : 'Create an account';
        const subHeader = this.props.formType === 'Log In' ? "We're so excited to see you again!" : "";
        const otherOption = this.props.formType === 'Log In' ? <span>Need an account? <Link to="/signup">Register</Link></span> : <Link to="/login">Already have an account?</Link>
        return (
            <div>
                <h2>{header}</h2>
                <h3>{subHeader}</h3>
                {this.errors()}
                <form onSubmit={this.handleSubmit}>
                    <label>email
                        <input type="text" onChange={this.update('email')}/>
                    </label>
                    {usernameField}
                    <label>password
                        <input type="text" onChange={this.update('password')}/>
                    </label>
                    {birthdateField}
                    <input type="submit" value={submitVal}/>
                    {otherOption}
                </form>

            </div>
        )
    }
}