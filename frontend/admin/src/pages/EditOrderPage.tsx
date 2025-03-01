import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import EditOrder from '../components/Orders/EditOrder';

const EditOrderPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <EditOrder />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default EditOrderPage;