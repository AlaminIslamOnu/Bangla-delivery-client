import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Social Login/SocialLogin";

const Login = () => {
  const {singIn} = UseAuth()
   const navigate =useNavigate()
   const location = useLocation()
   const from = location.state?.from || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data.email,data.password);
     singIn(data.email,data.password).then(result=> {
       console.log(result.user);
       navigate(from)
     }).catch(error=> {console.log(error)})
  };

  return (
    <div>
      <h2 className="text-4xl text-center font-bold text-primary">Welcome Back</h2>
      <form onSubmit={handleSubmit(onsubmit)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          {
            errors.password?.type === "required"&& <p className="text-rose-700"> 
                wait ! where is your password ?
            </p>
          },
          {
            errors.password?.type === "minLength"&& <p className="text-rose-700"> 
                Minimum password length is six . so put more..
            </p>
          }
          <p>New this web ? Go <Link to={'/register'}><button className='bg-primary'>Register</button> </Link></p>
 
          <button className="btn btn-primary text-black mt-4">Login</button>
        </fieldset>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Login;
