interface AddressLableCardProps {
  label: string;
  value: string | number;
}

const AddressLableCard = ({ label, value }: AddressLableCardProps) => {
  return (
    <div className="flex justify-start items-start px-4 py-2 text-sm md:text-lg border-2 border-gray-300 rounded-xl">
      <h1 className=" font-semibold whitespace-nowrap flex items-start justify-start">{`${label} :`}</h1>
      <h1 className="px-2 md:px-4 leading-6 md:leading-8 lg:leading-10">
        {value}
      </h1>
    </div>
  );
};

export default AddressLableCard;
