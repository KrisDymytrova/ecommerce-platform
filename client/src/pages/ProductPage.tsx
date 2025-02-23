import React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import ProductDetail from '../components/Products/ProductDetail';

const HomePage: React.FC = () => {
    return (
        <BaseTemplate
            className="home-page"
            showTopHeader={true}
            showBottomHeader={true}
            showTopFooter={true}
            showBottomFooter={true}
        >
            <ContentContainer>
                <ProductDetail />
            </ContentContainer>

        </BaseTemplate>
    );
};

export default HomePage;