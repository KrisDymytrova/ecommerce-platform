import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import OrderTable from '../components/OrderTable';

const OrdersPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <OrderTable />
            </ContentContainer>
        </BaseTemplate>
    );
};

export default OrdersPage;