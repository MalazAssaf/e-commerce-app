// API
import Api from "../_utils/Api";

// UI COMPONENTS
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

// REACT & REDUX
import { useContext } from "react";

// OTHERS
import { ItemsInCartContext } from "../_contexts/ItemsInCartContext";

function CartItemsList() {
  // Use Context
  const cartCtx = useContext(ItemsInCartContext);
  if (!cartCtx) return null; // safety check
  const { itemsCartList, setItemsCartList } = cartCtx;

  let total: number = 0;
  const storedJwt = localStorage.getItem("jwt");
  const jwt = storedJwt ? JSON.parse(storedJwt) : null;

  itemsCartList.forEach((element) => {
    total += element.amount;
  });

  const handleDeleteAction = async (id: number) => {
    try {
      const deleteItem = await Api.deleteCartItem(id, jwt);
      // Update state only after successful API delete
      setItemsCartList((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item deleted");
    } catch (e) {
      console.error("Failed to delete item", e);
    }
  };

  return (
    <div className="mt-5 flex flex-col ">
      {itemsCartList.map((item) => (
        <div key={item.id} className="flex flex-col">
          <div className="flex flex-row justify-between gap-4 items-center mb-6 shadow-md">
            <div className="flex items-center gap-6">
              <div>
                <Image
                  alt="product-icon"
                  src={`http://localhost:1337${item?.products[0].image[0].formats.thumbnail.url}`}
                  width={100}
                  height={100}
                  className="hover:scale-115 cursor-pointer"
                ></Image>
              </div>
              <div className="flex flex-col capitalize">
                <h2>{item?.products[0].name}</h2>
                <h2>Quanitity: {item?.quantity}</h2>
                <h2>{item?.amount}$</h2>
              </div>
            </div>
            <div>
              <TrashIcon
                onClick={() => handleDeleteAction(item.id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h2>SubTotal</h2>
          <h2>${total.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default CartItemsList;
