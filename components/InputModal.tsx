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
import { AiFillDelete } from 'react-icons/ai'

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
  const [stock, setstock] = useState([{ size: '', quantity: 0 }]);

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

  const handleInputChange = (sizeIndex:any, field:any, event:any) => {
    const { value } = event.target;
    const updatedstock:any = [...stock];
    updatedstock[sizeIndex][field] = value;
    setstock(updatedstock);
  };
  
  const removeSize = (sizeIndex:number) => {
    const updatedstock = [...stock];
    updatedstock.splice(sizeIndex, 1);
    setstock(updatedstock);
  };

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

            <FormControl mt={4}>
              <FormLabel>Stock</FormLabel>
              {stock.map((size, sizeIndex) => (
                <div key={sizeIndex} className="border-2 p-3 flex gap-2 items-center">
                  <FormLabel className="">
                    Size:
                    <Input
                      type="text"
                      value={size.size}
                      onChange={(event) =>
                        handleInputChange(sizeIndex, 'size', event)
                      }
                      className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      
                    />
                  </FormLabel>
                  <FormLabel className="">
                    Quantity:
                    <Input
                      type="number"
                      value={size.quantity}
                      onChange={(event) =>
                        handleInputChange(sizeIndex, 'quantity', event)
                      }
                      className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                  </FormLabel>
                  
                  <button type="button" className="mt-3 h-10 w-10 text-center flex justify-center items-center bg-red-600 rounded-md text-gray-200 hover:bg-red-500 focus:ring-red-600 disabled:bg-red-300" disabled={stock.length<2} onClick={() => removeSize(sizeIndex)}>
                    <AiFillDelete/>
                  </button>
                </div>
              ))}
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
