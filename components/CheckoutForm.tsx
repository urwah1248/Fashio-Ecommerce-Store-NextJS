import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store';
import { CheckoutCartAction } from '@/store/actions/ProductActions';

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

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems }) => {
  const router = useRouter()

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const dispatch = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = {
      name,
      address,
      phoneNumber,
      paymentMethod,
      city,
      zipcode,
      cartItems
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order`, formData);
      alert('Your Order is Completed');
      dispatch(CheckoutCartAction())
      router.push('/')

    } catch (error) {
      console.log(error);
      
      alert('Your Order couldnt be completed');
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
          onChange={(e) => setAddress(e.target.value)}
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
          <option selected value="cash">Cash on Delivery</option>
        </select>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
