import './LoginPage.css'
import { useState } from "react";
import { NavLink } from 'react-router-dom'; 
import { uuid } from 'uuidv4';
import axios from 'axios';

function RegistrationForm (props) {
    const [ state, setState ] = useState({
        email : '',
        password : '',
        confirmPassword : ''
    })
    
    const handleChange = (event) => {
        const { id, value } = event.target
        setState( prevState => ({
            ...prevState,
            [id] : value
        }))
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            const newUser ={
                id: uuid(),
                email: state.email,
                password: state.password
            }
            axios.post('http://localhost:4444/users', newUser)
            .then(alert('you have succeeded registered'))
            .catch( err => {
                err = new Error()
            })    
        } else {
            alert("Passwords don't match");
        }
    }

    return (
    <>
        
        <div className="wrapper fadeInDown mt-5">
            <div id="formContent">

                <h1 className='mt-4'>Register</h1>
                {props.loggedIn ? <p>Logged In</p> : <p>Not Registered</p>}

                <form>
                    <input type="text" id="email" className="fadeIn first mt-2" name="email" required placeholder="Enter email" value={state.email}
                       onChange={handleChange}></input>
                    <input type="text" id="password" className="fadeIn second" name="login" placeholder="Password"  required value={state.password}
                        onChange={handleChange} ></input>
                    <input type="text" id="confirmPassword" className="fadeIn third" name="login" placeholder="Confirm Password"  required value={state.confirmPassword}
                        onChange={handleChange} ></input>
                    <input type="submit" className="fadeIn fourth" value="Register" onClick={handleSubmitClick} ></input>
                </form>

                <div id="formFooter">
                    <NavLink className="underlineHover" to="/login">Already registered?</NavLink>
                </div>

            </div>
        </div>

        </>
    )
};


export default RegistrationForm;