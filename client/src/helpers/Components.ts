import FeaturedCard from "../components/homePage/FeaturedCard";
import ProductCard from "../components/product/ProductCard";

interface IComponents {
    [key: string]: React.FunctionComponent<any>;
}

const components: IComponents = {
    FeaturedCard,
    ProductCard
};

export default components;
