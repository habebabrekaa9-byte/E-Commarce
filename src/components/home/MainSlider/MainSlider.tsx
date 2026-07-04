import CommonSlider from "@/components/Shared/CommonSlider/CommonSlider";
import slid1 from "@/app/assets/images/home-slider-1.png";
import slid2 from "@/app/assets/images/home-slider-2.png";
import slid3 from "@/app/assets/images/home-slider-3.png";
import type path from "path";

export const images = [
    {
        name: "slid1",
        path: slid1.src,
    },
    {
        name: "slid2",
        path: slid2.src,
    },
    {
        name: "slid3",
        path: slid3.src,
    },
];

export default function MainSlider() {
    return (
        <CommonSlider  images={images} className="w-full h-100 object-cover mb-12" isMainSlider={true} />
    )
}
