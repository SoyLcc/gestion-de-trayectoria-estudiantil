import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import './loginStyles.css';

function Login(props) {
    const [data, setData] = useState({ student_id: '', password: '' });
    const [alert, setAlert] = useState('');

    const { setIsAuth } = useContext(AuthContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } }; //Default origin is from the route that sent to the login page OR from "/" root

    const onConfirm = () => {
        console.log("Confirmado")
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:4000/api/users/login',
                data,
            });

            if (response.status === 200) {
                console.log(response);
                localStorage.setItem('isAuth', 'true');
                localStorage.setItem('userID', response.data.data.user._id);
                if(response.data.data.user.role === "admin"){
                    localStorage.setItem('isAdmin', 'true');
                }
                setIsAuth(true);
                history.replace(from);
            }
        } catch (error) {
            return setAlert(
                <SweetAlert
                    danger
                    title="Something Wrong.."
                    onConfirm={onConfirm}
                    customButtons={
                        <React.Fragment>
                            <input
                                onClick={() => setAlert(null)}
                                value="Ok"
                                type="submit"
                                className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                            />
                        </React.Fragment>
                    }
                >
                    Student_id and/or password not correct.{' '}
                </SweetAlert>
            );
        }
    };

    return (
        <div className="container">
            <form className="form-signin" onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Iniciar sesión</h1>
                </div>

                <div className="form-label-group mb-3">
                    <label htmlFor="inputEmail">Expediente</label>
                    <input type="text" id="inputEmail" className="form-control" placeholder="Numero de expediente" required value={data.student_id} onChange={(e) => setData({ ...data, student_id: e.target.value })}/>
                </div>

                <div className="form-label-group">
                    <label htmlFor="inputPassword">Contraseña</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña" required  value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}/>
                </div>

                <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
