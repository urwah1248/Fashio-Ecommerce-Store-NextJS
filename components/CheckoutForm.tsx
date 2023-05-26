import React, { useEffect, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutFormProps {
  cartItems: CartItem[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

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

    // try {
    //   const response = await axios.post('YOUR_API_ENDPOINT', formData);
    //   console.log('Form submitted successfully:', response.data);
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
    alert
    (`${formData.name}
    ${formData.address}
    ${formData.phoneNumber}
    ${formData.city}
    ${formData.zipcode}
    ${formData.paymentMethod}
    ${formData.cartItems}`);
    
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
        >
          <option value="">Select payment method</option>
          <option value="cash">Cash on Delivery</option>
          <option value="online">Online Payment</option>
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
