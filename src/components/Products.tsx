import React from "react";
import Product from "../containers/Product";
import styled from "styled-components";
import productList from "../data/products";

const Display = styled.div`
    margin: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const Products = () => {
    const products = productList.map((item, index) => {
        return (
            <Product
                key={index}
                index={index}
                title={item.title}
                desc={item.desc}
                price={item.price}
            />
        );
    });

    return <Display>{products}</Display>;
};

export default Products;
