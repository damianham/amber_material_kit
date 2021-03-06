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

import { EventBus } from '../../../../lib/js/eventBus'
import Auth from '../../../../lib/js/auth'
import { short, validEmail } from '../../../../lib/js/utils'

import image from 'assets/img/bg7.jpg'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
      email: '',
      password: '',
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

  signin (event) {
    const $ = window.$

    const invalid = {}
    let message

    event.preventDefault()

    if (!validEmail(this.state.email)) {
      invalid.email = true
      message = 'Email does not appear to be valid'
    }
    if (short(this.state.password, 8)) {
      invalid.password = true
      message = message || 'Password is too short'
    }

    if (Object.keys(invalid).length > 0) {
      this.setState({ invalid: invalid, message: message })
      return
    } else {
      this.setState({ invalid: {}, message: '' })
    }

    $.ajax({
      url: '/api/auth/signin',
      method: 'POST',
      dataType: 'json',
      data: { email: this.state.email, password: this.state.password }
    }
    ).then((response) => {
      Auth.authenticateUser(response.token, response.user)
      EventBus.emit('user authenticated', response.user)
      window.location = '/#/'
    }
    ).catch(() => {
      window.toastr.error('email and/or password is invalid - please try again')
    })
  }

  getSocialButtons (classes) {
    return (
      <div className={classes.socialLine}>
        <Button
          justIcon
          href="https://twitter.com"
          target="_blank"
          color="transparent"
          onClick={e => e.preventDefault()}
        >
          <i className={'fab fa-twitter'} />
        </Button>
        <Button
          justIcon
          href="https://facebook.com"
          target="_blank"
          color="transparent"
          onClick={e => e.preventDefault()}
        >
          <i className={'fab fa-facebook'} />
        </Button>
        <Button
          justIcon
          href="https://google.com"
          target="_blank"
          color="transparent"
          onClick={e => e.preventDefault()}
        >
          <i className={'fab fa-google-plus-g'} />
        </Button>
      </div>
    )
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
                  <form className={classes.form} onSubmit={this.signin.bind(this)}>
                    <input type="hidden" name="_csrf" value={window.csrf_token} />
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>

                    </CardHeader>
                    <p className={classes.divider}>Enter your email address and password</p>
                    <CardBody>

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
                      <div>
                        <p>
                          {this.state.message}
                        </p>
                      </div>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <div onClick={this.signin.bind(this)}>
                        <Button color="primary" size="lg">
                          Sign In
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

export default withStyles(loginPageStyle)(LoginPage)
