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
} from "@chakra-ui/react"

interface AppModalProps {
  text: any
  onDeleteProduct: any
}
export const AppModal: React.FC<AppModalProps> = ({
  text,
  onDeleteProduct,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>{text}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure to delete the product</p>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="red"
              onClick={() => {
                onClose()
                onDeleteProduct()
              }}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
