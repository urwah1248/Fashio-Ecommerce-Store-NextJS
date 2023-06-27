import React, { useEffect, useState } from "react"
import axios from "axios"
import { AiFillDelete } from 'react-icons/ai'
import { useRouter } from "next/router"
import { useAppDispatch } from "@/store"
import { CheckoutCartAction } from "@/store/actions/ProductActions"
import { useToast } from "@chakra-ui/react"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/firebase/Firebase"

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
)

interface StockInterface {
  size?: string
  quantity?: number
}

interface ImagesInterface {
  original?: File | null
  thumbnail?: File | null
}

interface ImageUrlInterface {
  original?: string
  thumbnail?: string
}

const AddProductForm = () => {
  const toast = useToast()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState('')
  const [images, setImages] = useState<ImagesInterface[]>([])
  const [imageUrls, setImageUrls] = useState<ImageUrlInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [stock, setstock] = useState([{ size: '', quantity: 0 }]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      await uploadImageToFirebase(images)
      const formData = {
        title,
        description,
        category,
        price,
        rating,
        stock: stock.map(({ size, quantity }) => ({ size, quantity })),
        images: imageUrls,
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}product`,
        formData
      )
      
      setLoading(false)
      setImages([])
      setImageUrls([])
      toast({
        title: "Product uploaded successfully",
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      })

      setTitle("");
      setDescription("");
      setCategory("");
      setPrice(0);
      setRating("");
      setImages([]);
      setImageUrls([]);
      setLoading(false);
      setstock([{ size: "", quantity: 0 }]);

    } catch (error) {
      setLoading(false)
      setImages([])
      setImageUrls([])
      toast({
        title: "Product upload failed.",
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleInputChange = (sizeIndex:any, field:any, event:any) => {
    const { value } = event.target;
    const updatedstock:any = [...stock];
    updatedstock[sizeIndex][field] = value;
    setstock(updatedstock);
  };
  const addNewSize = () => {
    setstock([...stock, { size: '', quantity: 0 }]);
  };
  const removeSize = (sizeIndex:number) => {
    const updatedstock = [...stock];
    updatedstock.splice(sizeIndex, 1);
    setstock(updatedstock);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto px-2">
      <div className="mb-3">
        <label
          htmlFor="name"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          maxLength={30}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="address"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          maxLength={50}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="category"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="rings">Rings</option>
          <option value="earrings">Earrings</option>
          <option value="bracelets">Bracelets</option>
          <option value="bangles">Bangles</option>
          <option value="necklaces">Necklaces</option>
        </select>
      </div>

      <div className="mb-3">
        <label
          htmlFor="price"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price>0?price:''}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <label
          htmlFor="price"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Stock
        </label>
      {/* Sizes and Quantity Option */}
      {stock.map((size, sizeIndex) => (
        <div key={sizeIndex} className="border-2 p-3 flex gap-2 items-center">
          <label className="">
            Size:
            <input
              type="text"
              value={size.size}
              onChange={(event) =>
                handleInputChange(sizeIndex, 'size', event)
              }
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
          </label>
          <label className="">
            Quantity:
            <input
              type="number"
              value={size.quantity>0?size.quantity:''}
              onChange={(event) =>
                handleInputChange(sizeIndex, 'quantity', event)
              }
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
          </label>
          
          <label className="">
            <span className="text-transparent">Del</span>
            <button type="button" className="border-2 mb-2 p-2 w-10 text-center flex justify-center items-center bg-red-600 rounded-md text-gray-200 hover:bg-red-500 focus:ring-red-600 disabled:bg-red-300" disabled={stock.length<2} onClick={() => removeSize(sizeIndex)}>
              <AiFillDelete className="text-xl"/>
            </button>
          </label>
        </div>
      ))}
      <button type="button" className="w-full px-4 py-2 text-lg font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-200"
        disabled={stock[stock.length-1].size==""||stock[stock.length-1].quantity<=0}
        onClick={addNewSize}>
          Add another Size
      </button>

      <div className="mb-3">
        <label
          htmlFor="images"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Upload Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          id="image"
          onChange={(e) => handleImages(e)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {!loading ? "Submit" : <Spin indicator={antIcon} />}
        </button>
      </div>
    </form>
  )
}

export default AddProductForm
