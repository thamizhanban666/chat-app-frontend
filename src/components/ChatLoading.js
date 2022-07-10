import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = ({fetchChats}) => {
  fetchChats()
  return (
    <Stack>
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
    </Stack>
  );
};

export default ChatLoading;