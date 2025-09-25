// API
import Api, { Slider } from "../_utils/Api";

// UI COMPONENTS
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// NEXT
import Image from "next/image";

export default async function Sliders() {
  // Server Side
  const sliders: Slider[] = await Api.getSliders();
  const sliderList: React.JSX.Element[] = sliders.map((slider, index) => {
    return (
      <CarouselItem key={index}>
        <Image
          src={`http://localhost:1337${slider?.image[0]?.url}`}
          alt="slider"
          width={400}
          height={600}
          unoptimized={true}
          className="w-full h-[250px] md:h-[500px] object-cover rounded-2xl"
        ></Image>
      </CarouselItem>
    );
  });

  return (
    <Carousel>
      <CarouselContent>{sliderList}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
