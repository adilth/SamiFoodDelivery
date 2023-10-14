import { useMemo } from "react";
import { productData } from "../../utils/singletData";
import { useStateValue } from "../../context/StateProvider";
import Single from "./Single";
import { useParams } from "react-router-dom";

function ProductInfo() {
  const [{ foodItems, activity }] = useStateValue();
  const { productId } = useParams();
  // console.log(foodItems);
  let filter = foodItems.filter((item) => item.id == productId);
  console.log("product", filter[0]);
  const data = useMemo(
    () => productData(filter[0], activity),
    [filter, activity]
  );
  console.log("data", data);
  return (
    <div>
      <Single {...data} />
    </div>
  );
}

export default ProductInfo;
