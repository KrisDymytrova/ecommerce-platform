import React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';

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
                <div className="flex items-center justify-center h-96 text-center">
                    <div className="text-4xl font-bold text-gray-800">Сторінку не знайдено</div>
                </div>
            </ContentContainer>

        </BaseTemplate>
    );
};

export default HomePage;