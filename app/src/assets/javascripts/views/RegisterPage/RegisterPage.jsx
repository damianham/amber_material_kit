import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import Email from '@material-ui/icons/Email'
import People from '@material-ui/icons/People'
// core components

import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.jsx'

import image from 'assets/img/bg7.jpg'

import { EventBus } from '../../../../lib/js/eventBus'
import Auth from '../../../../lib/js/auth'
import { short, validEmail } from '../../../../lib/js/utils'

class RegisterPage extends React.Component {
  constructor (props) {
    super(props)
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm_password: '',
      invalid: {},
      message: ''
    }
  }

  onChangeEmail (event) {
    this.setState({ email: event.target.value })
  }

  onChangePassword (event) {
    this.setState({ password: event.target.value })
  }

  onChangeConfirmPassword (event) {
    this.setState({ confirm_password: event.target.value })
  }

  onChangeFirstname (event) {
    this.setState({ firstname: event.target.value })
  }

  onChangeLastname (event) {
    this.setState({ lastname: event.target.value })
  }

  signup (event) {
    const $ = window.$

    event.preventDefault()

    const invalid = {}
    let message

    if (short(this.state.firstname, 2)) {
      invalid.firstname = true
      message = 'First Name is too short'
    }
    if (short(this.state.lastname, 2)) {
      invalid.lastname = true
      message = message || 'Last Name is too short'
    }
    if (!validEmail(this.state.email)) {
      invalid.email = true
      message = message || 'Email does not appear to be valid'
    }
    if (short(this.state.password, 8)) {
      invalid.password = true
      message = message || 'Password is too short'
    }

    if (this.state.confirm_password !== this.state.password) {
      invalid.confirm = true
      message = message || 'Passwords do not match'
    }

    if (Object.keys(invalid).length > 0) {
      this.setState({ invalid: invalid, message: message })
      return
    } else {
      this.setState({ invalid: {}, message: '' })
    }

    // console.log('signup started', this.state)

    $.ajax({
      url: '/api/smartboat/register',
      method: 'POST',
      dataType: 'json',
      data: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        _csrf: window.csrf_token
      }
    }
    ).then((response) => {
      // console.log('signup response', response.token, response.user)
      Auth.authenticateUser(response.token, response.user)
      EventBus.emit('user authenticated', response.user)
      window.location = '/#/'
    }
    ).catch((error) => {
      console.log('signup error', error, this.state)
      window.location = '/#/'
    })
  }

  componentDidMount () {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: '' })
      }.bind(this),
      700
    )
  }

  render () {
    const { classes, ...rest } = this.props
    return (
      <div style={ { width: '100%' } }>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: 'url(' + image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'top center'
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} onSubmit={this.signup.bind(this)}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Register</h4>
                    </CardHeader>

                    <CardBody>
                      <CustomInput
                        labelText="First Name..."
                        id="first"
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={this.state.invalid.firstname || false}
                        inputProps={{
                          type: 'text',
                          value: this.state.firstname,
                          onChange: this.onChangeFirstname.bind(this),
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Last Name..."
                        id="last"
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={this.state.invalid.lastname || false}
                        inputProps={{
                          type: 'text',
                          value: this.state.lastname,
                          onChange: this.onChangeLastname.bind(this),
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={this.state.invalid.email || false}
                        inputProps={{
                          type: 'email',
                          name: 'email',
                          value: this.state.email,
                          onChange: this.onChangeEmail.bind(this),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={this.state.invalid.password || false}
                        inputProps={{
                          type: 'password',
                          name: 'password',
                          value: this.state.password,
                          onChange: this.onChangePassword.bind(this),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Confirm Password"
                        id="confirm"
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={this.state.invalid.confirm || false}
                        inputProps={{
                          type: 'password',
                          name: 'password',
                          value: this.state.confirm_password,
                          onChange: this.onChangeConfirmPassword.bind(this),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      <div>
                        <p>
                          {this.state.message}
                        </p>
                      </div>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>

                      <div onClick={this.signup.bind(this)}>
                        <Button color="primary" size="lg">
                          Get started
                        </Button>
                      </div>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    )
  }
}

export default withStyles(loginPageStyle)(RegisterPage)
