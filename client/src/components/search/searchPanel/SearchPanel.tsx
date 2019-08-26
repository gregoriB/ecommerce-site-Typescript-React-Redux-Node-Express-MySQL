import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { Form } from "react-bootstrap";
import PriceRangeSelector from "./PriceRangeSelector";
import { IActionChangeCategories } from "../../../store/actions/changeCategories";

const Panel = styled.div`
    padding: 1rem;
    width: 20vw;
    margin: 1rem;
    margin-right: 0;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.125);
`;

const PanelHeader = styled.h4``;

const Section = styled.section``;

const SectionName = styled.div``;

interface IProps {
    allCategories: string[];
    changeCategories(categories: any): IActionChangeCategories;
}

const SearchPanel: React.FC<IProps> = ({ allCategories, changeCategories }) => {
    const [mappedCategories, setMappedCategories] = useState();

    useEffect(() => {
        setMappedCategories(
            allCategories.map(category => (
                <CategoryItem key={category} name={category} changeCategories={changeCategories} />
            ))
        );
    }, [allCategories]);
    return (
        <Panel>
            <PanelHeader>Filter by:</PanelHeader>
            <Section>
                <SectionName>Category</SectionName>
                <Form>{mappedCategories}</Form>
            </Section>
            <Section>
                <SectionName>Price</SectionName>
                <Form>
                    <PriceRangeSelector />
                </Form>
            </Section>
        </Panel>
    );
};

export default SearchPanel;
