import React from "react";
import { Formik } from "formik";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "./styles/style.css";
import logo from "./images/Logo-line.png";
import CustomerNumberAll from "./CustomerNumberAll";
import CustomerNumber from "./CustomerNumber";
import Test from "./Test";

const cookies = new Cookies();

const LoggedIn = cookies.get('mail');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: cookies.get('mail')
        };
    }

    handleClick(i) {
        this.setState({
            buttonSend: !this.state.button,
        });
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = (e) => {
        e.preventDefault();
        cookies.set("mail", this.state.mail, { path: "/" });
        window.location.reload();
    };

    render() {
        const {
            mail,
        } = this.state;
        return (
            <Router>
                <Switch>
                    <Route path="/Login">
                        {(LoggedIn === undefined || LoggedIn === "") ?
                            <>
                                <header>
                                    <div>
                                        <img className="logo" src={logo} />
                                        <h1>Kundenummer</h1>
                                    </div>
                                </header>

                                <div className="create-user content-wrapper">
                                    <div className="content-container">
                                        <h2>Login</h2>

                                        <Formik
                                            initialValues={{
                                                mail: this.state.mail,
                                            }}
                                        >
                                            {(props) => {
                                                const {
                                                    values,
                                                    isSubmitting,
                                                    handleBlur,
                                                } = props;

                                                return (
                                                    <form
                                                        onSubmit={this.submitHandler}
                                                        className="create-form"
                                                    >

                                                        <div className="form-line">
                                                            <label htmlFor="email" style={{ display: "block" }}>
                                                                Email
                          </label>
                                                            <input
                                                                id="email"
                                                                placeholder="Email"
                                                                type="email"
                                                                value={values.mail}
                                                                name="mail"
                                                                onChange={this.changeHandler}
                                                                onBlur={handleBlur}
                                                             required
                                                            />
                                                        </div>

                                                        <button
                                                            className="login-submit"
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                        >
                                                            Login
                        </button>
                                                    </form>
                                                );
                                            }}
                                        </Formik>
                                    </div>
                                </div>
                            </>
                            : <CustomerNumberAll />}
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Login;
