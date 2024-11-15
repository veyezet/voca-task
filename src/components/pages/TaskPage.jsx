import React from "react";
import { Stack } from "@chakra-ui/react";
import Layout from "./Layout";
import ProfileSection from "../../components/defined/ProfileSection";
import TaskSection from "../defined/TaskSection";

const TaskPage = () => {
  return (
    <Layout>
      <Stack
        direction={{ base: "column", md: "row" }} 
        justify="center"
        align="flex-start"
        w="100%"
        spacing={{ base: 8, md: 4 }} 
        marginY="auto"
        paddingX={{ base: 4, md: 8 }}
      >
        <ProfileSection />
        <TaskSection />
      </Stack>
    </Layout>
  );
};

export default TaskPage;
