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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/firebase/Firebase"

interface InputModalProps {
  text: any
  id: any
}

interface ImagesInterface {
  original?: File | null
  thumbnail?: File | null
}

interface ImageUrlInterface {
  original?: string
  thumbnail?: string
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
  const [images, setImages] = useState<ImagesInterface[]>([])
  const [imageUrls, setImageUrls] = useState<ImageUrlInterface[]>([])

  
  const addNewSize = () => {
    setstock([...stock, { size: '', quantity: 0 }]);
  };

  const uploadImageToFirebase = async (images: ImagesInterface[]) => {
    await Promise.all(
      images.map(async (img: any) => {
        if (img.original) {
          const imageRef = ref(
            storage,
            `images/product images/${img.original.name}`
          )
          return uploadBytes(imageRef, img && img.original).then(
            async (snapshot) => {
              return getDownloadURL(snapshot.ref).then((url) => {
                imageUrls.push({
                  original: url,
                  thumbnail: url,
                })
                setImageUrls([...imageUrls])
              })
            }
          )
        }
      })
    )
    return imageUrls
  }
  const handleImages = (e: any) => {
    for (let i = 0; i < e.target.files.length; i++) {
      var imageFile = e.target.files[i]
      images.push({
        original: imageFile,
        thumbnail: imageFile,
      })
      setImages([...images])
    }
  }

  const editProduct = async () => {
    await uploadImageToFirebase(images)
    .catch((err) => {
      onClose()
      console.log(err)
    })

    const requestData: any = {
      title: title ?? undefined,
      description: description ?? undefined,
      category: category ?? undefined,
      price: price ?? undefined,
      stock: stock.some((size) => size.quantity > 0)
        ? stock.map(({ size, quantity }) => ({ size, quantity }))
        : undefined,
      images: imageUrls.length > 0 ? imageUrls : undefined,
    };

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}product/${id}`, requestData)
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
                      value={size.quantity>0?size.quantity:''}
                      onChange={(event) =>
                        handleInputChange(sizeIndex, 'quantity', event)
                      }
                      className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                  </FormLabel>
                  <FormLabel className="">
                    <span className="text-transparent">Del</span>
                    <button type="button" className="border-2 mb-2 py-2 w-10 text-center flex justify-center items-center bg-red-600 rounded-md text-gray-200 hover:bg-red-500 focus:ring-red-600 disabled:bg-red-300" disabled={stock.length<2} onClick={() => removeSize(sizeIndex)}>
                      <AiFillDelete className="text-xl"/>
                    </button>
                  </FormLabel>
                </div>
              ))}
              <button type="button" className="w-full px-4 py-2 text-lg font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-200"
                disabled={stock[stock.length-1].size==""||stock[stock.length-1].quantity<=0}
                onClick={addNewSize}>
                  Add another Size
              </button>

              <FormLabel
                htmlFor="images"
                className="block mb-2 text-lg font-medium text-gray-700"
              >
                Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                id="image"
                onChange={(e) => handleImages(e)}
                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              </FormLabel>
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
