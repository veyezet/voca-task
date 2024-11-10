import { HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FiTrash } from "react-icons/fi";

const TaskDone = ({ task, onDelete }) => {
  return (
    <HStack
      w="100%"
      bg="#15101c"
      borderRadius="lg"
      px="8"
      py="4"
      overflow="hidden"
      spacing="4"
      justifyContent="space-between"
    >
      <Text
        color="#78cfb0"
        fontWeight="semibold"
        textDecoration="line-through"
        isTruncated
        noOfLines={1}
      >
        {task}
      </Text>

      {/* Tombol Delete */}
      <IconButton
      color="#78cfb0"
       bg="transparent"
      onClick={onDelete}
      aria-label="Delete completed task"
    >
      <FiTrash />
    </IconButton>
    </HStack>
  );
};

export default TaskDone;
