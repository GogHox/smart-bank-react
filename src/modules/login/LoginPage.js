import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {API_URL} from '../../Constants';
import {LoginContext} from "../../contexts/LoginContext";


function LoginPage() {
    let history = useHistory();
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')

    const {
        loggedInUser,
        isLoggedIn,
        setLoginUserDetails,
        logoutUser } = useContext(LoginContext);

    const changeUserId = (e) => {

        /**
         * Set user id from input
         */
        setUserId(e.target.value)

    }

    const changePassword = (e) => {
        /**
         * Set password from input
         */
        setPassword(e.target.value)
    }

    const verifyLogin = async (e) => {

        e.preventDefault();
        console.log(userId, " /", password);

        let loginDetail = {
            userId: userId,
            password: password
        }

        // navigating to the homepage after login success
        await axios.post(API_URL + 'ccuser/login', loginDetail)
            .then(response => {
                console.log('login success!', response);
                setUserId('');
                setPassword('');
                setLoginUserDetails(response.data.body)
                history.push('/rewards');

            }).catch(error => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('error', error.message);

                }
                setUserId('');
                setPassword('');

            })

    }

    return (
        <div className="login-page container">

            <h3>Welcome to SmartBank Credit card</h3>
            <hr></hr>

            <div className="login-form">
                <div className="row">
                    <div className="col-md-6">
                        {/* call the verify login function to get the response from API server  */}
                        <form onSubmit={verifyLogin}>

                            <div className="form-group">
                                <label>
                                    <h5>
                                        <i className="fas fa-user"></i>&nbsp;User id
                                    </h5>
                                </label>
                                <input type="text" value={userId} required className="form-control"
                                       onChange={changeUserId}/>
                            </div>

                            <div className="form-group">
                                <label><h5><i className="fas fa-lock"></i>&nbsp;Password</h5></label>
                                <input type="password" value={password} required className="form-control"
                                       onChange={changePassword}/>
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;