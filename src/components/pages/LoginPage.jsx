import React from "react";
import Layout from "./Layout";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

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
        <Text fontSize="xl" color="#9e78cf" fontWeight="bold">
          VOCA
        </Text>
        <Text fontSize="xl" color="white" fontWeight="medium">
          Task
        </Text>

        <Box w="100%" marginTop="4">
          <Text color="white" textAlign="left" marginBottom="2">
            Email
          </Text>
          <Input
            type="email"
            placeholder="Enter your email"
            color="white"
            borderColor="#9e78cf"
            _focus={{
              borderColor: "#9e78cf",
            }}
            _placeholder={{
              color: "#9e78cf",
            }}
          />
        </Box>

        <Box w="100%" marginTop="4">
          <Text color="white" textAlign="left" marginBottom="2">
            Password
          </Text>
          <Input
            type="password"
            placeholder="Enter your password"
            color="white"
            borderColor="#9e78cf"
            _focus={{
              borderColor: "#9e78cf",
            }}
            _placeholder={{
              color: "#9e78cf",
            }}
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
          onClick={() => {
            navigate("/tasks");
          }}>
          <FaCheck />
          Sign In
        </Button>
      </VStack>
    </Layout>
  );
};

export default LoginPage;
