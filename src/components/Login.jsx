import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Form, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            const res = await axios.post(
                BASE_URL+"/login",
                { emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data)); //add data into redux store
            return navigate("/")
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    const handleSignUp = async () => {

        try {
            const res = await axios.post(
                BASE_URL +"/signup",
                { emailId, password, firstName, lastName },
                { withCredentials: true }
            );
            console.log(res.data);
            dispatch(addUser(res.data.data));
            navigate("/profile");

        }
        catch(err){
             setError(err?.response?.data || "Something went wrong");
        }
    }

    const handleSubmit = () => {
        if (isLoginForm) {
         handleLogin();
        } else {
         handleSignUp();
        }
    };

    return <div 
  className="flex justify-center items-center flex-1 w-full"
  style={{
    backgroundImage: `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='160' height='160' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(240,6.7%,17.6%,1)'/><path d='M121.5 39.5V9.169c0-2.827 1.724-4.707 3.473-5.602l.707-.362c2.086-1.068 4.702-.631 6.359 1.026l1.985 1.985c1.349 1.349 3.235 2.018 5.14 2.128 12.336 0 12.336-18.505 0-18.505M40.75 39.499V9.17c0-2.827-1.724-4.707-3.473-5.602l-.707-.362c-2.086-1.068-4.702-.631-6.359 1.026l-1.985 1.985c-1.349 1.349-3.236 2.018-5.14 2.128-12.336 0-12.336-18.505 0-18.505m146.575 111.248c0-12.337-18.505-12.337-18.505 0 .11 1.904.78 3.79 2.128 5.139l1.985 1.985c1.657 1.657 2.094 4.273 1.026 6.36l-.362.706c-.895 1.75-2.775 3.474-5.602 3.474l-30.33-.001m49.66-63.086c0 12.336-18.505 12.336-18.505 0 .11-1.904.78-3.791 2.128-5.14l1.985-1.985c1.657-1.657 2.094-4.273 1.026-6.359l-.362-.707c-.895-1.749-2.775-3.474-5.602-3.473h-30.33m19.162 130.344c12.337 0 12.337-18.505 0-18.505-1.631 0-3.99.98-5.139 2.128l-1.985 1.985c-1.656 1.656-4.274 2.094-6.36 1.027l-.706-.362c-2.086-1.069-3.474-3.258-3.474-5.602v-34.302l.001-26.228c0-2.344-1.427-4.458-3.473-5.602l-.707-.361a5.83 5.83 0 00-6.36 1.026l-1.984 1.985c-1.144 1.152-3.508 2.128-5.14 2.128-12.336 0-12.336-18.505 0-18.505 1.904.11 3.715.86 5.14 2.128l1.985 1.985a5.812 5.812 0 006.359 1.026l.707-.362c1.287-1.485 3.473-2.775 3.473-5.602v-30.33M23.086 168.343c-12.336 0-12.336-18.505 0-18.505 1.632 0 3.992.98 5.14 2.128l1.985 1.985c1.656 1.656 4.274 2.094 6.359 1.027l.707-.362c2.086-1.069 3.474-3.258 3.474-5.602l-.001-34.302V88.485c0-2.344 1.387-4.533 3.473-5.602l.707-.361c2.085-1.068 4.703-.63 6.359 1.026l1.985 1.985c1.148 1.148 3.508 2.128 5.14 2.128 12.336 0 12.336-18.505 0-18.505-1.905.11-3.791.78-5.14 2.128l-1.985 1.985c-1.657 1.657-4.273 2.094-6.36 1.026l-.706-.362c-1.75-.895-3.474-2.775-3.474-5.602v-30.33m80.75 80.749H91.17c-2.827 0-4.707 1.724-5.602 3.473l-.362.707c-1.068 2.086-.631 4.702 1.026 6.359l1.985 1.985c1.349 1.349 2.018 3.236 2.128 5.14 0 12.336-18.505 12.336-18.505 0 0-1.632.98-3.992 2.128-5.14l1.985-1.985c1.656-1.656 2.094-4.274 1.026-6.359l-.361-.707c-1.069-2.086-3.258-3.474-5.602-3.473h-60.53c-2.344 0-4.533-1.387-5.602-3.473l-.362-.707c-1.067-2.085-.63-4.703 1.027-6.359l1.985-1.985c1.148-1.148 2.128-3.508 2.128-5.14 0-12.336-18.505-12.336-18.505 0M121.5 38H91.169c-2.827 0-4.707-1.724-5.602-3.473l-.362-.707c-1.068-2.086-.631-4.702 1.026-6.359l1.985-1.985c1.349-1.349 2.018-3.235 2.128-5.14C90.344 8 71.84 8 71.84 20.337c0 1.632.977 3.994 2.128 5.14.663.66 1.343 1.305 1.985 1.985 1.608 1.703 2.003 4.23 1.026 6.36-.11.24-.233.474-.361.706C75.48 36.577 73.359 38 71.015 38H36.712L10.485 38c-2.344 0-4.533 1.387-5.602 3.473-.12.236-.24.471-.362.707-1.067 2.085-.63 4.703 1.027 6.36l1.985 1.984c1.148 1.148 2.128 3.508 2.128 5.14C9.66 68-8.844 68-8.844 55.664' stroke-width='0.5' stroke='%23000000ff' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,-640)' fill='url(%23a)'/></svg>")`
  }}
>
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center text-xl">{isLoginForm ? "Login" : "Sign Up"}</h2>
                <div>
                    {!isLoginForm && <><fieldset className="fieldset my-2">
                        <legend className="fieldset-legend text-lg">First Name:</legend>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend text-lg">Last Name:</legend>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                            className="input" placeholder="Type here" />
                    </fieldset></>}
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend text-lg">Email ID</legend>
                        <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)}
                            className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend text-lg">Password</legend>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                         onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            className="input" placeholder="Type here" />
                    </fieldset>
                </div>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center m-2">
                    <button className="btn btn-primary" 
                    onClick={handleSubmit}>
                        {isLoginForm ? "Login" : "Sign Up"}</button>
                </div>
                <p className="text-center mt-2 text-lg cursor-pointer" onClick={() =>setIsLoginForm((value)=> !value)}>
                    {isLoginForm ?"Don't have an account? Sign Up" : "Already have an account? Login"}</p>
            </div>
            
        </div></div>
};

export default Login;