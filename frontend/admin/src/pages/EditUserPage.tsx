import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import EditUser from '../components/Users/EditUser';

const EditUserPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <EditUser />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default EditUserPage;