import React from "react";
import Input from "../utils/Input";
import { useState, useEffect } from "react";
import loginIcon from '../../assets/images/icons/loginIcon.png';
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from '../../redux/features/user/userSlice'
import Alert from "../utils/Alert";

export default function LoginPage(){
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
        role: "user"
    })
    const dispatch = useDispatch();
    const {loading, error, user} = useSelector((state) => state.user);

    function handleOnChange(event){
        const {value, name} = event.target;
        setLoginData({...loginData, [name]: value});
    }

    function handleSubmit(){
        dispatch(loginUser(loginData));
    }

    useEffect(() => {
        console.log(user)
        if(user){
            navigate('/');
        }
    }, [user, navigate]);

    return(
        <div className="container max-w-screen-2xl md:px-20 px-3 grid lg:grid-cols-2 grid-cols-1 my-28">
            <div className="mx-auto px-10 lg:order-1 order-2">
                <h1 className="text-4xl text-primary font-bold my-3">Combinet</h1>
                <p className="text-justify text-lg my-3">A platform designed for tech enthusiasts, programmers, and students to connect, share knowledge, and grow together. Dive into a wide array of tech blogs across various categories, engage with fellow coders by sharing insights and commenting on code, and be part of a vibrant community. As we evolve, expect even more advanced features to enhance your learning and collaboration experience. Join Combinet and fuel your passion for technology!</p>
                <Link to={'/'}><button className="my-3 btn btn-primary btn-md w-40">Home</button></Link>
            </div>
            <div className="mx-auto lg:w-3/4 border border-primary px-7 py-3 rounded-lg lg:order-2 order-1">
                <img src={loginIcon} className="block mx-auto my-1 w-24" />
                <h1 className="text-center text-3xl text-primary">Login</h1>
                {loading && <div className="loading bg-primary loading-spinner block mx-auto loading-lg"></div>}
                {error && <div className="my-2"><Alert alertType={'error'} text={'Invalid credentials'}></Alert></div>}
                <div className="my-3">
                    <label className="label" id="username">Enter your username</label>
                    <Input type={'text'} placeholder={'Username'} value={loginData.username} onChangeMethod={handleOnChange} svgType={'user'} name={'username'} ></Input>
                </div>
                <div className="my-3">
                    <label className="label" id="password">Enter your password</label>
                    <Input type={'password'} placeholder={'Password'} value={loginData.password} onChangeMethod={handleOnChange} svgType={'secret'} name={'password'}></Input>
                </div>
                <div className="my-3">
                    <button className={`btn btn-primary mx-auto ${loading ? 'hidden' : 'block'} w-20 text-lg my-5`} onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
}