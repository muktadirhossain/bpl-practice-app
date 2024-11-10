"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useMemo, useState, memo } from "react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Keyboard,
  Mousewheel,
  Virtual,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SliderProps {
  children: React.ReactNode;
  itemClassName?: string;
  slidesPerView?: number;
  navigation?: boolean;
  pagination?: boolean;
  spaceBetween?: number;
  autoplay?: boolean;
  className?: string;
  loop?: boolean;
  SlideComponent?: any;
  params?: any;
  responsive?: any;
  onSlideChange?: any;
}

const SliderModules = memo(
  ({
    children,
    itemClassName,
    slidesPerView = 1,
    navigation = true,
    pagination = false,
    spaceBetween = 10,
    autoplay = false,
    className,
    loop = false,
    responsive,
    onSlideChange,
    SlideComponent,
    params,
  }: SliderProps) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch your data logic here
        const fetchedData: any = []; // Replace with your API call logic

        setData(fetchedData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      loadData();
    }, [params]);

    const renderSlides = () => {
      const childArray = React.Children.toArray(children);
      const slides = childArray.map((child, index) => (
        <SwiperSlide key={`child-slide-${index}`} className={itemClassName}>
          {child}
        </SwiperSlide>
      ));

      data.forEach((item, index) => {
        slides.push(
          <SwiperSlide key={`api-slide-${index}`} className={itemClassName}>
            <SlideComponent data={item} />
          </SwiperSlide>,
        );
      });

      if (isLoading) {
        slides.push(
          <SwiperSlide key="loading-slide" className={itemClassName}>
            <LoadingComponent slidesPerView={slidesPerView} />
          </SwiperSlide>,
        );
      }

      return slides;
    };

    return (
      <Swiper
        autoplay={autoplay}
        breakpoints={responsive || {}}
        className={className}
        loop={loop}
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          Keyboard,
          Mousewheel,
          Virtual,
        ]}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        style={
          {
            "--swiper-navigation-color": "#ff5722",
            "--swiper-pagination-color": "#ff5722",
          } as React.CSSProperties
        }
        onSlideChange={onSlideChange}
      >
        {renderSlides()}
      </Swiper>
    );
  },
);

SliderModules.displayName = "SliderModules";

const LoadingComponent = memo(
  ({ slidesPerView }: { slidesPerView: number }) => (
    <div className="flex gap-4">
      {Array.from(Array(slidesPerView).keys()).map((i) => (
        <Image
          key={i}
          unoptimized
          alt="Loading"
          height={200}
          placeholder="blur"
          src="/assets/slider-loading.jpg" // Replace with your placeholder logic
          width={200 / slidesPerView}
        />
      ))}
    </div>
  ),
);

LoadingComponent.displayName = "LoadingComponent";

const Slider = (props: SliderProps) => {
  const DynamicSliderModules = useMemo(
    () => dynamic(() => Promise.resolve(SliderModules), { ssr: false }),
    [],
  );

  return <DynamicSliderModules {...props} />;
};

export default Slider;
