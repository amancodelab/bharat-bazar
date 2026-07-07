const HomeCategoryCard = ({ homeCategory }: any) => {
  return (
    <div className="flex flex-col justify-between items-center hover:cursor-pointer">
      <div className="h-37.5 lg:h-63 w-37.5 lg:w-63 bg-blue-500 rounded-full">
        <img
          className="h-full w-full rounded-full hover:scale-95 transition-all duration-700 ease-in-out  object-cover object-top bg-blue-500 "
          src={homeCategory.image}
          alt={homeCategory.categoryId}
        />
      </div>
      <h2 className="text-sm font-medium">{homeCategory.categoryId}</h2>
    </div>
  );
};

export default HomeCategoryCard;
