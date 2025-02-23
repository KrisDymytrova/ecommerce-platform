import React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import Login from '../components/Auth/Login';

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
                <Login />
            </ContentContainer>

        </BaseTemplate>
    );
};

export default HomePage;