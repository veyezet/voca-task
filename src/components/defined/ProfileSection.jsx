import { VStack, Button, Text, Avatar } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaSignOutAlt } from "react-icons/fa";

const ProfileSection = () => {
  const navigate = useNavigate();

  return (
    <VStack
      minH="60vh"
      bg="#1d1825"
      w="60"
      borderRadius="lg"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      p={8}>
      <Avatar size="xl" name="User Name" src="https://bit.ly/dan-abramov" />
      <Text fontWeight={"normal"} color="white">
        Welcome Back,{" "}
        <Text as="span" fontWeight="bold" color="white">
          Name!
        </Text>
      </Text>
      <Button
        bg="#2c2c2c"
        color="white"
        w="70%"
        variant="solid"
        fontWeight="normal"
        _hover={{ bg: "#3b3b3b" }}
        _active={{ bg: "#1a1a1a" }}
        onClick={() => {
          navigate("/edit-profile");
        }}
        leftIcon={<FaPen boxSize="1em" />}>
        Edit Profile
      </Button>
      <Button
        bg="#ec221f"
        color="white"
        w="70%"
        fontWeight="normal"
        _hover={{ bg: "#d61e1c" }}
        _active={{ bg: "#b81a19" }}
        onClick={() => {
          navigate("/login");
        }}
        leftIcon={<FaSignOutAlt boxSize="1em" />}>
        Sign Out
      </Button>
    </VStack>
  );
};

export default ProfileSection;
