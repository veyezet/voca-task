import { HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import useTaskStore from '../../stores/Task';

const TaskDone = ({ title, id }) => {
  const removeTask = useTaskStore((state) => state.removeTask);

  const onHandleDeleteTask = () => {
    removeTask(id);
  };

  return (
    <HStack
      w={"100%"}
      bg={"#15101c"}
      borderRadius={"lg"}
      px={"8"}
      py={"4"}
    >
      <Text
        color={"#6ab69c"}
        fontWeight={"semibold"}
        textAlign={"left"}
        as="del"
      >
        {title}
      </Text>
      <IconButton
        color={"#6ab69c"}
        bg={"#15101c"}
        onClick={onHandleDeleteTask}
        icon={<FaTrash />}
        aria-label="Delete task"
        marginLeft={"auto"}
        _hover={{
          bg: "#6ab69c",
          color: "#15101c",
        }}
      />
    </HStack>
  );
};

export default TaskDone;
