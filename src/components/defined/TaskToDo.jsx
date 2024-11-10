import { HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

const TaskToDo = ({ task, onDone, onDelete }) => {
  return (
    <HStack w="100%" bg="#15101c" borderRadius="lg" px="8" py="4" spacing="4">
      <Text color="#9e78cf" fontWeight="semibold" isTruncated>
        {task}
      </Text>
      
      <IconButton
        color="#9e78cf"
        bg="transparent"
        onClick={onDone}
        aria-label="Mark as done"
        marginLeft="auto" 
      >
        <FaCheck />
      </IconButton>
      
      <IconButton
        color="#9e78cf"
        bg="transparent"
        onClick={onDelete}
        aria-label="Delete task"
      >
        <FiTrash />
      </IconButton>
    </HStack>
  );
};

export default TaskToDo;
