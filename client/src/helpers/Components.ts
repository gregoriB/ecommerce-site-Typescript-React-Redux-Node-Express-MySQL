import FeaturedCard from "../components/homePage/FeaturedCard";
import ProductCard from "../components/product/ProductCard";
import { IProps } from "../components/product/ProductCard";
import { IProduct } from "../types/generalTypes";

interface IComponents {
    [key: string]: React.FunctionComponent<IProduct & IProps>;
}

const components: IComponents = {
    FeaturedCard,
    ProductCard
};

export default components;
