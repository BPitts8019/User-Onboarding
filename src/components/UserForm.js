import React, {useEffect} from "react";
import {withFormik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import axios from "axios";

function UserForm ({values, errors, touched}) {
   // useEffect(() => {
   //    if (errors && Object.keys(errors).length > 0) {
   //       console.log(errors);
   //    }
   // });

   function isError (field) {
      return (touched[field] && errors[field])? true : false;
   }

   return (
      <Form>
         <Field type="text" name="name" className={isError("name")? "error" : ""} placeholder="Name" />
         <ErrorMessage name="name" className="error" component="p" />
         <Field type="email" name="email" className={isError("email")? "error" : ""} placeholder="Email" />
         <ErrorMessage name="email" className="error" component="p" />
         <Field type="password" name="password" className={isError("password")? "error" : ""} placeholder="Password" />
         <ErrorMessage name="password" className="error" component="p" />
         <label>
            <Field type="checkbox" name="agreedTos" checked={values.agreedTos} />
            <span className={isError("agreedTos")? "error" : ""}>I agree with the Terms of Service</span>
         </label>
         <ErrorMessage name="agreedTos" className="error" component="p" />
         <button type="submit">Submit</button>
      </Form>
   );
}

export default withFormik({
   mapPropsToValues: values => {
      return {
         name: values.name || "",
         email: values.email || "",
         password: values.password || "",
         agreedTos: values.agreedTos || false
      };
   },
   validationSchema: yup.object().shape({
      name: yup
         .string("Your name must be a string value.")
         .required("Please enter your name."),
      email: yup
         .string()
         .email("The email address entered is invalid.")
         .required("Please enter an email address."),
      password: yup
         .string()
         .min(6, "You passoword must be at least 6 characters long.")
         .required("Please enter a password."),
      agreedTos: yup
         .boolean()
         .oneOf([true], "You must agree to the Terms of Service.")
   }),
   handleSubmit: (formData) => {
      axios.post("https://reqres.in/api/users", formData)
         .then(response => {
            console.log(response);
         })
         .catch(error => {
            console.error(error);
         });
   }
})(UserForm);