import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

interface Banner {
    image: string;
    title: string;
    subtitle: string;
    linkText: string;
    link: string;
}

interface BannerCarouselProps {
    banners: Banner[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
    return (
        <div className="relative w-full h-screen">
            <Carousel
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                interval={5000}
                className="h-full"
            >
                {banners.map((banner, index) => (
                    <div key={index} className="relative h-screen">
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-start px-16 text-left bg-black/30 text-white">
                            <span className="text-sm uppercase tracking-widest">
                                {banner.subtitle}
                            </span>
                            <h2 className="text-6xl font-bold mt-2">
                                {banner.title}
                            </h2>
                            <Link
                                to={banner.link}
                                className="mt-6 inline-block bg-white text-black py-3 px-6 text-lg font-semibold hover:bg-gray-300 transition-all"
                            >
                                {banner.linkText}
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default BannerCarousel;
