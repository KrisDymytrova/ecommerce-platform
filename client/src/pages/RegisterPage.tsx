import React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import Register from '../components/Auth/Register';

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
               <Register />
            </ContentContainer>

        </BaseTemplate>
    );
};

export default HomePage;