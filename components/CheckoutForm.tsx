import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store';
import { CheckoutCartAction } from '@/store/actions/ProductActions';
import { useToast } from '@chakra-ui/react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutFormProps {
  cartItems: CartItem[];
}

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />;

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems }) => {
  const toast = useToast()
  const router = useRouter()

  const phoneNumberRegex = /^(\+92|0)[0-9]{10}$/;
  const zipcodeRegex = /^[0-9]{5}$/; // 5 digits only


  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!phoneNumberRegex.test(phoneNumber)) {
      // Phone number validation failed
      toast({
        title: 'Please enter a valid phone number.',
        position: "top",
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
      return;
    }

    if (!zipcodeRegex.test(zipcode)) {
      // Zip code validation failed
      toast({
        title: 'Please enter a valid Pakistani zipcode.',
        position: "top",
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
      return;
    }


    const formData = {
      name,
      address,
      email,
      phoneNumber,
      paymentMethod,
      city,
      zipcode,
      cartItems
    };

    try {
      setLoading(true)
      toast({
        title: 'Order in Process',
        position: "top",
        status: "info",
        duration: 5000,
        isClosable: true,
      })
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}order`, formData);
      setLoading(false)
      toast({
        title: 'Your Order is Completed',
        position: "top",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      dispatch(CheckoutCartAction())
      router.push('/')

    } catch (error) {
      setLoading(false)
      toast({
        title: 'Your Order could not be completed.',
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto px-2">
      <div className="mb-3">
        <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          maxLength={50}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-3 flex justify-between">
        <div className='w-6/12'>
          <label htmlFor="paymentMethod" className="block mb-2 text-lg font-medium text-gray-700">
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select your City</option>
            <option value="karachi">Karachi</option>
            <option value="lahore">Lahore</option>
            <option value="islamabad">Islamabad</option>
          </select>
        </div>
        <div className='w-2/5'>
          <label htmlFor="paymentMethod" className="block mb-2 text-lg font-medium text-gray-700">
            Zip Code
          </label>
          <input
            id="zipcode"
            type='text'
            maxLength={5}
            onChange={e => setZipcode(e.target.value)}
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="phoneNumber" className="block mb-2 text-lg font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="paymentMethod" className="block mb-2 text-lg font-medium text-gray-700">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled
        >
          <option value="cash">Cash on Delivery</option>
        </select>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-medium text-white bg-gray-700 rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-1000"
        >
          {!loading ? 'Submit': <Spin indicator={antIcon} />}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
