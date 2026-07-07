interface ProfileLabelCardProps {
  label: string;
  value: string | number;
}

const ProfileLabelCard = ({ label, value }: ProfileLabelCardProps) => {
  return (
    <div className="flex justify-start items-center px-4 py-2 text-sm md:text-lg border-2 border-gray-300 rounded-xl">
      <h1 className=" font-semibold ">{label} :</h1>
      <h1 className="px-2 md:px-4">{value}</h1>
    </div>
  );
};

export default ProfileLabelCard;
