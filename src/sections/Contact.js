import React, {useState} from "react";
import { useFormik } from 'formik';
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import SectionContainer from "../containers/SectionContainer";

import emailjs from '@emailjs/browser';
import * as yup from 'yup';

import { gitHub, linkedIn } from "../assets/data/data";

const mono = "ui-monospace, Menlo, Consolas, monospace";

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID; 
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID; 
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY; 

const Contact = () => {

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { ok: boolean, text: string } after a send attempt

  const sendEmail = (values, { resetForm }) => {
    setLoading(true);
    setStatus(null);
    emailjs.send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY)
      .then(() => {
        setLoading(false);
        resetForm();
        setStatus({ ok: true, text: "Message sent. I'll get back to you soon." });
      }, () => {
        setLoading(false);
        setStatus({ ok: false, text: "Your message didn't send. Try again, or reach me on LinkedIn." });
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

  const field = (name, label, props = {}) => (
    <Box>
      <Typography
        component="label"
        htmlFor={name}
        variant="caption"
        sx={{ display: "block", mb: 0.75, textTransform: "uppercase", letterSpacing: ".06em", opacity: 0.75, fontFamily: mono }}
      >
        {label}
      </Typography>
      <TextField
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        {...props}
      />
    </Box>
  );

  return (
    <SectionContainer id="contact" title={"Contact"} maxWidth="md">
      <Box sx={{ display: "grid", gap: { xs: 4, md: 6 }, gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" }, alignItems: "start" }}>
        <Box>
          <Typography variant="h4" component="h3" sx={{ mb: 1.5, textWrap: "balance" }}>
            Have a role or a project in mind?
          </Typography>
          <Typography sx={{ mb: 3, opacity: 0.75, maxWidth: "46ch" }}>
            Send a message and I'll get back to you. You can also find me on GitHub and LinkedIn.
          </Typography>
          <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1.5}>
            <Button variant="outlined" size="large" href={gitHub} target="_blank" rel="noopener">GitHub</Button>
            <Button variant="outlined" size="large" href={linkedIn} target="_blank" rel="noopener">LinkedIn</Button>
          </Stack>
        </Box>
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ display: "grid", gap: 2 }}>
          {field("name", "Name", { autoComplete: "name" })}
          {field("email", "Email", { type: "email", autoComplete: "email" })}
          {field("message", "Message", { multiline: true, rows: 4 })}
          <Box>
            <Button type="submit" variant="contained" size="large" disableElevation disabled={loading} sx={{ minWidth: 160 }}>
              {loading ? <CircularProgress color="inherit" size={22} /> : "Send message"}
            </Button>
          </Box>
          <Typography
            role="status"
            aria-live="polite"
            variant="body2"
            sx={{ minHeight: "1.5em", fontFamily: mono, color: status && !status.ok ? "error.main" : "primary.main" }}
          >
            {status?.text}
          </Typography>
        </Box>
      </Box>
    </SectionContainer>
  );
};

export default Contact;
