import React from 'react'

const Register = () => {
    return (
        <div className="sign-form">
            <input 
                type="email" 
                placeholder='email' 
                required
                autoComplete={'new-password'}
            />
            <input 
                type="password" 
                placeholder='password' 
                required 
                autoComplete={'off'}
                minLength={6}
            />
            <button>Sign In</button>
        </div>
    )
}

export default Register
