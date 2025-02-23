import React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import Cart from '../components/ShoppingCart/Cart';

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
               <Cart />
            </ContentContainer>

        </BaseTemplate>
    );
};

export default HomePage;