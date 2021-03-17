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
            <div className="field">
                <label for="username" >USERNAME</label>
                <input id="username" type="text" onChange={this.update('username')}/>
            </div>
        );
        const birthdateField = this.props.formType === 'Log In' ? "" : (
            <div className="field">
                <label for="dob" >DATE OF BIRTH</label>
                <input id="dob" type="text" onChange={this.update('birthdate')}/>
            </div>
        );
        const boxClass = this.props.formType === 'Log In' ? "box" : "box signup-box"
        const submitVal =  this.props.formType === 'Log In' ? 'Login' : 'Continue';
        const header = this.props.formType === 'Log In' ? <h2 className="welcome-header">Welcome Back!</h2> : <h2 className="create-header">Create an account</h2>;
        const subHeader = this.props.formType === 'Log In' ? "We're so excited to see you again!" : "";
        const otherOption = this.props.formType === 'Log In' ? <span className="other-option">Need an account? <Link to="/signup">Register</Link></span> : <span className="other-option"><Link to="/login">Already have an account?</Link></span>
        const forgotPass = this.props.formType === 'Log In' ? <a className="forgot-pass" href="">Forgot your password?</a> : "";
        const terms = this.props.formType === 'Log In' ? "" : (
            <span className="tos">By registering you agree to Datcord's <a href="#/signup">Terms of Service</a> and <a href="#/signup">Privacy Policy</a></span>
        )
        const barcode = this.props.formType === 'Log In' ? <img className= "fake-barcode" src={window.loginBarcodeURL} /> : ""
        return (
            
            <div className="login-signup-page">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@300;400;500;600;700;800;900&display=swap');
                </style>
                <a href="/"><img className="logo" src={window.headerLogoURL} /></a>
                <img className="login-bg" src={window.loginBGURL} />
                <div className={boxClass}>
                    <div className="form-box">
                        {header}
                        <h3>{subHeader}</h3>
                        {this.errors()}
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label for="email">EMAIL</label>
                                <input id="email" type="text" onChange={this.update('email')}/>
                            </div>

                            {usernameField}

                            <div className="field">
                                <label for="password">PASSWORD</label>
                                <input id="password" type="text" onChange={this.update('password')}/>
                                {forgotPass}
                            </div>      

                            {birthdateField}

                            <div className="field">
                                <input type="submit" value={submitVal}/>
                                {otherOption}
                                {terms}
                            </div>
                            
                        </form>
                    </div>
                    <div className="barcode-box">
                        {barcode}
                    </div>

                </div>
            </div>
        )
    }
}