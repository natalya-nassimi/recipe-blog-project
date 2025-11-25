import './SignIn.css'
import { UserContext } from '../../contexts/UserContext'
import { signInService } from '../../services/auth'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { getUserFromToken, setToken, getToken } from '../../utils/token'

const SignIn = () => {

    const { setUser } = useContext(UserContext)
    const [ formData, setFormData] = useState({
        username: "",
        password:""
    })
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const input = e.target
        setFormData({ ...formData, [input.name]: input.value })
        setError({ ...error, [input.name]: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await signInService(formData)
            const token = response.data
            if (token) setToken(token)
            setUser(getUserFromToken())
            navigate('/recipes')
        } catch (error) {
            if(error.response.status === 500) {
                setError({ message: 'Something went wrong!'})
            } else {
                setError(error.response.data)
            }
        }
    }
    
    return (
        <>
        <div className='signin-container'>
            <h1>Sign In</h1>
            <form className='signin-form' onSubmit={handleSubmit}>

                <div className='form-control'>
                    <label hidden htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' placeholder='Username' onChange={handleChange} required />
                </div>

                <div className='form-control'>
                    <label hidden htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' placeholder='Password' onChange={handleChange} required />
                </div>

                <button className='signin-btn' type='submit'>Sign In</button>

                {error.message && <p className='error-message'>{error.message}</p> }

            </form>
        </div>
        </>
    )
}

export default SignIn