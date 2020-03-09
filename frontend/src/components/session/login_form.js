import React from "react";
import { withRouter } from "react-router-dom";
import "./session_form.scss";
import egg from "../../images/egg1.png";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/search" + this.props.history.location.search);
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(user)
  }

  handleDemo(e) {
    e.preventDefault();

    let user = {
      email: "demo@demo.com",
      password: "demouser"
    };
    this.demo(user)
  }

  demo(user) {
    const intervalSpeed = 75;
    const { email, password } = user;
    const demoEmailTime = email.length * intervalSpeed;
    const demoPasswordTime = password.length * intervalSpeed;
    const buffer = intervalSpeed * 2;
    const totalDemoTime = demoEmailTime + demoPasswordTime + buffer;
    this.demoEmail(email, intervalSpeed);
    setTimeout(() => this.demoPassword(password, intervalSpeed), demoEmailTime);
    setTimeout(() => this.props.login(user), totalDemoTime + 100);
  }
  demoEmail(email, intervalSpeed) {
    let i = 0;
    setInterval(() => {
      if (i <= email.length) {
        this.setState({ email: email.slice(0, i) });
        i++;
      } else {
        clearInterval();
      }
    }, intervalSpeed);
  }
  demoPassword(password, intervalSpeed) {
    let j = 0;
    setInterval(() => {
      if (j <= password.length) {
        this.setState({ password: password.slice(0, j) });
        j++;
      } else {
        clearInterval();
      }
    }, intervalSpeed);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li className="each-error" key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }


  render() {
    return (
      <div className="login-form-container">

        {this.renderErrors()}

        <div className="login-form">
          <div className="title">Log in</div>

          <form>
            <div className="inner-login-form">
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />

              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
              
              <div className="login-buttons">
                <div onClick={this.handleDemo} className="session-button"> Demo </div>
                <div className="session-button" onClick={this.handleSubmit}>Sign In</div>
              </div>

              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
