import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import CategoryTable from '../components/Categories/CategoryTable';

const CategoriesPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <CategoryTable />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default CategoriesPage;