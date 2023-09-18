import { useMemo } from "react";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/stateProvider";
import { fetchAllFood } from "./firebaseFunc";
function getAllFoodData() {
  const [{ foodItems }, dispatch] = useStateValue();
  return async () => {
    const data = await fetchAllFood();
    dispatch({
      type: actionTypes.SET_FOOD,
      foodItems: data,
    });
  };
}
export function showMenuCart() {
  const [{ cartShow }, dispatch] = useStateValue();
  return () => {
    dispatch({
      type: actionTypes.SET_SHOW_CART,
      cartShow: !cartShow,
    });
  };
}
function generateDistinctColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * (360 / numColors)) % 360; // Generate hues evenly spaced around the color wheel
    const saturation = 70; // Adjust saturation as needed
    const lightness = 50; // Adjust lightness as needed
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    colors.push(color);
  }
  return colors;
}

export function groupByCategory() {
  const [{ foodItems }] = useStateValue();
  const dataItems = useMemo(() => foodItems, []);
  const groupedData = dataItems.reduce((result, item) => {
    const category = item.category;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(item);

    return result;
  }, {});
  const categoryNames = Object.keys(groupedData);
  const distinctColors = generateDistinctColors(categoryNames.length);

  // Transform groupedData into the desired format with distinct colors
  const transformedData = categoryNames.map((name, index) => ({
    name,
    value: groupedData[name].length,
    color: distinctColors[index],
  }));
  return transformedData;
}
export default getAllFoodData;
