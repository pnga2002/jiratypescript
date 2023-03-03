import React from 'react'
import { useDispatch } from 'react-redux'
import { userRegisterApi } from '../../redux/reducers/userReducer'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { NavLink } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues:{
      email:'',
      password:'',
      name:'',
      phoneNumber:''
    },
    validationSchema:yup.object().shape({
      email:yup.string().required('email cannot be blanhk!').email('email is invalid!'),
      password:yup.string().required('password cannot be blank!'),
      name:yup.string().required('name cannot be blank!'),
      phoneNumber:yup.string().required('phoneNumber cannot be blank!')
    }),
    onSubmit:(values)=>{
      // console.log(values)
      const actionAsync:any = userRegisterApi(values);
      dispatch(actionAsync);
    }

  })
  
  return (
    <div className="row">
      <div className="col-6">
        <img className='w-100' src="./assets/img/login.jpg" alt="" />
      </div>
      <div className="col-6  d-flex justify-content-center align-items-center">
        <form className='container'  onSubmit={form.handleSubmit}>
          <h3 className="display-4">REGISTER</h3>
          <div className="form-group">
              <p>Email</p>
              <input type="text" className="form-control" name="email" onChange={form.handleChange} onBlur={form.handleBlur} />
              {form.errors.email && form.touched.email && <p>{form.errors.email}</p>}
          </div>
          <div className="form-group">
              <p>Password</p>
              <input  type="text" className="form-control" name="password" onChange={form.handleChange} onBlur={form.handleBlur} />
              {form.errors.password &&form.touched.password && <p>{form.errors.password}</p>}
          </div>
          <div className="form-group">
              <p>Name</p>
              <input type="text" className="form-control" name="name" onChange={form.handleChange} onBlur={form.handleBlur} />
              {form.errors.name && form.touched.name && <p>{form.errors.name}</p>}
          </div>
          <div className="form-group">
              <p>Phone Number</p>
              <input  type="text" className="form-control" name="phoneNumber" onChange={form.handleChange} onBlur={form.handleBlur} />
              {form.errors.phoneNumber &&form.touched.phoneNumber && <p>{form.errors.phoneNumber}</p>}
          </div>
          <div className="form-group">
              <button type='submit' className="btn btn-success mt-3">Sign up</button>
              <NavLink to='/login'  className='btn btn-secondary mt-3 ms-3'>Login</NavLink>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default Register