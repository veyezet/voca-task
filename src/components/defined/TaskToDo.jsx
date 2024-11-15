import { HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import useTaskStore from "../../stores/Task";

const TaskToDo = ({ title, id }) => {
  const doneTask = useTaskStore((state) => state.doneTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  const onHandleDoneTask = () => {
    doneTask(id);
  };

  const onHandleDeleteTask = () => {
    removeTask(id);
  };

  return (
    <HStack
      w={"100%"}
      bg={"#15101c"}
      borderRadius={"lg"}
      border={"2px solid"}
      borderColor={"#15101c"}
      px={"8"}
      py={"4"}
    >
      <Text color={"#9e78cf"} fontWeight={"semibold"} textAlign={"left"}>
        {title}
      </Text>

      <IconButton
        color={"#9e78cf"}
        bg={"#15101c"}
        marginLeft={"auto"}
        onClick={onHandleDoneTask}
        icon={<FaCheck />}
        aria-label="Mark as done"
        _hover={{ bg: "#9e78cf", color: "#15101c" }}
        _active={{ bg: "#6b4c8f", color: "#fff" }}
      />

      <IconButton
        color={"#9e78cf"}
        bg={"#15101c"}
        onClick={onHandleDeleteTask}
        icon={<FaTrash />}
        aria-label="Delete task"
        _hover={{ bg: "#9e78cf", color: "#15101c" }}
        _active={{ bg: "#6b4c8f", color: "#fff" }}
      />
    </HStack>
  );
};

export default TaskToDo;
