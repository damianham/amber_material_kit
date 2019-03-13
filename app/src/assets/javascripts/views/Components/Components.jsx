import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// react components for routing our app without refresh
import { Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
// core components

import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Parallax from 'components/Parallax/Parallax.jsx'
// sections for this page

import SectionBasics from './Sections/SectionBasics.jsx'
import SectionNavbars from './Sections/SectionNavbars.jsx'
import SectionTabs from './Sections/SectionTabs.jsx'
import SectionPills from './Sections/SectionPills.jsx'
import SectionNotifications from './Sections/SectionNotifications.jsx'
import SectionTypography from './Sections/SectionTypography.jsx'
import SectionJavascript from './Sections/SectionJavascript.jsx'
import SectionCarousel from './Sections/SectionCarousel.jsx'
import SectionCompletedExamples from './Sections/SectionCompletedExamples.jsx'
import SectionLogin from './Sections/SectionLogin.jsx'
import SectionExamples from './Sections/SectionExamples.jsx'
import SectionDownload from './Sections/SectionDownload.jsx'

import componentsStyle from 'assets/jss/material-kit-react/views/components.jsx'

class Components extends React.Component {
  render() {
    const { classes, ...rest } = this.props
    return (
      <div>
        <Parallax image={require('assets/img/bg2.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h2 className={classes.title}>Welcome to Amber Framework!</h2>
                  <h4 className={classes.subtitle}>Using Material Kit React - A Badass Material-UI Kit based on Material Design.</h4>
                   
                  <p style={ { marginTop: 10 }}>Thank you for trying out the Amber Framework.
                  We are working hard to provide a super fast and reliable framework that provides
                  all the productivity tools you are used to without sacrificing the speed.</p>

                  <p style={ { marginTop: 10 }}>This application was generated with the 
                    <a href='https://github.com/damianham/amber_material_kit'>Amber Material Kit recipe</a> .
                    Amber recipes create a lot of the boilerplate code to jump start your Amber application.
                    Checkout the recipe on <a href='https://github.com/damianham/amber_material_kit'>Github</a> repository
                    for details about the features included and how you can get started with this recipe.  See the
                    links below to get started with Crystal and Amber.
                  </p>
                </div>
               
                <div className="list-group">
                  <a className="list-group-item list-group-item-action" target="_blank"
                    href="https://docs.amberframework.org">Getting Started with Amber Framework</a>
                  <a className="list-group-item list-group-item-action" target="_blank"
                    href="https://github.com/veelenga/awesome-crystal">List of Awesome Crystal projects and shards</a>
                  <a className="list-group-item list-group-item-action" target="_blank"
                    href="https://crystalshards.xyz">What is hot in Crystal right now</a>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionBasics />
          <SectionNavbars />
          <SectionTabs />
          <SectionPills />
          <SectionNotifications />
          <SectionTypography />
          <SectionJavascript />
          <SectionCarousel />
          <SectionCompletedExamples />
          <SectionLogin />
          <GridItem md={12} className={classes.textCenter}>
            <Link to={'/login-page'} className={classes.link}>
              <Button color="primary" size="lg" simple>
                View Login Page
              </Button>
            </Link>
          </GridItem>
          <SectionExamples />
          <SectionDownload />
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(componentsStyle)(Components)
