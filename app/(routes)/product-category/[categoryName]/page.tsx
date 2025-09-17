// API
import Api, { Category, Product } from "@/app/_utils/Api";

// OTHERS
import CategoryList from "@/app/_components/CategoryList";
import ProductsList from "@/app/_components/ProductsList";

export default async function ProductCategory({
  params,
}: {
  params: { categoryName: string };
}) {
  const productList: Product[] = await Api.getProductByCategory(
    params.categoryName
  );
  const category: Category[] = await Api.getCategoryList();
  return (
    <div className="p-10 px-16">
      <div className="text-black text-2xl capitalize bg-amber-400 text-center p-5">
        {decodeURIComponent(params.categoryName)}
      </div>
      <CategoryList
        categoryList={category}
        selectedCategory={decodeURIComponent(params.categoryName)}
      />
      <ProductsList products={productList} />
    </div>
  );
}
