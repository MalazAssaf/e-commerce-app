// API
import Api from "./_utils/Api";
import { Product, Category } from "./_utils/Api";

// NEXT
import Image from "next/image";

// OTHERS
import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import ProductsList from "./_components/ProductsList";
import Sliders from "./_components/Sliders";

export const metadata = {
  title: "Malaz Grocery",
};

export default async function Home() {
  const products: Product[] = await Api.getProductList();
  const categoryList: Category[] = await Api.getCategoryList();
  return (
    <div className="p-10 px-16">
      <Sliders />
      <CategoryList categoryList={categoryList} selectedCategory="all" />
      <h2 className="text-amber-500 text-2xl font-bold mt-5">
        Popular Products
      </h2>
      <ProductsList products={products} />
      {/* Banner */}
      <Image
        src={`/Pdelivery2.png`}
        alt="banner"
        height={100}
        width={200}
        layout="responsive"
        className="mt-5"
      ></Image>
      <Footer />
    </div>
  );
}
