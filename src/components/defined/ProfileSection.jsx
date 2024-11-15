import { VStack, Button, Text, Avatar } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaSignOutAlt } from "react-icons/fa";
import useUserStore from "../../stores/user";

const ProfileSection = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const fetchProfile = useUserStore((state) => state.fetchProfile);

  const onHandleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <VStack
      minH="60vh"
      minW="60"
      bg="#1d1825"
      borderRadius="lg"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      p={8}>
      <Avatar size="xl" name="User Name" src={user?.photo_url} />

      <Text fontWeight="normal" color="white">
        Welcome Back,{" "}
        <Text as="span" fontWeight="bold" color="white">
          {user?.name}
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
        onClick={onHandleSignOut}
        leftIcon={<FaSignOutAlt boxSize="1em" />}>
        Sign Out
      </Button>
    </VStack>
  );
};

export default ProfileSection;
