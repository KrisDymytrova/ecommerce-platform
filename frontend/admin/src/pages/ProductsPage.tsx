import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import ProductTable from '../components/Products/ProductTable';

const ProductsPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <ProductTable />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default ProductsPage;