import React, { useState } from "react";
import { VStack, Input, Button, HStack, Text, Box, Flex } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import TaskToDo from "../defined/TaskToDo";
import TaskDone from "../defined/TaskDone";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";


// Main Section 

const TaskPage = ({ initialTasks = [], initialDoneTasks = [] }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [doneTasks, setDoneTasks] = useState(initialDoneTasks);
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = () => {
    if (newTaskText.trim() === "") return;

    const newTask = { id: Date.now(), text: newTaskText };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  const markTaskAsDone = (taskId) => {
    const taskToMark = tasks.find((task) => task.id === taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
    setDoneTasks([...doneTasks, taskToMark]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const deleteDoneTask = (taskId) => {
    setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
  };

  return (
    <VStack
      bg="#1d1825"
      borderRadius="lg"
      w={{ lg: "50vw", md: "60vw", base: "70vw" }}
      p={{ base: "8", md: "12", lg: "16" }}
      spacing="4"
      h="auto"
    >
      <HStack w="100%">
        <Input
          placeholder="Add a new task"
          color="#777777"
          borderColor="#9e78cf"
          _focus={{
            borderColor: "#9e78cf",
          }}
          _placeholder={{
            color: "#777777",
          }}
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <Button
          bg="#9e78cf"
          color="white"
          _hover={{
            bg: "#8d6ac0",
          }}
          _active={{
            bg: "#7b5bb1",
          }}
          onClick={handleAddTask}
        >
          <FaPlus />
        </Button>
      </HStack>

      <Box w="100%" mt="4">
        <Text color="white" fontWeight="normal" textAlign="left">
          Tasks to do - {tasks.length}
        </Text>
      </Box>

      {tasks.map((task) => (
        <TaskToDo
          key={task.id}
          task={task.text}
          onDone={() => markTaskAsDone(task.id)}
          onDelete={() => deleteTask(task.id)}
        />
      ))}

      <Box w="100%" mt="4">
        <Text color="white" fontWeight="normal" textAlign="left">
          Done - {doneTasks.length}
        </Text>
      </Box>

      {doneTasks.map((task) => (
        <TaskDone key={task.id} task={task.text} onDelete={() => deleteDoneTask(task.id)} />
      ))}
    </VStack>
  );
};

//  Profile Section

const ProfileSection = () => {
  const navigate = useNavigate();

  return (
    <VStack
      bg="#1d1825"
      borderRadius="lg"
      w={{ lg: "20vw", md: "30vw", base: "70vw" }}
      p={{ base: "8", md: "12", lg: "16" }}
      spacing="6"
      h="auto"
    >
    <RxAvatar color="#d9bdfe" size="100px" />
      <Text color="white" textAlign="center">
        Welcome back,{" "}
        <Text as="span" fontWeight="semibold">
          Hafiz!
        </Text>
      </Text>

      <Button
        w="100%"
        bg="#2c2c2c"
        color="white"
        fontWeight="normal"
        _hover={{
          bg: "#3a3a3a",
        }}
        onClick={() => navigate("/edit-profile")}
      >
        <GoPencil />
        Edit Profile
      </Button>

      <Button
        w="100%"
        mt="3"
        bg="red.600"
        color="white"
        fontWeight="normal"
        _hover={{
          bg: "red.700",
        }}
        onClick={() => navigate("/login")}
      >
        <CiLogin />
        Sign out
      </Button>
    </VStack>
  );
};

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Flex
        minHeight="100vh"
        direction={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
        gap="8"
        p={{ base: "4", md: "8" }}
      >
        <ProfileSection />
        <TaskPage />
      </Flex>
    </Layout>
  );
};

export default MainLayout;