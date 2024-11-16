import {
  HStack,
  IconButton,
  Text,
  useToast,
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
import { FaTrash } from "react-icons/fa";
import { taskApi } from "../../api/taskApi";
import useTaskStore from "../../stores/Task";

const TaskDone = ({ title, id }) => {
  const removeTask = useTaskStore((state) => state.removeTask);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const onHandleDeleteTask = async () => {
    try {
      const data = await taskApi.deleteTask(taskIdToDelete);
      fetchTasks();
      toast({
        title: "Task deleted successfully.",
        description: data.message || "The task has been deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to delete task.",
        description: error?.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
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
      px={{ base: "4", md: "8" }}
      py={{ base: "2", md: "4" }}
      spacing={{ base: "4", md: "8" }}>
      <Text
        color={"#6ab69c"}
        fontWeight={"semibold"}
        textAlign={"left"}
        as="del"
        noOfLines={1}
        isTruncated>
        {title}
      </Text>
      <IconButton
        color={"#6ab69c"}
        bg={"#15101c"}
        onClick={() => openDeleteModal(id)}
        icon={<FaTrash />}
        aria-label="Delete task"
        marginLeft={"auto"}
        size={{ base: "sm", md: "md" }}
        _hover={{
          bg: "#6ab69c",
          color: "#15101c",
        }}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", sm: "md" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this task?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onHandleDeleteTask} w="full">
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3} w="full">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default TaskDone;
