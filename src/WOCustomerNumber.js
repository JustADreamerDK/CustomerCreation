import React from "react";
import axios from "axios";
import { Formik } from "formik";
import "./styles/style.css";

export default class WOCustomerNumber extends React.Component {
  state = {
    customers: []
  };

  componentDidMount() {
    axios.get(`https://api1.aagroup.dk/api/katja`).then((res) => {
      const customers = res.data;
      this.setState({ customers });
    });
  }

  render() {
    return (
      <>
        <div className="table-wrapper">
          <h2>Uden kundenummer</h2>
          <div className="table-content">
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Kundenummer</th>
                    <th>Navn 1</th>
                    <th>Navn 2</th>
                    <th>Adresse 1</th>
                    <th>Adresse 2</th>
                    <th>Postnr</th>
                    <th>By</th>
                    <th>Landekode</th>
                    <th>CVR</th>
                    <th>Telefon nr</th>
                    <th>Email</th>
                    <th>Debitoradresse</th>
                    <th>Adresse</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.customers.map((customer) =>
                    customer.number === 0 ? (
                      <tr key={customer.id}>
                        <Formik
                          initialValues={{
                            CustomerID: customer.id,
                            CustomerNumber: "",
                            CustomerNameOne: customer.name_One,
                            CustomerNameTwo: customer.name_Two,
                            CustomerAdressOne: customer.address_One,
                            CustomerAdressTwo: customer.address_Two,
                            CustomerZipcode: customer.zipCode,
                            CustomerCity: customer.city,
                            CustomerCountry: customer.country,
                            CustomerCVR: customer.cvr,
                            CustomerPhone: customer.phone,
                            CustomerMail: customer.mail,
                            CustomerDebtor: customer.debitor,
                            CustomerDebtorId: customer.debitor_Address.id,
                            CustomerDebtorAdress:
                              customer.debitor_Address.address
                          }}
                          onSubmit={async (values) => {
                            await new Promise((resolve) =>
                              setTimeout(resolve, 500)
                            );

                            axios
                              .put(
                                `https://api1.aagroup.dk/api/katja/${customer.id}`,
                                {
                                  id: customer.id,
                                  number: values.CustomerNumber,
                                  name_One: customer.name_One,
                                  name_Two: customer.name_Two,
                                  address_One: customer.address_One,
                                  address_Two: customer.address_Two,
                                  zipCode: customer.zipCode,
                                  city: customer.city,
                                  country: customer.country,
                                  cvr: customer.cvr,
                                  phone: customer.phone,
                                  mail: customer.mail,
                                  debitor: customer.debitor,
                                  debitor_Address_Id:
                                    customer.debitor_Address.id
                                }
                              )
                              .then((res) => {
                                console.log(res.data);
                              });
                            window.location.reload();
                          }}
                        >
                          {(props) => {
                            const {
                              values,
                              isSubmitting,
                              handleChange,
                              handleBlur,
                              handleSubmit
                            } = props;
                            return (
                              <>
                                <td>
                                  <form
                                    onSubmit={handleSubmit}
                                    className="customer-number"
                                  >
                                    <input
                                      id="CustomerID"
                                      type="number"
                                      className="CustomerID"
                                      value={values.CustomerID}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      hidden
                                    />
                                    <input
                                      id="CustomerNumber"
                                      placeholder="Kundenummer"
                                      className="CustomerNumber"
                                      type="number"
                                      value={values.CustomerNumber}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      min="1"
                                      max="999999999"
                                      required
                                    />
                                    <button
                                      type="submit"
                                      disabled={isSubmitting}
                                    >
                                      Tildel
                                    </button>
                                  </form>
                                </td>
                                <td>
                                  {customer.name_One}
                                  <input
                                    id="CustomerNameOne"
                                    className="CustomerNameOne"
                                    type="text"
                                    value={values.CustomerNameOne}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.name_Two}
                                  <input
                                    id="CustomerNameTwo"
                                    className="CustomerNameTwo"
                                    type="text"
                                    value={values.CustomerNameTwo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.address_One}
                                  <input
                                    id="CustomerAdressOne"
                                    className="CustomerAdressOne"
                                    type="text"
                                    value={values.CustomerAdressOne}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.address_Two}
                                  <input
                                    id="CustomerAdressTwo"
                                    className="CustomerAdressTwo"
                                    type="text"
                                    value={values.CustomerAdressTwo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.zipCode}
                                  <input
                                    id="CustomerZipcode"
                                    className="CustomerZipcode"
                                    type="text"
                                    value={values.CustomerZipcode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.city}
                                  <input
                                    id="CustomerCity"
                                    className="CustomerCity"
                                    type="text"
                                    value={values.CustomerCity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.country}
                                  <input
                                    id="CustomerCountry"
                                    className="CustomerCountry"
                                    type="text"
                                    value={values.CustomerCountry}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.cvr}
                                  <input
                                    id="CustomerCVR"
                                    className="CustomerCVR"
                                    type="text"
                                    value={values.CustomerCVR}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.phone}
                                  <input
                                    id="CustomerPhone"
                                    className="CustomerPhone"
                                    type="text"
                                    value={values.CustomerPhone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.mail}
                                  <input
                                    id="CustomerMail"
                                    className="CustomerMail"
                                    type="text"
                                    value={values.CustomerMail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.debitor === true ? "Ja" : "Nej"}
                                  <input
                                    id="CustomerDebtor"
                                    className="CustomerDebtor"
                                    type="text"
                                    value={values.CustomerDebtor}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                                <td>
                                  {customer.debitor === true
                                    ? customer.debitor_Address.address
                                    : ""}
                                  <input
                                    id="CustomerDebtorAdress"
                                    className="CustomerDebtorAdress"
                                    type="text"
                                    value={values.CustomerDebtorAdress}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    hidden
                                  />
                                </td>
                              </>
                            );
                          }}
                        </Formik>
                      </tr>
                    ) : (
                      null
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
