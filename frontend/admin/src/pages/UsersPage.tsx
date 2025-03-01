import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import UserTable from '../components/Users/UserTable';

const UsersPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
               <UserTable />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default UsersPage;