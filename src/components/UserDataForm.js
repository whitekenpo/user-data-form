import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserDataForm.css';


const UserDataForm = () => {
  // 表單驗證規則
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    dateOfBirth: Yup.date()
      .max(new Date(Date.now() - 86400000), 'Date of Birth cannot be in the future')
      .required('Date of Birth is required'),
    email: Yup.string()
      .email('Invalid email format')
      .test('emailOrPhone', 'Either Email or Phone Number is required', function (value) {
        return value || this.parent.phoneNumber;
      }),
    phoneNumber: Yup.string()
      .matches(/^\+886\d{8}$/, 'Phone Number must start with +886 followed by 9 digits')
      .test('phoneOrEmail', 'Either Phone Number or Email is required', function (value) {
        return value || this.parent.email;
      }),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  

  // 表單初始值
  const initialValues = {
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="user-data-form">
      <h2>User Data</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label>First Name*</label>
              <Field name="firstName" className="form-control" />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Last Name*</label>
              <Field name="lastName" className="form-control" />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Gender*</label>
              <Field as="select" name="gender" className="form-control">
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Date of Birth*</label>
              <Field name="dateOfBirth" type="date" className="form-control" />
              <ErrorMessage name="dateOfBirth" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <Field name="phoneNumber" className="form-control" placeholder="+85212345678" />
              <ErrorMessage name="phoneNumber" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Password*</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Confirm Password*</label>
              <Field name="confirmPassword" type="password" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-button">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserDataForm;
