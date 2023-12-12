import React, { useState } from 'react'
import './Form.css'



import user_icon from './icons/user.png';
import email_icon from './icons/email.png';
import password_icon from './icons/password.jpg';
import eye_icon from './icons/eye.png';
import eyes_icon from './icons/eyes.png';


function Form() {
  
  const [action,setAction] = useState('Login');
  
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');


  const tooglePasswordVisibility = ()=> {
  setShowPassword(!showPassword);
};



const handleLogin = async () => {
  console.log('Form data:', email, password);

  // Validate email format
  if (!isValidEmail(email)) {
    alert('Invalid email address');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('API response:', data);

    if (response.ok) {
      // Successful login
      alert('Login successful! Redirecting to the next page.');

      // Redirect to the next page after successful login
      window.location.href = 'https://gymnasticstracks.com/';
    } else {
      // Handle non-successful login
      alert('Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('API error:', error);

    // Inform the user about the error
    alert('An error occurred. Please try again later.');
  } finally {
    // Reset form and switch to signup
    setAction('Sign Up');
    setPassword('');
    setEmail('');
    setName('');
  }
};





const handleSignUp = async () => {
  console.log('Form data:', name, email, password);

  // Validate password length
  if (password.length < 6) {
    alert('Password must be at least 6 characters long');
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    alert('Invalid email address');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log('API response:', data);

    // Success case
    alert('Signup successful! Please click here to proceed.');

    //Redirect to the next page after successful signup
    window.location.href = 'https://gymnasticstracks.com/';
  } catch (error) {
    console.error('API error:', error);

    // Log the specific error message
  console.error('Server error message:', error.message);

    // Inform the user about the error to come
    alert('An error occurred. Please try again later.');
  } finally {
    // Reset form and switch to login
    setAction('Login');
    setPassword('');
    setEmail('');
    setName('');
  }
};



const isValidEmail = (email) => {
  // Simple email validation with the presence of '@'
  return email.includes('@');
};



  return (
    <div className='container'>
        <div className='header'>
            <div className='text' onClick={() => setAction(action === 'Sign Up' ?
            'Login' : 'Sign Up')}>{action}</div>
            <div className='underline'></div>
           
        </div>
        <div className='inputs'>
          {action==="Login"?<div></div>:<div className='input'>
            <img src={user_icon} alt="user icon" />
            <input type="text" placeholder='name' value={name}
              onChange={(e) => setName(e.target.value)}/>
            </div>}
        
            <div className='input'>
            <img src={email_icon} alt="email icon" />
            <input type="email" placeholder='email' value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='input password-input'>
            <img src={password_icon} alt="password icon" />
            <input 
            type={showPassword ? 'text' : "password"}
             placeholder={
              showPassword 
              ? 'Hide Password':'Show Password'} value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            
            
            <div className='password-tooggle' 
            onClick={tooglePasswordVisibility}>

            <img 
            src={showPassword ? eyes_icon : eye_icon} 
            alt={showPassword ? "Hide Password" : "Show Password"}/>
            </div>
            </div>
            </div>
            {action==='Sign Up'?<div></div>:<div className='forgot-password'>Forgot Password?
 <span>Click Here!</span></div>}

            <div className='submit-container'>
            <div className={`submit ${action === 'Sign Up' ? 'red' : 'white'}`}
          onClick={() => {
            if (action === 'Sign Up') {
              handleSignUp();
            } else {
              setAction('Sign Up');
            }
          }}
        >
          {action === 'Sign Up' ? 'Sign Up' : 'Sign Up'}
        </div>


            <div className={`submit ${action === 'Login' ? 'red' : 'white'}`}
          onClick={() => {
            if (action === 'Login') {
    handleLogin();
            } else {
              setAction('Login');
            }
          }}
        >
          {action === 'Login' ? 'Login' : 'Login'}
        </div>
    </div>
    </div>
  )
}

export default Form;