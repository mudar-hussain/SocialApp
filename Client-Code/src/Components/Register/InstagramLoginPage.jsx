import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  ChakraProvider,
} from "@chakra-ui/react";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const InstagramLoginPage = () => {
  const handleLogin = (values, actions) => {
    // Implement your login logic here
    console.log("Logging in with:", values);
    actions.setSubmitting(false);
  };

  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Text fontSize="2xl" mb={4}>
          Instagram Login
        </Text>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl mb={4}>
                <FormLabel>Username</FormLabel>
                <Field as={Input} name="username" />
                <ErrorMessage name="username" component={Text} color="red.500" />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <Field as={Input} type="password" name="password" />
                <ErrorMessage name="password" component={Text} color="red.500" />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                mt={4}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </ChakraProvider>
  );
};

export default InstagramLoginPage;
