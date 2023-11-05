import React, { Component, useState} from "react";
import * as Components from './Login_Components';
import MapsButton from './MapsButton'

function Login_Main() {
  const [signIn, toggle] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');

  const handleSignInClick = () => {
    console.log("Sign In clicked");
    toggle(true);
  };

  const handleSignUpClick = () => {
    console.log("Sign Up clicked");

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    setPasswordError('');                   //clears password error if passwords match

    //put the sign up logic here

    const userData = {
        username: name,
        email: email,
        password: password,
    }

    fetch('http://127.0.0.1:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Registration successful');
      } else {
        console.error(data.msg);
      }
    })
    .catch(error => {
      console.error(error);
    });
};
    const isSignUpDisabled = password !== confirmPassword;

     return(
         <Components.Container>
            <MapsButton />
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Name' value = {name} onChange={(e) => setName(e.target.value)}/>
                     <Components.Input type='email' placeholder='Email' value = {email} onChange={(e) => setEmail(e.target.value)}/>
                     <Components.Input type='password' placeholder='Password' value = {password} onChange={(e) => setPassword(e.target.value)}/>
                     <Components.Input type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                     {password !== confirmPassword && (<span style ={{ color: 'red'}}> Passwords do not match</span>)}
                     <Components.Button disabled={isSignUpDisabled} onClick={handleSignUpClick}>
                        Sign Up
                     </Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>


             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='email' placeholder='Email' />
                      <Components.Input type='password' placeholder='Password' />
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button>Sign In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         Click over here to sign in
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your Details Here
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sign Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
     )
}

export default Login_Main;
