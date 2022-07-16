import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Avatar,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="sm" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="400px" mx="1" borderRadius={"xl"}>
          <ModalHeader
            fontSize="2xl"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            bg="#38B2AC"
            color="#fff"
            borderRadius={"xl"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton color="#fff"/>
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-around"
            bg="#efffff"
          >
            <Avatar
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              name={user.name}
              border="2px solid #38B2AC"
              fontSize={"45px"}
            />
            <Text
              fontSize={{ base: "lg", md: "xl", lg:"2xl" }}
              fontFamily="Work sans"
              textOverflow="wrap"
            >
              <Text fontWeight="bold" fontSize="lg">Email:</Text> {user.email}
            </Text>
          </ModalBody>
          <ModalFooter bg="#efffff" borderRadius={"xl"}>
            <Button onClick={onClose} colorScheme="blue">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;