import * as React from 'react';
import ContentContainer from '../templates/ContentContainer';
import Login from '../components/Login';

const LoginAdminPage: React.FC = () => {
    return (
            <ContentContainer>
                <Login />
            </ContentContainer>
    );
};

export default LoginAdminPage;