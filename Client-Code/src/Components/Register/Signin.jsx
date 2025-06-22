import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signinAction } from "../../Redux/Auth/Action";
import { URL_SOCIAL_APP_LOGO } from "../../Config/Constants";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const Signin = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    console.log(values);
    dispatch(signinAction(values));
    actions.setSubmitting(false);
  };

  const { user } = useSelector((store) => store);
  console.log("In Signin user: ", user);

  if (user.reqUser) {
    console.log("username: ", user.reqUser?.username);
    navigate(`/${user.reqUser?.username}`);
  }

  // useEffect(() => {
  //     dispatch(getUserProfileAction());
  // });

  // useEffect(() => {
  //   console.log("In Signin user: ", user);
  //   console.log("In Signin user.reqUser: ", user.reqUser);
  //   if (user.reqUser) {
  //     console.log("username: ", user.reqUser?.username);
  //     navigate(`/${user.reqUser?.username}`);
  //   }
  // }, [jwtToken, user.reqUser]);

  const handleSignUpNavigate = () => navigate("/signup");

  return (
    <div>
      <div className="border">
        <ChakraProvider>
          <Box
            p={8}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <img className="mb-5" src={URL_SOCIAL_APP_LOGO} alt="Social App" />

            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(formikProps) => (
                <Form className="space-y-8">
                  {/* Email */}
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <Input
                          className="w-full"
                          {...field}
                          id="email"
                          placeholder="Phone number, username, or email"
                        ></Input>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Password */}
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <Input
                          className="w-full"
                          {...field}
                          id="password"
                          placeholder="Password"
                        ></Input>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <p className="text-center text-sm">
                    People who use our service may have uploaded your contact
                    information to Instagram. Learn More
                  </p>
                  <p className="text-center text-sm">
                    By signing up, you agree to our Terms , Privacy Policy and
                    Cookies Policy .
                  </p>
                  <Button
                    colorScheme="blue"
                    className="w-full"
                    mt={4}
                    type="submit"
                    isLoading={formikProps.isSubmitting}
                  >
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </ChakraProvider>
      </div>
      <div className="border w-full border-slate-300 mt-5">
        <p className="text-center py-2">
          Don't have an account?
          <span
            className="ml-2 text-blue-700 cursor-pointer"
            onClick={handleSignUpNavigate}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
