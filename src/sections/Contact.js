import React, {useState} from "react";
import { useFormik } from 'formik';
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import SectionContainer from "../containers/SectionContainer";

import emailjs from '@emailjs/browser';
import * as yup from 'yup';

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID; 
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID; 
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY; 

const Contact = () => {

  const [loading, setLoading] = useState(false);

  const sendEmail = (values) => {
    setLoading(true);
    emailjs.send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setLoading(false);
      }, (error) => {
        console.log(error.text);
        setLoading(false);
      });
  };

  const validation = yup.object({
    name: yup
      .string('Enter your name')
      .required('Required'),
    email: yup
      .string('Must be valid email')
      .email('Must be valid email')
      .required('Required'),
    message: yup
      .string('Enter your message')
      .required('Required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: validation,
    onSubmit: sendEmail,
  });

  return (
    <SectionContainer id="contact" title={"Contact"} maxWidth="md">
      <Grid container orientation="column" spacing={4} alignItems="center" justifyContent="center" >
        <Grid item xs={12} sm={9} md={7}>
          <TextField
            id="name"
            name="name" 
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange} 
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={7}>
          <TextField
            id="email"
            name="email" 
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={7}>
          <TextField
            id="message"
            name="message" 
            label="Message"
            value={formik.values.message}
            onChange={formik.handleChange} 
            multiline
            rows={6}
            fullWidth
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={7}>
          <Button 
            fullWidth 
            type="submit"
            variant="contained" 
            color="primary"
            onClick={formik.handleSubmit} 
          >
            {loading ? <CircularProgress color="secondary" size={25} /> : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </SectionContainer>
  );
};

export default Contact;