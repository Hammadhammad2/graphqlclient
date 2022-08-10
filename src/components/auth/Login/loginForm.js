import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Form, Field } from "formik";
import {
  _SMALL,
  _OUTLINE,
  _PASSWORD,
  _EMAIL,
  _SUBMIT,
  _SECONDARY,
  _PRIMARY,
  _CONTAINED,
} from "../../../utils/Constants";
import {
  EMAIL,
  PASSWORD,
  LOGIN,
  ENTER_EMAIL,
  ENTER_PASSWORD,
} from "./constants";
import { Grid, TextField, Button, Divider, Link } from "@mui/material";

const LoginForm = (props) => {
  const { touched, errors, loading, values, handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} autoComplete="off" id="login-submit">
      <Grid container direction={"column"} spacing={3}>
        <Grid item>
          <Field
            as={TextField}
            fullWidth
            id="textfield-login-email"
            size={_SMALL}
            variant={_OUTLINE}
            type={_EMAIL}
            label={EMAIL}
            name={_EMAIL}
            value={values.email}
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
            placeholder={ENTER_EMAIL}
          />
        </Grid>
        <Grid item>
          <Field
            as={TextField}
            fullWidth
            size={_SMALL}
            variant={_OUTLINE}
            label={PASSWORD}
              value={values.password}
            name={_PASSWORD}
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            placeholder={ENTER_PASSWORD}
          />
        </Grid>
        <Grid item>
          <Button
            disabled={loading}
            type={_SUBMIT}
            variant={_CONTAINED}
            color={_PRIMARY}
            fullWidth
          >
            {loading ? (
              <CircularProgress color={_SECONDARY} size={24} />
            ) : (
              LOGIN
            )}
          </Button>
          <Divider sx={{ margin: "15px" }} orientation="horizontal">
            OR
          </Divider>
          <Button
            component={Link}
            to="/Signup"
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default LoginForm;