import React from "react";
import Layout from "./Layout";
import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const EditProfilePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <VStack
        bg="#1d1825"
        borderRadius="lg"
        w={{ lg: "35vw", base: "70vw" }}
        marginY="auto"
        p="8"
        spacing="6"
        boxShadow="md">
        <HStack alignSelf="flex-start" spacing="1" padding="2">
          <IoIosArrowBack color="white" size="24px" onClick={() => {
            navigate("/tasks");
          }}/>
          <Text color="white" fontSize="xl" fontWeight="bold">
            Edit Profile
          </Text>
        </HStack>

        <RxAvatar color="#d9bdfe" size="100px" />

        <Box w="100%">
          <Text color="white" textAlign="left" marginBottom="2">
            Profile URL
          </Text>
          <Input
            placeholder="<Image URL>"
            color="#777777"
            borderColor="#9e78cf"
            _focus={{
              borderColor: "#9e78cf",
              boxShadow: "0 0 0 1px #9e78cf",
            }}
          />
        </Box>

        <Box w="100%">
          <Text color="white" textAlign="left" marginBottom="2">
            Name
          </Text>
          <Input
            placeholder="Enter your name"
            color="#777777"
            borderColor="#9e78cf"
            _focus={{
              borderColor: "#9e78cf",
              boxShadow: "0 0 0 1px #9e78cf",
            }}
          />
        </Box>

        <Box w="100%">
          <Text color="white" textAlign="left" marginBottom="2">
            Email
          </Text>
          <Input
            type="email"
            placeholder="Enter your email"
            color="#777777"
            borderColor="#9e78cf"
            _focus={{
              borderColor: "#9e78cf",
              boxShadow: "0 0 0 1px #9e78cf",
            }}
          />
        </Box>

        <Box w="100%">
          <Text color="white" textAlign="left" marginBottom="2">
            Password
          </Text>
          <Input
            type="password"
            placeholder="Enter your password"
            color="#777777"
            borderColor="#9e78cf"
            _focus={{
              borderColor: "#9e78cf",
              boxShadow: "0 0 0 1px #9e78cf",
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
          {" "}
          <FaCheck />
          Submit
        </Button>
      </VStack>
    </Layout>
  );
};

export default EditProfilePage;
