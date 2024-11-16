import { Box, Button, HStack, Input, Text, useToast, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TaskToDo from "./TaskToDo";
import TaskDone from "./TaskDone";
import { FaPlus } from "react-icons/fa";
import useTaskStore from "../../stores/Task";
import { taskApi } from "../../api/taskApi";

const TaskSection = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const toast = useToast();
  const [taskInput, setTaskInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const onHandleChangeInputTask = (event) => {
    setTaskInput(event.target.value);
  };

  const onHandleSubmitTask = async () => {
    if (taskInput.trim() === "") {
      toast({
        title: "Task title cannot be empty.",
        description: "Please provide a task title before submitting.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await taskApi.addTask(taskInput);
      setTaskInput(""); 
      fetchTasks();
      toast({
        title: "Task added successfully.",
        description: data.message || "Your task has been added.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Failed to add task.",
        description: error?.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      fetchTasks();
      toast({
        title: "Task deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Failed to delete task.",
        description: error?.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const pendingTasks = tasks.filter((task) => !task.isDone);
  const completedTasks = tasks.filter((task) => task.isDone);

  return (
    <VStack
      id="task-section"
      bg="#1d1825"
      minH={{ base: "60vh", md: "70vh" }} 
      maxH="80vh"
      overflowY="auto"
      borderRadius="lg"
      w={{ lg: "35vw", base: "70vw" }}
      px="16"
      py="8"
      spacing={6}
    >
      <HStack w="100%" spacing={4}>
        <Input
          placeholder="Add a new task"
          color="#777777"
          borderColor="#8e6cbb"
          borderWidth="1px"
          _focus={{ borderColor: "#8e6cbb" }}
          _placeholder={{ color: "#777777" }}
          onChange={onHandleChangeInputTask}
          value={taskInput}
          onKeyDown={(e) => e.key === "Enter" && onHandleSubmitTask()}
          maxLength={200}
        />
        <Button
          colorScheme="purple"
          bg="#9e78cf"
          _hover={{ bg: "#b190e1" }}
          _active={{ bg: "#8c6bc1" }}
          onClick={onHandleSubmitTask}
          isLoading={isLoading}
          loadingText="Adding..."
        >
          <FaPlus />
        </Button>
      </HStack>

      <Box w="100%" mt="4">
        <Text color="white" fontWeight="normal" textAlign="left">
          Task To Do - {pendingTasks.length}
        </Text>
      </Box>
      {pendingTasks.length > 0 ? (
        pendingTasks.map((task) => (
          <TaskToDo
            title={task.title}
            id={task._id}
            key={task._id}
            onDelete={() => removeTask(task._id)}
          />
        ))
      ) : (
        <Text color={"white"} fontWeight="bold">No pending tasks</Text>
      )}

      <Box w="100%" mt="4">
        <Text color="white" fontWeight="normal" textAlign="left">
          Done - {completedTasks.length}
        </Text>
      </Box>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <TaskDone
            title={task.title}
            id={task._id}
            key={task._id}
            onDelete={() => removeTask(task._id)}
          />
        ))
      ) : (
        <Text color={"white"} fontWeight="bold">No completed tasks</Text>
      )}
    </VStack>
  );
};

export default TaskSection;
