import React from "react";
import styled from "styled-components";
import CategoryItem from './CategoryItem';
import { Form } from 'react-bootstrap';
import PriceRangeSelector from "./PriceRangeSelector";

const Panel = styled.div`
    padding: 1rem;
    width: 20vw;
    margin: 1rem;
    margin-right: 0;
    background: white;
    border: 1px solid rgba(0,0,0,0.125);
`;

const PanelHeader = styled.h4``;

const Section = styled.section`
`;

const SectionName = styled.div`

`;



const SearchPanel = () => {
    return (
        <Panel>
            <PanelHeader>Filter by:</PanelHeader>
            <Section>
                <SectionName>Category</SectionName>
                <Form>
                    <CategoryItem name='Arcade Stick' />
                    <CategoryItem name='Stick Parts' />
                    <CategoryItem name='Adapters' />
                    <CategoryItem name='Accessories' />
                </Form>
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
