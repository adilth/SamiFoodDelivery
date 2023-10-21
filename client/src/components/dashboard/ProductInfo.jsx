import { useMemo } from "react";
import { productData } from "../../utils/singletData";
import Single from "./Single";
import { useParams } from "react-router-dom";
import { useFoodValue } from "../../context/FoodProvider";
import { useDataValue } from "../../context/DataProvider";
function ProductInfo() {
  const [{ foodItems }] = useFoodValue();
  const [{ activity }] = useDataValue();
  const { productId } = useParams();

  let filter = foodItems.filter((item) => item.id == productId);
  const data = useMemo(
    () => productData(filter[0], activity),
    [filter, activity]
  );

  return (
    <div>
      <Single {...data} />
    </div>
  );
}

export default ProductInfo;
