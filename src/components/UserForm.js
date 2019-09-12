import React from "react";
import {withFormik, Form, Field} from "formik";

function UserForm (props) {
   return (
      <Form>
         <Field type="text" name="name" placeholder="Name" />
         <Field type="email" name="email" placeholder="Email" />
         <Field type="password" name="password" placeholder="Password" />
         <label>
            <Field type="checkbox" name="agree-tos"/>
            <span>I agree with the Terms of Service</span>
         </label>
         <button type="submit">Submit</button>
      </Form>
   );
}

export default withFormik({})(UserForm);