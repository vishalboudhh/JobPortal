import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Data Engineer",
  "Data Scientist",
  "DevOps Engineer",
];

const CategoryCarousel = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate(`/browse`)
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8 relative">
      <Carousel className="w-full">
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex-none flex justify-center items-center w-[80%] sm:w-[45%] md:w-1/3 px-2"
            >
              <Button onClick={()=>searchJobHandler(cat)} className="rounded-full border px-6 py-3 text-sm sm:text-base md:text-lg lg:text-lg whitespace-nowrap">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Adjusted arrows */}
        <CarouselPrevious className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition z-10" />
        <CarouselNext className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition z-10" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
