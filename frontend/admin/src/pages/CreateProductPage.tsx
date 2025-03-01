import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import CreateProduct from '../components/Products/CreateProduct';

const CreateProductPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <CreateProduct />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default CreateProductPage;