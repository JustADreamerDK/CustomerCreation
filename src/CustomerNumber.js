import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Formik } from "formik";
import "./styles/style.css";
import logo from "./images/Logo-line.png";
import { functionalUpdate } from "react-table";


const cookies = new Cookies();

function logOut() {
  cookies.remove('mail');
  window.location.reload()
}

export default class CustomerNumber extends React.Component {
  state = {
    customers: [],
    mail: cookies.get('mail'),
  };

  componentDidMount() {
    axios.get(`http://10.10.0.54:6070/api/customer-creation?email=${this.state.mail}`).then((res) => {
      const customers = res.data;
      this.setState({ customers });
    });
  }

  render() {
    return (
      <>
        <header>
          <div>
            <img className="logo" src={logo} />
            <h1>Kundenummer
            </h1>
          </div>
          <h3 onClick={logOut}>Log ud</h3>
        </header>
        <div className="table-wrapper">
          <h2>Tildel kundenummer</h2>
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
                    <th>Sprog</th>
                    <th>CVR</th>
                    <th>Telefon nr</th>
                    {/* <th>Fax</th> */}
                    <th>Email</th>
                    {/* <th>Warehouse Item Group</th> */}
                    {/* <th>Container Contact</th> */}
                    <th>Debitoradresse</th>
                    <th>Kundegruppe 1</th>
                    {/* <th>Kundegruppe 2</th> */}
                    {/* <th>Reason Mandatory</th> */}
                    {/* <th>Mail Template</th> */}
                    {/* <th>Oprettet</th> */}
                  </tr>
                </thead>
                <tbody>
                  {this.state.customers.map((customer) =>
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
                          CustomerLanguage: customer.language,
                          CustomerCVR: customer.ein,
                          CustomerPhone: customer.phone,
                          CustomerFax: customer.fax,
                          CustomerMail: customer.mail,
                          CustomerWarehouseItemGroup: customer.warehouseItemGroup,
                          CustomerContainerContact: customer.containerContact,
                          CustomerDebtor: customer.isDebitor,
                          CustomerGroupOne: customer.customerGroupOne,
                          CustomerGroupTwo: customer.customerGroupTwo,
                          ReasonMandatory: customer.reasonMandatory,
                          MailTemplate: customer.mailTemplate,
                          CustomerCreated: customer.created
                        }}
                        onSubmit={async (values) => {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 500)
                          );

                          alert(JSON.stringify(values, null, 2));

                          axios
                            .put(
                              `http://10.10.0.54:6070/api/customer-creation?email=${this.state.mail}`,
                              [{
                                id: customer.id,
                                number: values.CustomerNumber,
                                name_One: customer.name_One,
                                name_Two: customer.name_Two,
                                address_One: customer.address_One,
                                address_Two: customer.address_Two,
                                zipCode: customer.zipCode,
                                city: customer.city,
                                country: customer.country,
                                language: customer.language,
                                ein: customer.ein,
                                phone: customer.phone,
                                fax: customer.fax,
                                mail: customer.mail,
                                warehouseItemGroup: customer.warehouseItemGroup,
                                containerContact: customer.containerContact,
                                isDebitor: customer.isDebitor,
                                customerGroupOne: customer.customerGroupOne,
                                customerGroupTwo: customer.customerGroupTwo,
                                reasonMandatory: customer.reasonMandatory,
                                mailTemplate: customer.mailTemplate,
                                created: customer.created,
                                isProcessed: customer.isProcessed
                              }]
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
                                {customer.number === 0 ?
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
                                  :
                                  customer.number
                                }
                              </td>
                              <td>
                                {customer.name_One}
                              </td>
                              <td>
                                {customer.name_Two}
                              </td>
                              <td>
                                {customer.address_One}
                              </td>
                              <td>
                                {customer.address_Two}
                              </td>
                              <td>
                                {customer.zipCode}
                              </td>
                              <td>
                                {customer.city}
                              </td>
                              <td>
                                {customer.country}
                              </td>
                              <td>
                                {customer.language == "DAN" ? "Dansk" : customer.language == "SVE" ? "Svensk" : customer.language == "NOR" ? "Norsk" : customer.language == "ENG" ? "Engelsk" : customer.language == "NLD" ? "Hollansk" : customer.language == "DEU" ? "Tysk" : customer.language == "FRA" ? "Fransk" : customer.language == "SPA" ? "Spansk" : customer.language == "ITA" ? "Italiensk" : customer.language == "PLK" ? "Polsk" : customer.language}
                              </td>
                              <td>
                                {customer.ein}
                              </td>
                              <td>
                                {customer.phone}
                              </td>
                              {/* <td>
                                {customer.fax}
                              </td> */}
                              <td>
                                {customer.mail}
                              </td>
                              {/* <td>
                                {customer.warehouseItemGroup}
                              </td> */}
                              {/* <td>
                                {customer.containerContact}
                              </td> */}
                              <td>
                                {customer.isDebitor === true ? "Ja" : "Nej"}
                              </td>
                              <td>
                                {customer.isDebitor === true
                                  ? customer.customerGroupOne == "DEB-AAØ" ? "Alex Andersen Ølund" : customer.customerGroupOne == "DEB-AAFG" ? "Alex Andersen Frugt og Grønt" : customer.customerGroupOne == "BOGHOLDERI" ? "Alex Andersen Ølund, Dagleje" : customer.customerGroupOne == "DEB-AANL" ? "Alex Andersen Holland" : customer.customerGroupOne == "DEB-AASE" ? "Alex Andersen Sverige" : customer.customerGroupOne == "DEB-AANO" ? "Alex Andersen Norge" : customer.customerGroupOne == "DEB-TBP" ? "Thomas B. Pedersen" : customer.customerGroupOne
                                  : null}
                              </td>
                              {/* <td>
                                {customer.isDebitor === true
                                  ? customer.customerGroupTwo
                                  : ""}
                              </td> */}
                              {/* <td>
                                {customer.reasonMandatory}
                              </td> */}
                              {/* <td>
                                {customer.mailTemplate}
                              </td> */}
                              {/* <td>
                                {customer.created}
                              </td> */}
                            </>
                          );
                        }}
                      </Formik>
                    </tr>
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
