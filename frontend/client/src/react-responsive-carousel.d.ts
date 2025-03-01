declare module "react-responsive-carousel" {
    import { ComponentType } from "react";

    export interface CarouselProps {
        showArrows?: boolean;
        autoPlay?: boolean;
        infiniteLoop?: boolean;
        showThumbs?: boolean;
        showStatus?: boolean;
        interval?: number;
        className?: string;
        [key: string]: any;
    }

    export const Carousel: ComponentType<CarouselProps>;
}
