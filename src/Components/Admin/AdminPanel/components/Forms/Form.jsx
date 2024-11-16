// components/Forms/AddClientForm.jsx
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ClientSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  contact: Yup.string().email("Invalid email").required("Required"),
});

const AddClientForm = () => {
  return (
    <Formik
      initialValues={{ name: "", contact: "" }}
      validationSchema={ClientSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <Field name="name" placeholder="Client Name" />
          <Field name="contact" placeholder="Contact Email" />
          <button type="submit">Add Client</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddClientForm;
