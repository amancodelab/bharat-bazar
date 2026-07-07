import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useAppSelector } from "../../../../ReduxToolkit/store";

const Deal = () => {
  const { deals, loading } = useAppSelector((state) => state.deal);

  if (loading) {
    return <h2 className="text-center text-xl font-semibold">Loading...</h2>;
  }
  return (
    <div className="px-5 lg:px-20 justify-between items-center">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {deals.map((deal) => (
          <SwiperSlide key={deal._id}>
            <div className="p-2 pb-4 h-46 ">
              <div className="w-35 h-40  px-2 flex justify-center flex-col items-center hover:scale-105 transition-all duration-100">
                <div className="w-35 h-20 mt-2 flex justify-between items-start">
                  <img
                    className="border-2 h-full w-full object-cover rounded-xl"
                    src={deal.image}
                  ></img>
                </div>
                <div className="flex justify-around items-center gap-4 h-10 mt-2">
                  <div className="flex justify-center items-center bg-green-500 text-black font-extrabold  border rounded-3xl text-[12px]">
                    <span className="m-1">{deal.discount}%</span>
                    <span>OFF</span>
                  </div>
                  <div>
                    <p className="text-red-600 font-bold text-[16px]">Deal</p>
                  </div>
                </div>
                <span className="text-sm capitalize text-center  my-1 px-1 md:px-2">
                  Category:{deal.level1}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Deal;
