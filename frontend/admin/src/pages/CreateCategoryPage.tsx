import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import CreateCategory from '../components/Categories/CreateCategory';

const CreateCategoryPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <CreateCategory />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default CreateCategoryPage;