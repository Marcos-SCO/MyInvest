'use client'

import { useEffect, useRef, useState } from "react";
import UserAssetCard from "../assets/assetCards/UserAssetCard";

import Slider from "react-slick";
import DisplaySvg from "../../app/helpers/svg/DisplaySvg";

export default function DisplaySectionElements({ ...props }) {
  const isWindowAvailable = (typeof window !== 'undefined');

  const isDesktop = isWindowAvailable
    && window.innerWidth >= 1023.9;

  const { elementsSectionData } = props;
  const userId = props?.userId ?? false;
  const userAssetIds = props?.userAssetIds ?? [];

  if (!elementsSectionData) return;

  let countItens = 1;

  const CustomPrevArrow = (props) => (
    <div onClick={props.onClick} className="custom-arrow custom-prev-arrow buttonTransition">
      <DisplaySvg name="arrowNext" width="25" height="25" />
    </div>
  );

  const CustomNextArrow = (props) => (
    <div onClick={props.onClick} className="custom-arrow custom-next-arrow buttonTransition">
      <DisplaySvg name="arrowNext" width="25" height="25" />
    </div>
  );

  const settings = {
    dots: true,
    autoplay: false,
    infinite: isDesktop ? false : true,
    speed: 500,
    slidesToShow: isDesktop ? 3 : 1,
    slidesToScroll: isDesktop ? 3 : 1,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const sliderRef = useRef(null);

  useEffect(() => {
    if (!isDesktop) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const parentContainer =
            sliderRef.current?.closest('.animationContainer');

          if (!parentContainer) return;

          const isIntersecting = entry?.isIntersecting;
          if (!isIntersecting) return;

          parentContainer.classList.remove('hide');
          parentContainer.classList.add('moveFromBottom');
        });
      },
      options
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, [sliderRef]);

  const assetIdAlreadyInArray = [];

  return (
    <>
      <div className="sliderItemContainer" ref={sliderRef}>
        <Slider {...settings}>
          {elementsSectionData.map((item, index) => {

            const assetIsInArray =
              assetIdAlreadyInArray.includes(item?.assetId);

            if (assetIsInArray) return;
            assetIdAlreadyInArray.push(item?.assetId);

            countItens += 1;
            const applyLazyOrEager =
              countItens <= 3 ? 'eager' : 'lazy';

            item = { ...item, userId, userAssetIds, applyLazyOrEager, removeItem: false };

            return (
              <div key={index} className="card-container">
                <UserAssetCard props={item} />
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}