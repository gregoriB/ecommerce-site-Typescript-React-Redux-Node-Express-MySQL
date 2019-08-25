import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { IData } from "../../types/types";
import useMapProductData from "../../hooks/useMapProductData";
import useDatabase from "../../hooks/useDatabase";
import queryDatabase from "../../helpers/queryDatabase";
import mapProductData from "../../helpers/mapProductData";
import populateProducts from "../../store/actions/populateProducts";

interface IProducts {
    products: {
        [key: string]: IData[];
    };
}

const Display = styled.div`
    width: 80vw;
    margin: 1rem;
    display: grid;
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;

const SearchResults = ({ query, products, populateProducts }: any) => {
    const [mappedResults, setMappedResults] = useState();

    // const products = useSelector((state: IProducts) => state.products.searchResults),
    //     query = useSelector((state: any) => state.searchRequest.query),
    //     dispatch = useDispatch();
    // dbQuery = { path: "search", query },
    // data = useDatabase(dbQuery),
    // actionProps: any = { type: "SEARCH RESULTS", payload: data },
    // mapped = useMapProductData({
    //     type: "ProductCard",
    //     products
    // });
    // const query = useSelector((state: any) => state.searchRequest.query);
    let mapped: any;
    useEffect(() => {
        (async () => {
            console.log(query);
            // const dbQuery = { path: "search", query };
            // const data = await queryDatabase(dbQuery);
            const options = {
                method: "POST",
                body: JSON.stringify({ query }),
                headers: { "Content-Type": "applications/json" }
            };
            const response = await fetch(`http://localhost:34567/search`, options);
            const results = await response.json();
            // const actionProps: any = await { type: "SEARCH RESULTS", payload: results };
            mapped = await mapProductData({ type: "ProductCard", products: results });
            // dispatch(actionProps);
            // await populateProducts(actionProps);
            await setMappedResults(mapped);
            // await console.log(mappedResults, mapped);
        })();
        console.log("test");
    }, [query]);

    useEffect(() => {
        console.log(mappedResults, mapped);
    }, [mappedResults]);

    return <Display>{mappedResults}</Display>;
};

const mapStateToProps = (state: any) => ({
    query: state.searchRequest.query,
    products: state.products.searchResults
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    populateProducts: (val: any) => dispatch(populateProducts(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResults);
