import React, { useEffect } from "react";
import FeaturedCarousel from "../components/Carousel";
import styled from "styled-components";
import useDatabase from "../hooks/useDatabase";
import HomeJumbotron from "../components/HomeJumbotron";
import { IState } from "../store/reducers/populateProducts/populateProducts";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import populateProducts, {
    IActionPopulate
} from "../store/actions/populateProducts";

interface IProps {
    featured: any;
    populateProducts(data: any): IActionPopulate;
}

const HomeContainer = styled.div`
    width: 100%;
    max-width: 2000px;
    margin: 0 auto;
`;

const Home: React.FC<IProps> = ({ populateProducts, featured }) => {
    const data: any = useDatabase("search");
    useEffect(() => {
        populateProducts(data);
    });
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel products={featured} />
        </HomeContainer>
    );
};

const mapStateToProps = (state: IState) => ({
    featured: state.featured
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    populateProducts: (data: any) => dispatch(populateProducts(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
