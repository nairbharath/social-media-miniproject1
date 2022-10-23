import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";


const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  //firebase logic
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (signUpForm.password != signUpForm.confirmPassword) {
      //setError
      setError("Passwords do not match");
      return;
    }
    if (signUpForm.password.length <= 5) {
      setError("Enter password more than 5 characters");
      return;
    }

    //passwords match
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update form state
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  //creating user in firestore without functions
  const createUserDocument = async (user: User) => {
    await setDoc(doc(firestore, 'users',user.uid), JSON.parse(JSON.stringify(user)));
  }

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }

  }, [userCred]);

  return (
    <form onSubmit={onSubmit}>

      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1 px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1 px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1 px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1 px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1 px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1 px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      {/* 2 inputs- username and password */}
      
      <Text textAlign="center" color={"red"} fontSize="10pt">
        {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      

      <Button 
      width="100%" 
      height="36px" 
      mt={2} mb={2} 
      type="submit"
      isLoading={loading}>
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={2}>Already a member?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOG IN!!
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;