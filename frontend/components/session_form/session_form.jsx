import React from 'react'
import { Link } from 'react-router-dom';
import Canvas from '../../util/login_canvas'

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
                birthdate: "",
                day: "",
                month: "",
                year: ""
            };
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.errors = this.errors.bind(this)
        this.update = this.update.bind(this)

    }

    
    handleSubmit(e) {
        e.preventDefault();
        let formattedState = {};
        if (this.props.formType === 'Sign Up'){
            let el = document.getElementById('month');
            let ev = document.createEvent('Event');
            ev.initEvent('change', true, false);
            el.dispatchEvent(ev);
            
            console.log(this.state.birthdate)
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
        
        this.props.processForm(formattedState);
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

    render() {
        const usernameField = this.props.formType === 'Log In' ? "" : (
            <div className="field">
                <label htmlFor="username" >USERNAME</label>
                <input id="username" type="text" onChange={this.update('username')}/>
            </div>
        );


        const days = [];
        for (let i = 1; i < 32; i++) {
            days.push(<option key={i} value={i}>{i}</option>)
        }

        const years = [];
        for (let i = 0; i < 152; i++) {
            years.push(<option key={i} value={2021 - i}>{2021 - i}</option>)
        }

        const birthdateField = this.props.formType === 'Log In' ? "" : (
            <div className="field">
                <label>DATE OF BIRTH</label>
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
                <Canvas />
                <a href="/"><img className="logo" src={window.headerLogoURL} /></a>
                <img className="login-bg" src={window.loginBGURL} />
                <div className={boxClass}>
                    <div className="form-box">
                        {header}
                        <h3>{subHeader}</h3>
                        {this.errors()}
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label htmlFor="email">EMAIL</label>
                                <input id="email" type="text" onChange={this.update('email')}/>
                            </div>

                            {usernameField}

                            <div className="field">
                                <label htmlFor="password">PASSWORD</label>
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