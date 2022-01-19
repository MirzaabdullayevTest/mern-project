import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)  //{login: noop, logout}
    const message = useMessage()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const { request, loading, clearError, error } = useHttp()


    useEffect(() => {
        message(error)
        clearError()
    }, [clearError, error, message])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })  //serverdan kelayotgan javob
            message(data.message)
        } catch (error) { console.log(error) }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })  //serverdan kelayotgan javob

            auth.login(data.token, data.userId)
            message(data.message)
        } catch (error) { console.log(error) }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Auth page</h2>
                <div className="card light-blue">
                    <div className="card-content white-text">
                        <span className="card-title">Authorisaition</span>

                        <div>
                            <div className="input-field">
                                <input
                                    id="email"
                                    type="text"
                                    name='email'
                                    className='form-input validate'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    name='password'
                                    className='form-input'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                    </div>
                    <div className="card-action">
                        <button
                            className='btn yellow darken-3'
                            style={{ marginRight: '10px' }}
                            disabled={loading}
                            onClick={loginHandler}
                        >Login
                        </button>

                        <button
                            className='btn green darken-3'
                            disabled={loading}
                            onClick={registerHandler}
                        >Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
