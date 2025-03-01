import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import CreateUser from '../components/Users/CreateUser';

const CreateUserPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <CreateUser />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default CreateUserPage;