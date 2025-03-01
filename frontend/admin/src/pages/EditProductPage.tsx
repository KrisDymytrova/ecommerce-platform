import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import EditProduct from '../components/Products/EditProduct';

const EditProductPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <EditProduct />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default EditProductPage;