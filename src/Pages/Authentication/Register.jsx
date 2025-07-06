import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Authcontext } from '../../Contexts/Authcontext';
import { Link, useNavigate} from 'react-router';
import SocialLogin from './Social Login/SocialLogin';
import axios from 'axios';
import UseAxios from '../../Hooks/UseAxios';

const Register = () => {
  const navigate =useNavigate()
    const [profilePic, setProfilePic]= useState('')
    const {registration,updateUserProfile}= use(Authcontext)
    const axiosInstance= UseAxios()
    // console.log(user);
    const {register,handleSubmit,
        formState: {errors},
    }= useForm()
    const onsubmit = data => {
        // console.log(data.email,data.password);
        registration(data.email, data.password).then(async(result)=> {
            console.log(result.user);
            navigate('/')
            // update profilein firebase 
            const userInfo ={
              email : data.email,
              role: 'user',  /* default  */
              created_at : new Date().toISOString(),
              last_log_in: new Date().toISOString()
            }
            const userRes = await axiosInstance.post('users', userInfo)
            console.log(userRes.data);

            const userProfile = {
               displayName : data.name,
               photoURL: profilePic
            }
            updateUserProfile(userProfile).then(()=>{
              console.log('profile name and picture updated');
            }).catch(error=> {
              console.log(error);
            })



         }).catch(error=> {
            console.log(error)})
    }
    const handleImageUpload = async(e)=> {
       const image = e.target.files[0];
       console.log(image);
       const formData =new FormData()
       formData.append('image', image)
       const imageUpoladUrl =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Upload_Img}`
       const res= await axios.post(imageUpoladUrl,formData)
       setProfilePic(res.data.data.url);

    
    
      }
    return (
        <div>
            <h2 className='text-4xl font-bold text-primary'> Create an account</h2>
        <form onSubmit={handleSubmit(onsubmit)}>    
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name' , {required: true})}
            className="input"
            placeholder="Your name"
          />
          <label className="label">Photo</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className='input'
            placeholder='your profile picture'
           
          />
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email' , {required: true})}
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            {...register('password' ,{required:true , minLength: 6})}
            className="input"
            placeholder="Password"
          />

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          {errors.password?.type === 'required' && <p className='text-red-600'> 
            password dicchen na keno?
            </p>}
          {errors.password?.type === 'minLength' && <p className='text-red-600'> 
            Password should be minimum six cheracter or more . use commonsence
            </p>}
            <p>Already have an account ?<Link to={'/login'}><button className='bg-primary'>Login</button> </Link></p>
          <button className="btn btn-primary text-black mt-4">Register</button>
        </fieldset>
        <SocialLogin></SocialLogin>
      </form>
        </div>
    );
};

export default Register;