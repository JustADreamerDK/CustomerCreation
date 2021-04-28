import React from "react";
import emailjs from "emailjs-com";
import { Formik, Field } from "formik";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/style.css";
import logo from "./images/Logo-line.png";
import Customer from "./Customer";
import axios from "axios";

function reload() {
  window.location.reload();
}

class CreateUserTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
      debitor_addresses: [],
      name_One: "",
      name_Two: "",
      address_One: "",
      address_Two: "",
      zipCode: "",
      city: "",
      country: "",
      cvr: "",
      phone: "",
      mail: "",
      debitor: false,
      debitor_Address_Id: "2",
    };
    this.checkbox = this.checkbox.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleClick(i) {
    this.setState({
      buttonSend: !this.state.button,
    });
  }

  componentDidMount() {
    axios.get(`https://api1.aagroup.dk/api/katja/address`).then((res) => {
      const debitor_addresses = res.data;
      this.setState({ debitor_addresses });
    });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkbox = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);

    emailjs
    .sendForm(
      "service_kundeoprettelse",
      "template_rjsk31i",
      e.target,
      "user_v7jcondrSF6KID1z4l296"
    )
    .then(
      (result) => {
        console.log(result.text);
        new Promise((resolve) => setTimeout(resolve, 500));
      },
      (error) => {
        console.log(error.text);
      }
    );

    axios
      .post("https://api1.aagroup.dk/api/katja/", this.state)
      .then((respone) => {
        console.log(respone);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ button: false });
    setTimeout(reload, 5000);
  };

  render() {
    const buttonSending = this.state.button
      ? "Send til oprettelse"
      : "Sendt...";
    const {
      name_One,
      name_Two,
      address_One,
      address_Two,
      zipCode,
      city,
      country,
      cvr,
      phone,
      mail,
    } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/without">
            <Customer />
          </Route>

          <Route path="/">
            <header>
              <img className="logo" src={logo} />
              <h1>Kundenummer</h1>
              <nav style={{ display: "flex" }}>
                <Link
                  to="/"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    marginRight: "10px",
                  }}
                >
                  Forside
                </Link>
                <Link
                  to="/without"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Tabel
                </Link>
              </nav>
            </header>

            <div className="create-user content-wrapper">
              <div className="content-container">
                <h2>Kundeoprettelse</h2>

                <Formik
                  initialValues={{
                    customerNumber: "0",
                    nameOne: "",
                    nameTwo: "",
                    adressOne: "",
                    adressTwo: "",
                    postalcode: "",
                    city: "",
                    countryCode: "",
                    cvr: "",
                    phoneNumber: "",
                    email: "",
                    debitoradress: "",
                    adress: "",
                  }}
                >
                  {(props) => {
                    const {
                      values,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                    } = props;

                    return (
                      <form
                        onSubmit={this.submitHandler}
                        className="create-form"
                      >
                        <div className="form-line">
                          <input
                            id="customerNumber"
                            placeholder="Navn 1"
                            type="number"
                            name="customerNumber"
                            value={values.customerNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            hidden
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            Navn 1
                          </label>
                          <input
                            id="nameOne"
                            placeholder="Navn 1"
                            type="text"
                            name="name_One"
                            value={name_One}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                            required
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            Navn 2
                          </label>
                          <input
                            id="nameTwo"
                            placeholder="Navn 2"
                            type="text"
                            name="name_Two"
                            value={name_Two}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            Adresse 1
                          </label>
                          <input
                            id="adressOne"
                            placeholder="Adresse 1"
                            type="text"
                            name="address_One"
                            value={address_One}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                            required
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            Adresse 2
                          </label>
                          <input
                            id="adressTwo"
                            placeholder="Adresse 2"
                            type="text"
                            name="address_Two"
                            value={address_Two}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            Post nr
                          </label>
                          <input
                            id="postalcode"
                            placeholder="Post nr"
                            type="number"
                            value={zipCode}
                            name="zipCode"
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                            min="1"
                            required
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            By
                          </label>
                          <input
                            id="city"
                            placeholder="By"
                            type="text"
                            name="city"
                            value={city}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                            required
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            Landekode
                          </label>
                          <input
                            id="countryCode"
                            placeholder="Landekode"
                            type="text"
                            name="country"
                            value={country}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                            required
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            CVR
                          </label>
                          <input
                            id="cvr"
                            placeholder="CVR"
                            type="number"
                            name="cvr"
                            value={cvr}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                            min="1"
                            required
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            Telefon nr
                          </label>
                          <input
                            id="phoneNumber"
                            placeholder="Telefon nr"
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                            min="1"
                            required
                          />
                        </div>

                        <div className="form-line">
                          <label htmlFor="email" style={{ display: "block" }}>
                            Email
                          </label>
                          <input
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={mail}
                            name="mail"
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                            required
                          />
                        </div>

                        <label className="debitor">
                          <input
                            type="checkbox"
                            id="debitor"
                            name="debitor"
                            className="debitoradress"
                            onChange={this.checkbox}
                          />
                          Debitoradresse
                        </label>

                        <select
                          id="adress"
                          className="adress"
                          name="debitor_Address_Id"
                          multiple={false}
                          onChange={this.changeHandler}
                        >
                          <option value="2">Vælg adresse</option>

                          {this.state.debitor_addresses.map(
                            (debitor_address) => (
                              <option
                                key={debitor_address.id}
                                value={debitor_address.id}
                              >
                                {debitor_address.address}
                              </option>
                            )
                          )}
                        </select>

                        <div className="form-line" style={{ display: "none" }}>
                          <textarea
                            name="message"
                            id="message"
                            value={
                              this.state.name_One +
                              ", " +
                              this.state.name_Two +
                              ", " +
                              this.state.address_One +
                              ", " +
                              this.state.address_Two +
                              ", " +
                              this.state.zipCode +
                              ", " +
                              this.state.city +
                              ", " +
                              this.state.country +
                              ", " +
                              this.state.cvr +
                              ", " +
                              this.state.phone +
                              ", " +
                              this.state.mail +
                              ", " +
                              this.state.debitor +
                              ", " +
                              this.state.debitor_Address_Id
                            }
                            readOnly
                          ></textarea>
                        </div>

                        <button
                          className="submit"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {buttonSending}
                        </button>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default CreateUserTwo;
