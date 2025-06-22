import { Box, Button, ChakraProvider, FormControl, FormErrorMessage, Input, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { signupAction } from '../../Redux/Auth/Action';
import { URL_SOCIAL_APP_LOGO } from '../../Config/Constants';

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const Signup = () => {
    const initialValues = { email: "", username:"", name:"", password: "" };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth} = useSelector(store=>store);
    const toast = useToast();

    const handleSubmit=(values, actions)=>{
        console.log("Values: ", values);
        dispatch(signupAction(values))
        actions.setSubmitting(false);
    };

    useEffect(() => {
      if(auth.signup?.username){
        navigate("/login");
        toast({
          title: `Account created ${auth.signup?.username}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
      
    },[auth.signup])

    const handleNavigate = () =>navigate("/login");

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
          <img className="mb-5" src={URL_SOCIAL_APP_LOGO} alt="Social APP" />

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
                        placeholder="Mobile number or Email"
                      ></Input>
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                
                {/* Name */}
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="name"
                        placeholder="Full Name"
                      ></Input>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                
                {/* Username */}
                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="username"
                        placeholder="Username"
                      ></Input>
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Password */}
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
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
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        </ChakraProvider>
      </div>
      <div className="border w-full border-slate-300 mt-5">
        <p className="text-center py-2 text-sm">Have an account? <span className="ml-2 text-blue-700 cursor-pointer" onClick={handleNavigate}>Log In</span></p>
      </div>
    </div>
  )
}

export default Signup