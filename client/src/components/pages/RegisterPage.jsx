import React from "react";
import profileUser from "../../assets/images/icons/profile-user.png";
import ActionBtn from "../utils/ActionBtn";
import Input from "../utils/Input";
import { useState } from "react";
import Alert from "../utils/Alert";
import checkForErrors from "../../validators/checkForErrors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    role: "user",
  });

  // state to handle error messages
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState({
    text: "",
    type: "",
  });

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  function handleOnChange(event) {
    const { value, name } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  // function to handle submission
  async function handleOnSubmit() {
    setIsError(checkForErrors(userData, setError));
    if (!isError) {
      setIsLoading(true);
      // store userdata into the database
      try {
        const response = await axios.post(`${backendURL}/api/auth/register`, {
          username: userData.username,
          password: userData.password,
          email: userData.email,
          role: userData.role,
        });
        
        document.getElementById('success-modal').showModal();
      } catch (error) {
        setError({ text: error.response.data.message, type: "error" });
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="container max-w-screen-2xl md:px-20 px-3">
      <div className="lg:my-20 my-20">
        <div className="lg:w-1/2 mx-auto border border-primary rounded-md bg-base-200 px-7 py-5">
          <div className="text-center my-3">
            <img
              src={profileUser}
              className="w-28 mx-auto"
              alt="Profile user"
            />
            <h1 className="text-2xl text-primary">Register</h1>
            <div className="my-3">
              {error.text !== "" && (
                <Alert alertType={error.type} text={error.text}></Alert>
              )}
              {isLoading && (
                <div className="loading bg-primary loading-spinner mx-auto loading-lg"></div>
              )}
            </div>
          </div>
          <div className="my-4">
          <Input
            type={"email"}
            placeholder={"example@xyz.com"}
            name={"email"}
            onChangeMethod={handleOnChange}
            value={userData.email}
            svgType={"email"}
          ></Input>
          </div>

          <div className="my-4">
          <Input
            type={"text"}
            placeholder={"Mr.John Doe"}
            name={"username"}
            onChangeMethod={handleOnChange}
            value={userData.username}
            svgType={"user"}
          ></Input>
          </div>

          <div className="my-4">
          <Input
            type={"password"}
            placeholder={"create password"}
            name={"password"}
            onChangeMethod={handleOnChange}
            value={userData.password}
            svgType={"secret"}
          ></Input>
          </div>

          <div className="my-4">
          <Input
            type={"password"}
            placeholder={"confirm password"}
            name={"confirm"}
            onChangeMethod={handleOnChange}
            value={userData.confirm}
            svgType={"secret"}
          ></Input>
          </div>

          <div className={`mt-5 text-center ${isLoading ? 'hidden' : 'block'}`}>
            <ActionBtn text={"Submit"} action={handleOnSubmit}></ActionBtn>
          </div>
        </div>
      </div>

      {/* success modal */}
      <dialog id="success-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-success">Congadulations!!</h3>
          <p className="py-4">
            Your account has been created in Combinet. Login to explore more...
          </p>
          <button className="btn btn-primary">Login now</button>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => {navigate('/login')}}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default RegisterPage;
