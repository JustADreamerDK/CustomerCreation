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

const initialFormData = undefined;

export default function CustomerNumber() {
  const [customers, setCustomers] = useState(initialFormData);
  const [mail, setMail] = useState(cookies.get('mail'),)

  useEffect(() => {
    axios
      .get(`http://10.10.0.54:6070/api/customer-creation?email=${mail}`)
      .then((todo) => setCustomers(todo.data))
  }, []);

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
            initialValues={
              customers
            }
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));

              axios
                .put(
                  `http://10.10.0.54:6070/api/customer-creation?email=${mail}`,
                  values
                )
                .then((res) => {
                  console.log(res.data);
                });
              console.log(customers.number[0])
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
                <Form onSubmit={handleSubmit}>
                  <div className="table-content">
                    <div className="table">

                      <FieldArray
                        name="customers"
                        render={(arrayHelpers) => (
                          <div>
                            {customers.map((friend, index) => (
                              <div key={index}>
                                {/** both these conventions do the same */}
                                <Field name={`customers[${index}].name`} />
                                <Field name={`customers.${index}.age`} />

                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                      </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push({ name: "", age: "" })}
                            >
                              +
                  </button>
                          </div>
                        )}
                      />
                      
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="add-number"
                  >
                    Tildel kundenumre
                                    </button>
                </Form>
              )
            }}
          </Formik>
        )}
      </div>
    </>
  );
}