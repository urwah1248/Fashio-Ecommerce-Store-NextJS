import Product from "@/components/Product";
import { useEffect, useState } from "react";
import { useTitle } from "@/context/titleContext";

interface Props {
  title?: String;
  category?: String;
}

export default function ProductsPage({ title, category, ...props }: Props) {
  const { changeTitle } = useTitle();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    changeTitle(`${title} | Fashio.pk`);
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="w-full">
      <h1 className="page-header">{title}</h1>
      <div className="flex flex-wrap w-[96%] mx-auto justify-center sm:justify-start gap-[2%]">
        {products
          .filter((product: any) => product.category == category)
          .map((item: any) => {
            return <Product key={item.id} product={item} />;
          })}
      </div>
    </div>
  );
}
