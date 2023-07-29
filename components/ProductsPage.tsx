import Product from "@/components/Product";
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useTitle } from "@/context/titleContext";

interface Props {
  title?: String;
  category?: String;
}

const LoadingProduct = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'black' }} spin />;
  return (
    // <div className={'bg-white product-card transition-[250ms] border-transparent hover:border-black border-2 sm:w-[49%] md:w-[32%] lg:w-[300px] w-4/6 mt-4 rounded-md flex justify-center overflow-x-hidden p-2'}>
    //   <div className="h-52 items-center flex">
    //     <Spin indicator={antIcon} />
    //   </div>
    //   <h4 className='text-center mt-2 font-bold text-xl text-clip text-transparent'>0</h4>
    //   <p className='text-center font-inter text-transparent m-0'>0</p>
    // </div>
    <div className="flex w-full justify-center items-center h-52">
      <Spin indicator={antIcon} />
    </div>
  )
}

export default function ProductsPage({ title, category, ...props }: Props) {
  const { changeTitle } = useTitle();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    changeTitle(`${title} | Fashio.pk`);
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full md:max-w-5xl mx-auto">
      <h1 className="page-header">{title}</h1>
      <div className="flex flex-wrap w-[96%] mx-auto justify-center sm:justify-start gap-[2%]">
        <LoadingProduct/>
      </div>
    </div>
    ) // Show a loading indicator or a placeholder component
  }

  return (
    <div className="w-full md:max-w-5xl mx-auto">
      <h1 className="page-header">{title}</h1>
      <div className="flex flex-wrap w-[96%] mx-auto justify-center sm:justify-start gap-[2%]">
        {products
          .filter((product: any) => product.category == category)
          .map((item: any) => {
            return <Product className={"w-5/6"} key={item._id} product={item} />;
          })}
      </div>
    </div>
  );
}
