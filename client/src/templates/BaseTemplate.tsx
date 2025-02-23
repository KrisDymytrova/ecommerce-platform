import React, { ReactNode } from 'react';
import TopHeader from '../components/Header/TopHeader';
import BottomHeader from '../components/Header/BottomHeader';
import TopFooter from '../components/Footer/TopFooter';
import BottomFooter from '../components/Footer/BottomFooter';
import ScrollToTop from '../components/UI/ScrollToTop';

interface BaseTemplateProps {
    children: ReactNode;
    className?: string;
    showTopHeader?: boolean;
    showBottomHeader?: boolean;
    showTopFooter?: boolean;
    showBottomFooter?: boolean;

}

const BaseTemplate: React.FC<BaseTemplateProps> = ({
                                                       children,
                                                       className = '',
                                                       showTopHeader = true,
                                                       showBottomHeader = true,
                                                       showTopFooter = false,
                                                       showBottomFooter = false,
                                                   }) => {
    return (
        <div className={`${className} w-full h-screen flex flex-col`}>
            {showTopHeader && <TopHeader/>}
            {showBottomHeader && <BottomHeader/>}

            <div className="flex-grow">{children}</div>

            {showTopFooter && <TopFooter/>}
            {showBottomFooter && <BottomFooter/>}

            <ScrollToTop/>
        </div>

    );
};

export default BaseTemplate;
