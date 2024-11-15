import {
  HStack,
  IconButton,
  Text,
  useToast,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import useTaskStore from "../../stores/Task";
import { taskApi } from "../../api/taskApi";

const TaskToDo = ({ title, id }) => {
  const doneTask = useTaskStore((state) => state.doneTask);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const onHandleDoneTask = async () => {
    setLoading(true);
    try {
      const data = await taskApi.doneTask(id);
      fetchTasks();
      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Failed to mark the task as done.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const onHandleDeleteTask = async () => {
    setLoading(true);
    try {
      const data = await taskApi.deleteTask(taskIdToDelete);
      fetchTasks();
      toast({
        title: data.message || "Task successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Failed to delete the task.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const openDeleteModal = (id) => {
    setTaskIdToDelete(id);
    onOpen();
  };

  return (
    <HStack
      w={"100%"}
      bg={"#15101c"}
      borderRadius={"lg"}
      border={"2px solid"}
      borderColor={"#15101c"}
      px={{ base: "4", md: "8" }}
      py={{ base: "2", md: "4" }}
      direction={{ base: "column", md: "row" }}
      spacing={{ base: "4", md: "8" }}
      alignItems={"center"}
      justifyContent={"space-between"}>
      <Text
        color={"#9e78cf"}
        fontWeight={"semibold"}
        textAlign={"left"}
        maxW="80%">
        {title}
      </Text>

      <HStack spacing={2} ml="auto" w="auto" flexWrap="wrap" justify="flex-end">
        <IconButton
          color={"#9e78cf"}
          bg={"#15101c"}
          onClick={onHandleDoneTask}
          icon={loading ? <Spinner size="sm" color="white" /> : <FaCheck />}
          aria-label="Mark as done"
          _hover={{ bg: "#9e78cf", color: "#15101c" }}
          _active={{ bg: "#6b4c8f", color: "#fff" }}
          isDisabled={loading}
        />
        <IconButton
          color={"#9e78cf"}
          bg={"#15101c"}
          onClick={() => openDeleteModal(id)}
          icon={loading ? <Spinner size="sm" color="white" /> : <FaTrash />}
          aria-label="Delete task"
          _hover={{ bg: "#9e78cf", color: "#15101c" }}
          _active={{ bg: "#6b4c8f", color: "#fff" }}
          isDisabled={loading}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this task?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onHandleDeleteTask}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default TaskToDo;
