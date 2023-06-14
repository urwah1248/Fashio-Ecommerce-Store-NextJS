import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import axios from "axios"
import { useRef, useState } from "react"
import { Select } from "@chakra-ui/react"

interface InputModalProps {
  text: any
  id: any
}
export const InputModal: React.FC<InputModalProps> = ({ text, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [category, setCategory] = useState<string>()
  const [price, setPrice] = useState<string>()
  const editProduct = async () => {
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}product/${id}`, {
        title,
        description,
        category,
        price,
      })
      .then((_) => onClose())
      .catch((err) => {
        onClose()
        console.log(err)
      })
  }
  return (
    <>
      <Button onClick={onOpen}>{text}</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your products</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select option"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="rings">Rings</option>
                <option value="earrings">Earrings</option>
                <option value="bracelets">Bracelets</option>
                <option value="bangles">Bangles</option>
                <option value="necklaces">Necklaces</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={editProduct}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
