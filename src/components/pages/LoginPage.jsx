import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  Box,
  Button,
  Input,
  Text,
  useToast,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const isValidEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
    inputEmail
  );
  const isValidPassword = inputPassword.length >= 6;

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const onHandleLogin = async () => {
    if (!inputEmail || !inputPassword) {
      toast({
        title: "Email and Password must be filled.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!isValidEmail) {
      toast({
        title: "Invalid email format.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!isValidPassword) {
      toast({
        title: "Password must be at least 6 characters.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await userApi.login(inputEmail, inputPassword);
      localStorage.setItem("authToken", data.token);
      navigate("/");
      setInputEmail("");
      setInputPassword("");

      toast({
        title: "Login successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Username or Password is incorrect.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onHandleLogin();
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Layout>
      <VStack
        bg="#1d1825"
        h="auto"
        maxWidth="lg"
        w={{ lg: "35vw", base: "70vw" }}
        marginY="auto"
        p={{ base: "8", md: "16" }}
        overflow="hidden">
        <Text textAlign="center" lineHeight="1.2">
          <Text fontSize="xl" color="#9e78cf" fontWeight="bold">
            VOCA
          </Text>
          <Text fontSize="xl" color="white" fontWeight="medium">
            Task
          </Text>
        </Text>

        <Box w="100%" marginTop="4">
          <FormControl isInvalid={inputEmail && !isValidEmail}>
            <FormLabel htmlFor="email" color="white">
              Email
            </FormLabel>
            <Input
              id="email"
              value={inputEmail}
              type="email"
              placeholder="Enter your email"
              aria-label="Email Address"
              color="#777777"
              borderColor={inputEmail && !isValidEmail ? "red.500" : "#9e78cf"}
              _focus={{
                borderColor: "#9e78cf",
              }}
              _placeholder={{
                color: "#777777",
              }}
              onChange={(event) => setInputEmail(event.target.value)}
              onKeyDown={handleKeyPress}
              autoComplete="off"
            />
          </FormControl>
        </Box>

        <Box w="100%" marginTop="4">
          <FormControl isInvalid={inputPassword && !isValidPassword}>
            <FormLabel htmlFor="password" color="white">
              Password
            </FormLabel>
            <InputGroup>
              <Input
                id="password"
                value={inputPassword}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                aria-label="Password"
                color="#777777"
                borderColor={
                  inputPassword && !isValidPassword ? "red.500" : "#9e78cf"
                }
                _focus={{
                  borderColor: "#9e78cf",
                }}
                _placeholder={{
                  color: "#777777",
                }}
                onChange={(event) => setInputPassword(event.target.value)}
                onKeyDown={handleKeyPress}
                autoComplete="off"
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                  variant="link"
                  color="white">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        <Button
          marginTop="4"
          bg="#523c72"
          color="white"
          border="1px solid #d1b5f5"
          _hover={{
            bg: "#6b4c8f",
            borderColor: "#d1b5f5",
          }}
          _active={{
            bg: "#4a3562",
            borderColor: "#d1b5f5",
          }}
          w="100%"
          leftIcon={<FaCheck />}
          isLoading={isLoading}
          loadingText="Signing In"
          onClick={onHandleLogin}>
          Sign In
        </Button>
      </VStack>
    </Layout>
  );
};

export default LoginPage;
