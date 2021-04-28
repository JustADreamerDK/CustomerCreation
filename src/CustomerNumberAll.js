import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Formik, Field, Form, FieldArray } from "formik";
import "./styles/style.css";
import logo from "./images/Logo-line.png";

const cookies = new Cookies();

function logOut() {
    cookies.remove('mail');
    window.location.reload()
}

const data = [
    {
        "id": 1052,
        "number": 0,
        "name_One": "061046905",
        "name_Two": "ja",
        "address_One": "jeg",
        "address_Two": "29",
        "zipCode": "3560",
        "city": "Odense",
        "country": "CH",
        "language": "DEU",
        "ein": "43242",
        "phone": "61046905",
        "fax": "",
        "mail": "fhnjaskl@jfilsa.dk",
        "warehouseItemGroup": "DEFAULT",
        "containerContact": "",
        "isDebitor": true,
        "customerGroupOne": "DEB-AASE",
        "customerGroupTwo": "",
        "reasonMandatory": "",
        "mailTemplate": "",
        "created": "2021-04-23T10:53:25.1902007",
        "updated": null,
        "isProcessed": false
      },
      {
        "id": 1053,
        "number": 0,
        "name_One": "61046905",
        "name_Two": "ja",
        "address_One": "jeg",
        "address_Two": "29",
        "zipCode": "3560",
        "city": "Odense",
        "country": "DK",
        "language": "DAN",
        "ein": "43242",
        "phone": "",
        "fax": "",
        "mail": "fhnjaskl@jfilsa.dk",
        "warehouseItemGroup": "DEFAULT",
        "containerContact": "",
        "isDebitor": false,
        "customerGroupOne": "",
        "customerGroupTwo": "",
        "reasonMandatory": "",
        "mailTemplate": "",
        "created": "2021-04-23T12:20:15.2517492",
        "updated": null,
        "isProcessed": false
      }
];

const initialFormData = undefined;

export default function CustomerNumber() {
    const [customers, setCustomers] = useState(initialFormData);
    const [mail, setMail] = useState(cookies.get('mail'),)

    useEffect(() => {
        axios
            .get(`http://10.10.0.54:6070/api/customer-creation?email=${mail}`)
            .then((todo) => setCustomers(todo.data))
    }, []);

    function changeHandler(e) {
        setCustomers({ [e.target.name]: e.target.value });
      };

    return (
        <>
            <header>
                <div>
                    <img className="logo" src={logo} />
                    <h1>Kundenummer All
          </h1>
                </div>
                <h3 onClick={logOut}>Log ud</h3>
            </header>
            <div className="table-wrapper">
                <h2>Tildel kundenummer</h2>


                {customers && (
                    <Formik
                        initialValues={{
                            customers
                        }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));

                            axios
                                .put(
                                    `http://10.10.0.54:6070/api/customer-creation?email=${mail}`,
                                    [{ values }]
                                )
                                .then((res) => {
                                    console.log(res.data);
                                });
                            //  window.location.reload();
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
                                <Form>
                                    <div className="table-content">
                                        <div className="table">
                                            <FieldArray name="customers">
                                                {() => (
                                                    <div>
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
                                                                    <th>Email</th>
                                                                    <th>Debitoradresse</th>
                                                                    <th>Kundegruppe 1</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {customers.length > 0 &&
                                                                    customers.map((customer, index) => (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                Id: {customer.id}
                                                                                <br />
                                                                                {customer.number === 0 ?
                                                                                    <>
                                                                                        {/* <Field
                                                                                        name={`customers.${index}.number`}
                                                                                        placeholder="Kundenummer"
                                                                                        type="number"
                                                                                        className="CustomerNumber"
                                                                                    /> */}
                                                                                        
                                                                                        <input
                                                                                            id={`customers.${index}.number`}
                                                                                            name={`customers.${index}.number`}
                                                                                            className="CustomerNumber"
                                                                                            type="number"
                                                                                            onChange={changeHandler}
                                                                                            value={customers.values.number}
                                                                                            min="1"
                                                                                            max="999999999"
                                                                                            required
                                                                                        />
                                                                                    </>
                                                                                    : "Number: " + customer.number}
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
                                                                            <td>
                                                                                {customer.mail}
                                                                            </td>

                                                                            <td>
                                                                                {customer.isDebitor === true ? "Ja" : "Nej"}
                                                                            </td>
                                                                            <td>
                                                                                {customer.isDebitor === true
                                                                                    ? customer.customerGroupOne == "DEB-AAØ" ? "Alex Andersen Ølund" : customer.customerGroupOne == "DEB-AAFG" ? "Alex Andersen Frugt og Grønt" : customer.customerGroupOne == "BOGHOLDERI" ? "Alex Andersen Ølund, Dagleje" : customer.customerGroupOne == "DEB-AANL" ? "Alex Andersen Holland" : customer.customerGroupOne == "DEB-AASE" ? "Alex Andersen Sverige" : customer.customerGroupOne == "DEB-AANO" ? "Alex Andersen Norge" : customer.customerGroupOne == "DEB-TBP" ? "Thomas B. Pedersen" : customer.customerGroupOne
                                                                                    : null}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>
                                    </div>
                                    <button type="submit" className="add-number">Tildel kundenumre</button>
                                </Form>
                            )
                        }}
                    </Formik>
                )}
            </div>
        </>
    );
}