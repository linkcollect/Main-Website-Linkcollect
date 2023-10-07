import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Banner from '../components/Sections/Authentication/Banner';
// import mainLogo from '../assets/mainLogo.svg';
// import Input from '../components/UI/Input/Input';
// import GoogleAuthBtn from '../components/Sections/Authentication/GoogleAuthBtn';
// import Loader from '../components/UI/Loader/Loader';
import { setJwtInRequestHeader } from '../api-services/httpService';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../store/Slices/user.slice';
import { getUserDetails, loginAction } from '../store/actions/user.action';
// import Button from '../components/UI/Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import * as Components from '../pages/Components';

const Login = ({ windowWidth }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  // Login details
  const onInput = e => {
    e.preventDefault();
    setData(state => ({ ...state, [e.target.name]: e.target.value }));
  };
  // For google auth redirect and email verification redirect from server with token in query
  useEffect(() => {
    let token = new URLSearchParams(location.search).get('token');
    if (token && !auth.isLoggedIn) {
      setJwtInRequestHeader(token);
      localStorage.setItem('token', token);
      dispatch(setLoggedInUser({ token }));
      dispatch(getUserDetails({ token }));
    }
  }, []);
  const [signIn, toggle] = React.useState(true);
  // To handle login
  const handleLogin = async e => {
    e.preventDefault();
    const something = dispatch(
      loginAction({ email: data.email, password: data.password })
    );

    setTimeout(() => {
      console.log('log', auth);
      const token = localStorage.getItem('token');
      if (!auth.isLoggedIn && !token) {
        console.log('not logged in', auth.isLoggedIn);
        // alert('Invalid Credentials');
        toast.error('Invalid Credentials', {
          style: {
            border: '1px solid #4B4C63',
            padding: '6px',
            color: '#713200',
            boxShadow: 'none',
            width: 'max-content',
            minWidth: 'max-content',
          },
        });
      }
    }, 1000);

    // // if(auth.isLoggedIn){
    //   console.log(auth.token)
    //   setJwtInRequestHeader(auth.token);
    //   navigate(`/${auth.username}`)
    // // }
  };

  return (
    <>
      <Components.Container style={{ marginTop: '9%', marginLeft: '25%' }}>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" placeholder="Name" />
            <Components.Input type="email" placeholder="Email" />
            <Components.Input type="password" placeholder="Password" />
            <Link to="/">
              <Components.Button>Sign Up</Components.Button>
            </Link>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="email" placeholder="Email" />
            <Components.Input type="password" placeholder="Password" />
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Link to="/">
              <Components.Button>Sigin In</Components.Button>
            </Link>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </>
  );
};

export default Login;

// ${data.email.length > 1 && data.password.length > 0
