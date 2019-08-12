import React, { useState, useEffect } from "react";
import Product from "../containers/StoreItem";
import styled from "styled-components";

const Display = styled.div`
    width: 80vw;
    margin: 1rem;
    display: grid;
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;

const Products = () => {
    const [products, setProducts] = useState<any>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:34567/search");
                const productList: any = await response.json();
                productList &&
                    setProducts(
                        productList.map((item: any, index: number) => {
                            return (
                                <Product
                                    key={index}
                                    index={index}
                                    image={item.imageURL}
                                    title={item.name}
                                    desc={item.shortDescription}
                                    descLong={item.longDescription}
                                    price={item.price}
                                />
                            );
                        })
                    );
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    return <Display>{products || "please refresh page"}</Display>;
};

export default Products;
