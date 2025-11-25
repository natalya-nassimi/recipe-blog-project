import './Navbar.css'
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import logo from '../../assets/logo.png'

const Navbar = () => {
    const { user, signOut } = useContext(UserContext)

    return (
        <header className='navbar'>
            <div className='logo'>
                <Link to= "/recipes" className='logo-link'>
                <img src={logo} alt='app logo' className='navbar-logo' />
                </Link>
            </div>

            <nav className='navbar-links'>
                <Link to='/recipes'>Recipe Collection</Link>
                { user 
                    ? (
                        <>
                            <Link to='/recipes/new'>Post a Recipe</Link>
                            <Link to='/recipes/my-recipes'>My Recipes</Link>
                            <Link to='/recipes' onClick={signOut}>Sign Out</Link>
                        </>
                    )
                    : (
                        <>
                            <Link to='/sign-in'>Sign In</Link>
                            <Link to='/sign-up'>Sign Up</Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Navbar