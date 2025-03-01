import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import EditCategory from '../components/Categories/EditCategory';

const EditCategoryPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <EditCategory />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default EditCategoryPage;