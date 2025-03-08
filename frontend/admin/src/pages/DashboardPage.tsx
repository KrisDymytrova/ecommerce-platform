import * as React from 'react';
import BaseTemplate from '../templates/BaseTemplate';
import ContentContainer from '../templates/ContentContainer';
import TotalUsersCard from '../../../admin/src/components/Dashboard/TotalUsersCard';
import TotalOrdersCard from '../../../admin/src/components/Dashboard/TotalOrdersCard';
import TotalProductsCard from '../../../admin/src/components/Dashboard/TotalProductsCard';
import NewUsersChart from '../components/Dashboard/NewUsersChart';
import CategoryDonutChart from '../components/Dashboard/CategoryDonutChart';

const DashboardPage: React.FC = () => {
    return (
        <BaseTemplate>
            <ContentContainer>
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-3 gap-6 w-full">
                        <TotalUsersCard />
                        <TotalOrdersCard />
                        <TotalProductsCard />
                    </div>
                    <div className="flex flex-row gap-6 w-full">
                        <div className="w-3/4">
                            <NewUsersChart/>
                        </div>
                        <div className="w-1/4">
                            <CategoryDonutChart/>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </BaseTemplate>
    );
};

export default DashboardPage;