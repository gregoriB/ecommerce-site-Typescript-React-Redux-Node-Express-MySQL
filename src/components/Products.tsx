import React from "react";
import Product from "../containers/Product";
import styled from "styled-components";
import productList from "../data/products";

const Display = styled.div`
    width: 80%;
    margin: 1rem;
    display: grid;
    grid-gap: 2rem;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
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
