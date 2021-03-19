import React from 'react'
import { Link } from 'react-router-dom';
import Canvas from '../../util/login_canvas'
import { Redirect } from 'react-router';
import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.formType === 'Log In') {
            this.state = {
                email: "",
                password: "",
                emailErrored: false,
                passwordErrored: false
            };
        } else {
            this.state = {
                email: "",
                username: "",
                password: "",
                birthdate: "",
                day: "",
                month: "",
                year: "",
            };
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.errors = this.errors.bind(this)
        this.update = this.update.bind(this)
        this.demoUser = this.demoUser.bind(this)
        this.transitionOut = this.transitionOut.bind(this)
        this.emailErrors = this.emailErrors.bind(this)
        this.passwordErrors = this.passwordErrors.bind(this)
        this.usernameErrors = this.usernameErrors.bind(this)
    }

    componentDidMount() {

        let box = document.getElementById("box");

        box.classList.remove("deactivate");
        
        
    }


    transitionOut(e) {
        e.preventDefault();

        this.props.clearErrors();
        let box = document.getElementById("box");

        box.classList.add("deactivate");

        setTimeout(() => {
            this.setState({redirect: true});
        }, 100);
    }


    demoUser(e) {
        e.preventDefault();

        this.props.processForm({
            email: "demouser@datcord.com",
            password: "password123"
        }).then((action) => {
            if (action.type === RECEIVE_CURRENT_USER) {
                this.props.history.push("/channels/1")
            }
        });
    }

    
    handleSubmit(e) {
        e.preventDefault();
        // this.handleErrors();
        this.props.clearErrors();

        let formattedState = {};
        console.log(this.props.errors)
        if (this.state.day === '' || this.state.month === '' || this.state.year === '') {
            return;
        }
        if (this.props.formType === 'Sign Up'){

            formattedState = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                birthdate: new Date(this.state.birthdate)
            }
        } else {
            formattedState = {
                email: this.state.email,
                password: this.state.password
            }
        }
        
        this.props.processForm(formattedState).then((action) => {
            if (action.type === RECEIVE_CURRENT_USER) {
                this.props.history.push("/channels/1")
            }
        });
        
    }

    update(field) {

        return e => {
            this.setState({
                [field]: e.target.value
            }, () => {
                this.setState({
                    birthdate: (this.state.month + "/" + this.state.day + "/" + this.state.year)
                })
            });
        }
        
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

    usernameErrors() {
        if (this.props.formType === 'Sign Up') {
            if(this.props.errors.includes("Username is too long (maximum is 32 characters)") || this.props.errors.includes("Username is too short (minimum is 2 characters)")) {
                return " - Must be between 2 and 32 in length"
            }
        }
        return "";
    }

    emailErrors(){
        if (this.props.formType === 'Log In') {
            if (this.props.errors.length > 0) {
                return this.props.errors[0]
            }
        } else if (this.props.formType === 'Sign Up') {
            
            let thisEmail = this.state.email.slice(0);
            if (this.props.errors.includes("Email is invalid")) {
                if (!thisEmail.split("").includes("@")){
                    return ` - Please include an '@' in the email address.`;
                } 
                else {
                    return ' - Not a well formed email address'
                }
            } else if (this.props.errors.includes("Email has already been taken")) {
                return ' - Email is already registered'
            }
        }


        return "";
    }

    passwordErrors() {
        if (this.props.formType === 'Log In') {
            if (this.props.errors.length > 0) {
                return this.props.errors[1]
            }
        } else if (this.props.formType === 'Sign Up') {
            if (this.props.errors.includes("Password is too short (minimum is 6 characters)")) {
                return " - Must be 6 or more in length"
            }
        }
        return "";
    }

    render() {
        // this allows for redirecting after a delay so transitionOut works
        if (this.state.redirect) {
            if (this.props.formType === 'Log In') {
                return <Redirect push to="/signup" />;
            } else if (this.props.formType === 'Sign Up') {
                return <Redirect push to="/login" />;
            }    
        }

        // set classes for labels based on if errored or not
        let emailClass = ""
        let passwordClass = ""
        let usernameClass = ""
        if (this.props.formType === 'Log In' && this.props.errors.length > 0) {
            emailClass = this.props.errors[0] === '' ? "" : "errored";
            passwordClass = this.props.errors[1] === '' ? "" : "errored";
        }
        if (this.props.formType === 'Sign Up' && this.props.errors.length > 0) {
            emailClass = (this.props.errors.includes("Email is invalid") || this.props.errors.includes("Email has already been taken")) ? "errored" : "";
            passwordClass = this.props.errors.includes("Password is too short (minimum is 6 characters)") ? "errored" : ""
            usernameClass = (this.props.errors.includes("Username is too long (maximum is 32 characters)") || 
                             this.props.errors.includes("Username is too short (minimum is 2 characters)")) ? "errored" : "";
        }

        // this is the username field that onlyu appears on sign up
        const usernameField = this.props.formType === 'Log In' ? "" : (
            <div className="field">
                <label id="username-label" className={usernameClass} htmlFor="username" >USERNAME{this.usernameErrors()}</label>
                <input id="username" className={usernameClass} type="text" onChange={this.update('username')}/>
            </div>
        );

        // generates array of day options
        const days = [];
        for (let i = 1; i < 32; i++) {
            days.push(<option key={i} value={i}>{i}</option>)
        }

        // generates array of year options
        const years = [];
        for (let i = 0; i < 152; i++) {
            years.push(<option key={i} value={2021 - i}>{2021 - i}</option>)
        }

        // this is the birthdate select tag that only appears on sign up
        const birthdateField = this.props.formType === 'Log In' ? "" : (
            <div className="field">
                <label id="dob-label">DATE OF BIRTH</label>
                <div className="selects">
                    <select id="month" defaultValue="00" onChange={this.update("month")}>
                        <option value="00" disabled >Month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <select id="day" defaultValue="00" onChange={this.update("day")}>
                        <option value="00" disabled >Day</option>
                        {days}
                    </select>
                    <select id="year" defaultValue="00" onChange={this.update("year")}>
                        <option value="00" disabled >Year</option>
                        {years}
                    </select>
                </div>
            </div>
        );


        const boxClass = this.props.formType === 'Log In' ? "box" : "box signup-box";
        const submitVal =  this.props.formType === 'Log In' ? 'Login' : 'Continue';
        const header = this.props.formType === 'Log In' ? <h2 className="welcome-header">Welcome Back!</h2> : <h2 className="create-header">Create an account</h2>;
        const subHeader = this.props.formType === 'Log In' ? "We're so excited to see you again!" : "";
        const otherOption = this.props.formType === 'Log In' ? <span className="other-option">Need an account? <Link onClick={this.transitionOut} to="/signup">Register</Link></span> : <span className="other-option"><Link onClick={this.transitionOut} to="/login">Already have an account?</Link></span>
        const forgotPass = this.props.formType === 'Log In' ? <a className="forgot-pass" href="">Forgot your password?</a> : "";
        const terms = this.props.formType === 'Log In' ? "" : (
            <span className="tos">By registering you agree to Datcord's <a href="#/signup">Terms of Service</a> and <a href="#/signup">Privacy Policy</a></span>
        )
        const barcode = this.props.formType === 'Log In' ? (
            <div className="barcode-box">
                <img onClick={this.demoUser} className= "fake-barcode" src={window.loginBarcodeURL} />
                <div className="barcode-text">
                    <h2>Log in with demo account</h2>
                    <p>Click the barcode to log in with a demo account</p>
                </div>
            </div>
        ) : ""
        
        


        return (
            
            <div className="login-signup-page">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@300;400;500;600;700;800;900&display=swap');
                </style>
                <Canvas />
                <a href="/"><img className="logo" src={window.headerLogoURL} /></a>
                <img className="login-bg" src={window.loginBGURL} />
                <div id="box" className={boxClass}>
                    <div className="form-box">
                        {header}
                        <h3>{subHeader}</h3>

                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label id="email-label" className={emailClass} htmlFor="email">EMAIL{this.emailErrors()}</label>
                                <input id="email" className={emailClass} type="text" onChange={this.update('email')}/>
                            </div>

                            {usernameField}

                            <div className="field">
                                <label id="password-label" className={passwordClass} htmlFor="password">PASSWORD{this.passwordErrors()}</label>
                                <input id="password" className={passwordClass} type="password" onChange={this.update('password')}/>
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
                    
                    {barcode}
                    

                </div>
            </div>
        )
    }
}