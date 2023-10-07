import ReactGA from 'react-ga4';

const loginEvent = () =>
  ReactGA.event({
    category: 'login',
    action: 'Click login',
    label: 'Login Analytics',
  });

const gaEvents = {
  eventLogin: loginEvent,
};

export { gaEvents };
