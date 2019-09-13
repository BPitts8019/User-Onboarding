import React from "react";
import {withFormik, Form, Field} from "formik";
import axios from "axios";

function UserForm (props) {
   return (
      <Form>
         <Field type="text" name="name" placeholder="Name" />
         <Field type="email" name="email" placeholder="Email" />
         <Field type="password" name="password" placeholder="Password" />
         <label>
            <Field type="checkbox" name="agreedTos"/>
            <span>I agree with the Terms of Service</span>
         </label>
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