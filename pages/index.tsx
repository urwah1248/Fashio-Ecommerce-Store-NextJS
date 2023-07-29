import Featured from "../components/Featured";
import { useEffect, useState } from "react";
import { useTitle } from "@/context/titleContext";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function Home({ products, ...props }: Props) {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle(`Home | Fashio.pk`);
  }, []);

  return (
    <>
      <div className="overflow-x-hidden pt-0">
        <Featured />
        <FeaturedProducts title="rings" category="rings" products={products} />
        <FeaturedProducts
          title="earrings"
          category="earrings"
          products={products}
        />
        <FeaturedProducts
          title="More Jewelry"
          category=""
          products={products}
        />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}products`);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};
