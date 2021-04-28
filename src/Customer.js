import "./styles/style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import logo from "./images/Logo-line.png";
import WOCustomerNumber from "./WOCustomerNumber";
import WCustomerNumber from "./WCustomerNumber";
import CreateUser from "./Create-user";

function Customer() {
  return (
    <Router>
      <Switch>
        <Route path="/without">
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

          <div className="content-wrapper">
            <div className="content-container">
              <nav>
                <NavLink to="/without">
                  <button>Uden kundenr</button>
                </NavLink>
                <NavLink to="/with">
                  <button>Med kundenr</button>
                </NavLink>
              </nav>
              <WOCustomerNumber />
            </div>
          </div>
        </Route>

        <Route path="/with">
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
          <div className="content-wrapper">
            <div className="content-container">
              <nav>
                <NavLink to="/without">
                  <button>Uden kundenr</button>
                </NavLink>
                <NavLink to="/with">
                  <button>Med kundenr</button>
                </NavLink>
              </nav>
              <WCustomerNumber />
            </div>
          </div>
        </Route>

        <Route path="/">
          <CreateUser />
        </Route>
      </Switch>
    </Router>
  );
}

export default Customer;
