import React, { useEffect, useState } from "react"; 
import Layout from "./Layout";
import { Box, Button, HStack, Input, Text, VStack, Avatar, IconButton, useToast, InputGroup, InputRightElement } from "@chakra-ui/react"; 
import { FaCheck, FaChevronLeft, FaEye, FaEyeSlash } from "react-icons/fa"; 
import useUserStore from "../../stores/user";
import { userApi } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const user = useUserStore(state => state.user);
  const fetchProfile = useUserStore(state => state.fetchProfile);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photo_url || "");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSignOut = () => {
    userApi.signOut();
    navigate("/login");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const updatedData = { name, email, photo_url: photoUrl, password };

    try {
      const updatedProfile = await userApi.updateProfile(updatedData);
      toast({
        title: "Profile updated successfully.",
        description: updatedProfile.message || "Your profile has been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/tasks"); 
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to update profile. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <VStack
        bg="#1d1825"
        borderRadius="lg"
        w={{ lg: "35vw", base: "70vw" }}
        marginY="auto"
        px="16"
        py="8"
        spacing="6"
        boxShadow="md"
      >
        <HStack w="100%" justify="start">
          <IconButton
            onClick={() => navigate("/")}
            icon={<FaChevronLeft />}
            aria-label="Go Back"
            color="white"
            bg="transparent"
            _hover={{
              bg: "rgba(255, 255, 255, 0.1)",
            }}
            size="lg"
          />
          <Text ml="2" fontSize="xl" fontWeight="bold" color="white">
            Edit Profile
          </Text>
        </HStack>

        <Avatar name="User Name" src={photoUrl} size="xl" mb="4" />

        <Box w="100%">
          <Text color="white" textAlign="left" mb="2">
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
            _placeholder={{
              color: "#777777",
            }}
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </Box>

        <Box w="100%">
          <Text color="white" textAlign="left" mb="2">
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
            _placeholder={{
              color: "#777777",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box w="100%">
          <Text color="white" textAlign="left" mb="2">
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
            _placeholder={{
              color: "#777777",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Box w="100%">
          <Text color="white" textAlign="left" mb="2">
            Password
          </Text>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}  
              placeholder="Enter your password"
              color="#777777"
              borderColor="#9e78cf"
              _focus={{
                borderColor: "#9e78cf",
                boxShadow: "0 0 0 1px #9e78cf",
              }}
              _placeholder={{
                color: "#777777",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="3rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}  
                color="#523c72"
                bg={"transparent"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} 
              </Button>
            </InputRightElement>
          </InputGroup>
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
          fontWeight="normal"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          <FaCheck style={{ marginRight: "8px" }} />
          Submit
        </Button>
      </VStack>
    </Layout>
  );
};

export default EditProfilePage;
