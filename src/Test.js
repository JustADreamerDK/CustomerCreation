import React from "react";
import { Formik, Field } from "formik";
import "./styles/style.css";
import logo from "./images/Logo-line.png";
import axios from "axios";

function reload() {
  window.location.reload();
}

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
      customers: [],
      number: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleClick(i) {
    this.setState({
      buttonSend: !this.state.button,
    });
  }

  componentDidMount() {
    axios
      .get(`http://10.10.0.54:6070/api/customer-creation?email=khk@alex-andersen.dk`).then((res) => {
        const customers = res.data;
        this.setState({ customers });
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    axios
      .put("http://10.10.0.54:6070/api/customer-creation?email=khk@alex-andersen.dk",
        {
          number: this.state.number
        }
      )
      .then((respone) => {
        console.log(respone);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ button: false });
    // setTimeout(reload, 5000);
  };

  render() {
    const buttonSending = this.state.button
      ? "Send til oprettelse"
      : "Sendt...";
    const {
      number
    } = this.state;
    return (
      <>
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
                number: "0",
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
                        id="number"
                        placeholder="Number"
                        type="number"
                        name="number"
                        value={values.number}
                        onChange={this.handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <br/>
                    <h2>Customers</h2>
                    <br/>

                    {this.state.customers.map(
                      (customer) => (
                          <div key={customer.id}>
                            {customer.name_One} - {customer.address_One}
                          </div>
                      )
                    )}
                    <br/>

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
      </>
    );
  }
}

export default CreateUser;
