import { useState } from 'react'
import './SignUp.css'
import { signUpService } from '../../services/auth'
import { useNavigate } from 'react-router'

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: "" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signUpService(formData)
            navigate('/sign-in')

        } catch (error) {
            if (error.response.status === 500) {
                setError({ message: 'Something went wrong!' })
            } else {
                setError(error.response.data)
            }
        }
    }

    return (
        <>
        <div className='signup-container'>
            <h1>Create an account</h1>
            <form className='signup-form' onSubmit={handleSubmit}>

                <div className='form-control'>
                    <label hidden htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' placeholder='Username' onChange={handleChange} required />
                    { error.username && <p className='error-message'>{error.username}</p> }
                </div>

                <div className='form-control'>
                    <label hidden htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' placeholder='Email' onChange={handleChange} required />
                    { error.email && <p className='error-message'>{error.email}</p> }
                </div>

                <div className='form-control'>
                    <label hidden htmlFor='password'>Password</label>
                    <input type='text' name='password' id='password' placeholder='Password' onChange={handleChange} required />
                    { error.password && <p className='error-message'>{error.password}</p> }
                </div>

                <div className='form-control'>
                    <label hidden htmlFor='confirmPassword'>Re enter your password</label>
                    <input type='text' name='confirmPassword' id='confirmPassword' placeholder='Re enter your password' onChange={handleChange} required />
                    { error.confirmPassword && <p className='error-message'>{error.confirmPassword}</p> }
                </div>

                <button className='signup-btn' type='submit'>Creat account</button>

                {error.message && <p className='error-message'>{error.message}</p> }

            </form>
        </div>
        </>
    )
}

export default SignUp