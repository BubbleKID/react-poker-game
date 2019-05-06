import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Motion, spring } from 'react-motion';
import Card from '../Card';
// import CardContainer from '../CardContainer2';

const io = require('socket.io').listen('http://localhost:3300/');

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    height: '100vh',
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

// const springConfig = {
//   stiffness: 340,
//   damping: 88,
//   precision: 0.0001
// };

// const getSprings = (x, y) => ({
//   x: spring(x, springConfig),
//   y: spring(y, springConfig)
// });

const colorTheme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
  },
  typography: { useNextVariants: true },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: [],
      socket: io(),
      rotationY: 0,
      // x: 0,
      deal: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { socket } = this.state;
    socket.on('chat message', (msg) => {
      this.setState({
        hand: msg,
      });
    });
  }

  handleClick() {
    const { socket } = this.state;
    this.setState({ deal: true, rotationY: 180 });
    socket.emit('login', { uid: 111, username: 'mark' });
    socket.emit('chat message', '123123');
  }

  render() {
    const { classes } = this.props;
    // const sprungRange = getSprings(this.state.x, 0);
    const { deal, hand, rotationY } = this.state;
    return (
      <MuiThemeProvider theme={colorTheme}>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <SvgIcon viewBox="0 0 24 24" className={classes.icon}>
              <path d="M11.19,2.25C11.97,2.26 12.71,2.73 13,3.5L18,15.45C18.09,15.71 18.14,16 18.13,16.25C18.11,17 17.65,17.74 16.9,18.05L9.53,21.1C9.27,21.22 9,21.25 8.74,21.25C7.97,21.23 7.24,20.77 6.93,20L1.97,8.05C1.55,7.04 2.04,5.87 3.06,5.45L10.42,2.4C10.67,2.31 10.93,2.25 11.19,2.25M14.67,2.25H16.12C17.22,2.25 18.12,3.15 18.12,4.25V10.6L14.67,2.25M20.13,3.79L21.47,4.36C22.5,4.78 22.97,5.94 22.56,6.96L20.13,12.82V3.79M11.19,4.22L3.8,7.29L8.77,19.3L16.17,16.24L11.19,4.22M8.65,8.54L11.88,10.95L11.44,14.96L8.21,12.54L8.65,8.54Z" />
            </SvgIcon>
            <Typography variant="h6" color="inherit" noWrap>
              React Poker Game
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                React Poker Game
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleClick}
                      >
                        试试手气
                      </Button>
                    </div>
                  </Grid>
                </Grid>
                <div>
                  <div
                    style={{
                      WebkitTransform: 'translate3d(0px, 200px, 0)',
                      transform: 'translate3d(0px, 200px, 0)',
                      width: '150px',
                      height: '200px',
                      zIndex: '3',
                      position: 'absolute',
                    }}
                  >
                    <Card
                      size={200}
                      card="back"
                      faceDown
                      doubleBacked={false}
                      rotationY={0}
                    />
                  </div>
                  <Motion style={{ x: spring(deal ? 200 : 0) }}>
                    {({ x }) => (
                      <div
                        style={{
                          WebkitTransform: `translate3d(${x}px, 200px, 0)`,
                          transform: `translate3d(${x}px, 200px, 0)`,
                          width: '150px',
                          height: '200px',
                          zIndex: '3',
                          position: 'absolute',
                        }}
                      >
                        <Card
                          size={200}
                          card={
                            hand.length !== 0
                              ? hand[0][0].join('')
                              : ''
                          }
                          faceDown
                          doubleBacked={false}
                          rotationY={rotationY}
                        />
                      </div>
                    )}
                  </Motion>
                  <Motion style={{ x: spring(deal ? 400 : 0) }}>
                    {({ x }) => (
                      <div
                        style={{
                          WebkitTransform: `translate3d(${x}px, 200px, 0)`,
                          transform: `translate3d(${x}px, 200px, 0)`,
                          width: '150px',
                          height: '200px',
                          zIndex: '3',
                          position: 'absolute',
                        }}
                      >
                        <Card
                          size={200}
                          card={
                            hand.length !== 0
                              ? hand[0][1].join('')
                              : ''
                          }
                          faceDown
                          doubleBacked={false}
                          rotationY={rotationY}
                        />
                      </div>
                    )}
                  </Motion>
                  <Motion style={{ x: spring(deal ? 600 : 0) }}>
                    {({ x }) => (
                      <div
                        style={{
                          WebkitTransform: `translate3d(${x}px, 200px, 0)`,
                          transform: `translate3d(${x}px, 200px, 0)`,
                          width: '150px',
                          height: '200px',
                          zIndex: '3',
                          position: 'absolute',
                        }}
                      >
                        <Card
                          size={200}
                          card={
                            hand.length !== 0
                              ? hand[0][2].join('')
                              : ''
                          }
                          faceDown
                          doubleBacked={false}
                          rotationY={rotationY}
                        />
                      </div>
                    )}
                  </Motion>
                  <div className="container" />
                </div>
              </div>
              <Typography
                id="log"
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {hand.length !== 0 ? hand[1] : ''}
              </Typography>
            </div>
          </div>
        </main>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.Instanceof(Object).isRequired,
};

export default withStyles(styles)(App);
