import React from 'react'

export const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Auth page</h2>
                <div className="card light-blue">
                    <div className="card-content white-text">
                        <span className="card-title">Authorisaition</span>

                        <div>
                            <div className="input-field">
                                <input id="email" type="text" name='email' className='form-input validate' />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input id="password" type="password" name='password' className='form-input' />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                    </div>
                    <div className="card-action">
                        <button className='btn yellow darken-3' style={{ marginRight: '10px' }}>Login</button>
                        <button className='btn green darken-3'>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
