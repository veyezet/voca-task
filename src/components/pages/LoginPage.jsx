import React, { useState } from "react";
import Layout from "./Layout";
import { Box, Button, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const isValidEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(inputEmail);

  const onHandleLogin = async () => {
    if (!inputEmail || !inputPassword) {
      toast({
        title: 'Email and Password must be filled.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    if (!isValidEmail) {
      toast({
        title: 'Invalid email.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    setIsLoading(true);
    try {
      await userApi.login(inputEmail, inputPassword);
      navigate('/');
      setInputEmail('');
      setInputPassword('');

      toast({
        title: 'Login Successful.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Username or Password is incorrect.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onHandleLogin();
    }
  };

  return (
    <Layout>
      <VStack
        bg="#1d1825"
        h="auto"
        maxWidth="lg"
        w={{ lg: "35vw", base: "70vw" }}
        marginY="auto"
        p={{ base: "8", md: "16" }}
        overflow="hidden"
      >
        <Text textAlign="center" lineHeight="1.2">
          <Text fontSize="xl" color="#9e78cf" fontWeight="bold">
            VOCA
          </Text>
          <Text fontSize="xl" color="white" fontWeight="medium">
            Task
          </Text>
        </Text>

        <Box w="100%" marginTop="4">
          <Text color="white" textAlign="left" marginBottom="2">
            Email
          </Text>
          <Input
            value={inputEmail}
            type="email"
            placeholder="Enter your email"
            aria-label="Email Address"
            color="#777777"
            borderColor="#9e78cf"
            _focus={{
              borderColor: "#9e78cf",
            }}
            _placeholder={{
              color: "#777777",
            }}
            onChange={(event) => {
              setInputEmail(event.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
        </Box>

        <Box w="100%" marginTop="4">
          <Text color="white" textAlign="left" marginBottom="2">
            Password
          </Text>
          <Input
            value={inputPassword}
            type="password"
            placeholder="Enter your password"
            aria-label="Password"
            color="#777777"
            borderColor="#9e78cf"
            _focus={{
              borderColor: "#9e78cf",
            }}
            _placeholder={{
              color: "#777777",
            }}
            onChange={(event) => {
              setInputPassword(event.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
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
          onClick={onHandleLogin}
        >
          Sign In
        </Button>
      </VStack>
    </Layout>
  );
};

export default LoginPage;
