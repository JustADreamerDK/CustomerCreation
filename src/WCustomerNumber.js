import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/style.css";

export default function WCustomerNumber() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api1.aagroup.dk/api/katja/`)
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
            <th>CVR</th>
            <th>Telefon nr</th>
            <th>Email</th>
            <th>Debitoradresse</th>
            <th>Adresse</th>
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
                <td>{customer.cvr}</td>
                <td>{customer.phone}</td>
                <td>{customer.mail}</td>
                <td>{customer.debitor === true ? "Ja" : "Nej"}</td>
                <td>
                  {customer.debitor === true
                    ? customer.debitor_Address.address
                    : ""}
                </td>
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
