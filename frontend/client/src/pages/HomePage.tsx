import * as React from 'react';
import BaseTemplate from "../templates/BaseTemplate";
import BannerCarousel from "../components/UI/BannerCarousel";
import ContentContainer from "../templates/ContentContainer";
import ProductList from "../components/Products/ProductList";

const banners = [
    {
        image: "../src/assets/Main_Banner_1.webp",
        title: "BUY CASUAL SHOES",
        subtitle: "LIMITED TIME OFFER !!",
        linkText: "VIEW MORE",
        link: "/category/women-shoes",
    },
    {
        image: "../src/assets/Main_Banner_2.webp",
        title: "BUY WOMEN SHOES",
        subtitle: "DISCOVER THE LATEST TRENDS",
        linkText: "SHOP NOW",
        link: "/category/new-arrivals",
    },
];

const HomePage: React.FC = () => {
    return (
        <BaseTemplate
            className="home-page"
            showTopHeader={true}
            showBottomHeader={true}
            showTopFooter={true}
            showBottomFooter={true}
        >
            <BannerCarousel banners={banners} />
            <ContentContainer>
                <ProductList />
                <div className="content"></div>
            </ContentContainer>
        </BaseTemplate>
    );
};

export default HomePage;
