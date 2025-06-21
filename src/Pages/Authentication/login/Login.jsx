
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";


const Login = () => {
    const {singIn} = UseAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data.email,data.password);
     singIn(data.email,data.password).then(result=> {
        console.log(result.user);
     }).catch(error=> {console.log(error)})
  };

  return (
    <div>
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

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
