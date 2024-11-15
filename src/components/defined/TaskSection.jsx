import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import TaskToDo from "./TaskToDo";
import TaskDone from "./TaskDone";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../../stores/Task";

const TaskSection = () => {
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  const [inputTaskValue, setInputTaskValue] = useState("");

  const onHandleChangeInputTask = (event) => {
    setInputTaskValue(event.target.value);
  };

  const onHandleSubmitTask = () => {
    if (!inputTaskValue.trim()) return;

    const isDuplicate = tasks.some((task) => task.title === inputTaskValue.trim());
    if (isDuplicate) {
      alert("Tugas sudah ada.");
      return;
    }

    const newValue = {
      id: tasks.length + 1,
      title: inputTaskValue.trim(),
      isDone: false,
    };

    addTask(newValue);
    setInputTaskValue("");
    document.getElementById("task-section").scrollIntoView({ behavior: "smooth" });
  };

  const renderTodo = () => {
    const count = tasks.filter((task) => !task.isDone).length;
    if (count) {
      return tasks.map((task, index) => {
        if (!task.isDone) {
          return (
            <TaskToDo
              title={task.title}
              id={task.id}
              key={index}
              onDelete={() => removeTask(task.id)}
            />
          );
        }
        return null;
      });
    }
    return <Text color={"white"}>No pending tasks</Text>;
  };

  const renderDone = () => {
    return tasks.map((task, index) => {
      if (task.isDone) {
        return (
          <TaskDone
            title={task.title}
            id={task.id}
            key={index}
            onDelete={() => removeTask(task.id)}
          />
        );
      }
      return null;
    });
  };

  return (
    <VStack
      id="task-section"
      bg="#1d1825"
      minH="70vh"
      maxH="60vh"
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
          _focus={{ borderColor: "#8e6cbb" }}
          _placeholder={{ color: "#777777" }}
          onChange={onHandleChangeInputTask}
          value={inputTaskValue}
          onKeyDown={(e) => e.key === "Enter" && onHandleSubmitTask()}
        />
        <Button
          colorScheme="purple"
          bg="#9e78cf"
          _hover={{ bg: "#b190e1" }}
          _active={{ bg: "#8c6bc1" }}
          onClick={onHandleSubmitTask}
        >
          <FaPlus />
        </Button>
      </HStack>

      <Box w="100%" mt="4">
        <Text color="white" fontWeight="normal" textAlign="left">
          Task To Do - {tasks.filter((task) => !task.isDone).length}
        </Text>
      </Box>

      {renderTodo()}

      <Box w="100%" mt="4">
        <Text color="white" fontWeight="normal" textAlign="left">
          Done - {tasks.filter((task) => task.isDone).length}
        </Text>
      </Box>

      {renderDone()}
    </VStack>
  );
};

export default TaskSection;
