import React,{useState} from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = ({ setLogin }) => {
  const navigate  = useNavigate()
    const[data, setData] = useState({
        email : '',
        password : "",
    })
     const loginApi =async () => {
      try {
        const response =await axios.post("http://localhost:3000/login",data,{
          headers: { 'Content-Type': 'application/json' },
          
        })
        if(response.status != 200){
           throw new Error(response.data.message || "Credentials incorrect")
        }

        localStorage.setItem('token', response.data.accessToken)
        console.log('accessToken', response.data.accessToken)
        navigate("/userPage")
      } catch (error) {
        console.log(error)
      }
    }
  const onClickHandle = (e) => {
  const {name, value} = e.target
  setData(prev => ({...prev, [name]:value}))

  };

  const handleLogin = () => {
    loginApi()

  };
  const handlclose = () => {
    setLogin(false);
  };
  return (
    <div className="w-[25rem] text-white rounded-xl h-[25rem] bg-gray-900 absolute top-[24%] left-[40%] z-10">
      <button className="flex float-end mr-5 mt-5" onClick={handlclose}>
        <RxCross2 className="text-white w-[20px] h-[20px] " />
      </button>
      <div className="absolute flex flex-col top-20 left-10 gap-2">
        <label htmlFor="Email" className="font-bold block">
          Email
        </label>
        <input
          type="text"
          value={data.email}
          name="email"
          onChange={onClickHandle}
          placeholder="Enter your Email Address"
          className="w-[300px] h-10 rounded-md  text-white/80 border-[1px] p-5 bg-black"
        />

        <label htmlFor="Last name" className="font-bold block">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={onClickHandle}
          placeholder="Enter your Password"
          className="w-[300px] h-10 rounded-md text-white/80 border-[1px] p-5 bg-black"
        />
        <Link to='/userPage' onClick={handleLogin} className=" ml-[100px] my-5 rounded-full bg-green-600 w-[100px] flex items-center  justify-center">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Login;
