import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/style.css";

export default function WCustomerNumber() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://10.10.0.54:6070/api/customer-creation?email=khk@alex-andersen.dk`)
      .then((todo) => setCustomers(todo.data));
  }, []);

  return (
    <div className="table-wrapper">
      <h2>Med kundenummer</h2>
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
                <th>Fax</th>
                <th>Email</th>
                <th>Warehouse Item Group</th>
                <th>Container Contact</th>
                <th>Debitoradresse</th>
                <th>Kundegruppe 1</th>
                <th>Kundegruppe 2</th>
                <th>Reason Mandatory</th>
                <th>Mail Template</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) =>
                customer.number === 0 ? (
                  null
                ) : (
                  <tr key={customer.id}>
                    <td>{customer.number}</td>
                    <td>{customer.name_One}</td>
                    <td>{customer.name_Two}</td>
                    <td>{customer.address_One}</td>
                    <td>{customer.address_Two}</td>
                    <td>{customer.zipCode}</td>
                    <td>{customer.city}</td>
                    <td>{customer.country}</td>
                    <td>{customer.language}</td>
                    <td>{customer.ein}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.fax}</td>
                    <td>{customer.mail}</td>
                    <td>{customer.warehouseitemGroup}</td>
                    <td>{customer.containerContact}</td>
                    <td>{customer.isDebitor === true ? "Ja" : "Nej"}</td>
                    <td>
                      {customer.isDebitor === true
                        ? customer.customerGroupOne
                        : ""}
                    </td>
                    <td>{customer.customerGroupTwo}</td>
                    <td>{customer.reasonMandatory}</td>
                    <td>{customer.mailTemplate}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
