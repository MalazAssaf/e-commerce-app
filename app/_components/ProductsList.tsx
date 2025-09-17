// API
import { Product } from "../_utils/Api";

// OTHERS
import { ProductItem } from "./ProductItem";

export default async function ProductsList({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="mt-10">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-6">
        {products.map(
          (product, index) =>
            index < 8 && (
              <div
                key={index}
                className="flex flex-col justify-center items-center rounded-2xl border-amber-200 shadow-lg"
              >
                <ProductItem product={product} />
              </div>
            )
        )}
      </div>
    </div>
  );
}
