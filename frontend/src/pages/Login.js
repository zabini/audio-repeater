import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login } from "../auth";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Login extends Component {
  state = {
    email: "albertha14@example.com",
    password: "123",
    error: "",
    form: "",
  };

  handleLogin = async (e) => {
    e.preventDefault();

    this.setState({ error: "" });
    this.setState({ form: "loading" });

    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "Enter all data to login" });
      this.setState({ form: "" });
      return;
    } else {
      var pwdLoginResponse = await login({
        grant_type: "password",
        username: email,
        password: password,
      });

      this.setState({ form: "" });

      if (!pwdLoginResponse) {
        this.setState({
          error: "Invalid credentials, check the given data and try again",
        });
        return;
      }

      console.log("Success to login, take the user to the homepage");
    }
  };

  handleSocial = async (response) => {
    this.setState({ error: "" });
    this.setState({ form: "loading" });

    if (typeof response.accessToken === "undefined") {
      this.setState({ error: "Error on try to social login" });
      this.setState({ form: "" });
      return;
    }

    let provider = null;

    if (typeof response.graphDomain !== "undefined") {
      provider = "facebook";
    } else if (typeof response.tokenObj.idpId !== "undefined") {
      provider = "google";
    } else {
      this.setState({ error: "Error on handle social provider" });
      this.setState({ form: "" });
      return;
    }

    var socialResponse = await login({
      grant_type: "social",
      provider: provider,
      access_token: response.accessToken,
    });

    this.setState({ form: "" });

    if (!socialResponse) {
      this.setState({
        error: "Invalid credentials, check the given data and try again",
      });
      return;
    }

    console.log("Success to login, take the user to the homepage");
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            <Image src="https://react.semantic-ui.com/logo.png" /> Log-in to
            your account
          </Header>
          <Form size="large" className={this.state.form}>
            <Segment stacked>
              <Form.Input
                value={this.state.email}
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={(e) => this.setState({ email: e.target.value })}
              />

              <Form.Input
                value={this.state.password}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />

              <Button
                onClick={this.handleLogin}
                color="blue"
                fluid
                size="large"
              >
                Login
              </Button>
              {this.state.error && (
                <Message negative>
                  <p>{this.state.error}</p>
                </Message>
              )}

              <hr />

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column verticalAlign="middle">
                    <FacebookLogin
                      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                      fields="name,email"
                      callback={this.handleSocial}
                      render={(renderProps) => (
                        <Button
                          onClick={renderProps.onClick}
                          color="facebook"
                          fluid
                        >
                          {" "}
                          <Icon name="facebook" />
                          Facebook
                        </Button>
                      )}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      onSuccess={this.handleSocial}
                      onFailure={this.handleSocial}
                      render={(renderProps) => (
                        <Button
                          onClick={renderProps.onClick}
                          color="google plus"
                          fluid
                        >
                          {" "}
                          <Icon name="google" />
                          Google
                        </Button>
                      )}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
