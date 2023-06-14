import React, { useEffect, useState } from "react"
import axios from "axios"
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
  const [rating, setRating] = useState("4.8")
  const [size, setSize] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [stock, setStock] = useState<StockInterface[]>()
  const [images, setImages] = useState<ImagesInterface[]>([])
  const [imageUrls, setImageUrls] = useState<ImageUrlInterface[]>([])
  const [loading, setLoading] = useState(false)

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

    setStock([
      {
        size,
        quantity,
      },
    ])

    try {
      setLoading(true)
      await uploadImageToFirebase(images)
      const formData = {
        title,
        description,
        category,
        price,
        rating,
        stock,
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
          maxLength={20}
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
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="size"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Size
        </label>
        <input
          type="text"
          id="size"
          value={size}
          onChange={(e) => {
            setSize(e.target.value)
            setStock([{ size, quantity }])
          }}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="quantity"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => {
            setQuantity(parseInt(e.target.value))
            setStock([{ size, quantity }])
          }}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

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
