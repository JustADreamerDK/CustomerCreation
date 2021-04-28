import React from "react";
import { Formik, Field } from "formik";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/style.css";
import logo from "./images/Logo-line.png";
import Login from "./Login";
import axios from "axios";

function reload() {
  window.location.reload();
}

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
      debitor_addresses: [],
      name: "",
      name_Two: "",
      address: "",
      address_Two: "",
      country: "",
      zipCode: "",
      city: "",
      phone: "",
      fax: "",
      mail: "",
      contact: "",
      cvr: "",
      warehouse_item_group: "DEFAULT",
      container_contact: "",
      debitor: false,
      kundegruppe_One: "",
      kundegruppe_Two: "",
      reason_mandatory: "",
      mail_skabelon: "",
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
    axios.get(`http://10.10.0.54:6070/api/customer-creation/address`).then((res) => {
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

    axios
      .post("http://10.10.0.54:6070/api/customer-creation/",
        {
          name_One: this.state.name,
          name_Two: this.state.name_Two,
          address_One: this.state.address,
          address_Two: this.state.address_Two,
          zipCode: this.state.zipCode,
          city: this.state.city,
          country: this.state.country.split(",")[0],
          language: this.state.country.split(",")[1],
          ein: this.state.cvr,
          phone: this.state.phone,
          fax: this.state.fax,
          mail: this.state.mail,
          warehouseItemGroup: this.state.warehouse_item_group,
          containerContact: this.state.container_contact,
          isDebitor: this.state.debitor,
          customerGroupOne: this.state.kundegruppe_One,
          customerGroupTwo: this.state.kundegruppe_Two,
          reasonMandatory: this.state.reason_mandatory,
          mailTemplate: this.state.mail_skabelon
        }
      )
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
      name,
      name_Two,
      address,
      address_Two,
      zipCode,
      city,
      cvr,
      phone,
      mail,
    } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>

          <Route path="/">
            <header>
              <div>
                <img className="logo" src={logo} />
                <h1>Kundenummer</h1>
              </div>
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
                            name="name"
                            value={name}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                          //required
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
                            name="address"
                            value={address}
                            onChange={this.changeHandler}
                            onBlur={handleBlur}
                          //required
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
                          //required
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
                          //required
                          />
                        </div>

                        {/* <div className="form-line">
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
                            //required
                          />
                        </div> */}

                        <div className="form-line">
                          <label htmlFor="name" style={{ display: "block" }}>
                            Land
                          </label>
                          <select
                            id="country"
                            className="country"
                            name="country"
                            multiple={false}
                            onChange={this.changeHandler}
                          >
                            <option value="">Vælg</option>
                            <option value="DK,DAN">Danmark</option>
                            <option value="SE,SVE">Sverige</option>
                            <option value="NO,NOR">Norge</option>
                            <option value="FI,ENG">Finland</option>
                            <option value="NL,NLD">Holland</option>
                            <option value="GB,ENG">England</option>
                            <option value="DE,DEU">Tyskland</option>
                            <option value="FR,FRA">Frankrig</option>
                            <option value="ES,SPA">Spanien</option>
                            <option value="AT,DEU">Østrig</option>
                            <option value="IT,ITA">Italien</option>
                            <option value="LU,ENG">Luxembourg</option>
                            <option value="BE,ENG">Belgien</option>
                            <option value="CH,DEU">Schweiz</option>
                            <option value="CZ,ENG">Tjekkiet</option>
                            <option value="PL,PLK">Polen</option>
                            <option value="HU,ENG">Ungarn</option>
                            <option value="PT,ENG">Portugal</option>
                            <option value="RO,ENG">Rumænien</option>
                            <option value='BG,ENG'>Bulgarien</option>
                          </select>
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
                          //required
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
                          //required
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
                          //required
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
                          id="kundegruppe_One"
                          className="adress"
                          name="kundegruppe_One"
                          multiple={false}
                          onChange={this.changeHandler}
                        >
                          <option value="2">Vælg adresse</option>

                          {this.state.debitor_addresses.map(
                            (debitor_address) => (
                              <option
                                key={debitor_address.id}
                                value={debitor_address.customerGroup}
                              >
                                {debitor_address.debitorAddress}
                              </option>
                            )
                          )}
                        </select>

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

export default CreateUser;
