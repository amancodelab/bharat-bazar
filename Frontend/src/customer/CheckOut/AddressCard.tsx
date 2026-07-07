import { Radio } from "@mui/material";

interface AddressCardProps {
  value: string;
  selectedValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  item: any;
}

const AddressCard = ({
  value,
  selectedValue,
  handleChange,
  item,
}: AddressCardProps) => {
  return (
    <div className="w-full border-2 border-gray-300 rounded-lg p-4">
      <div className="flex items-start">
        <Radio
          value={value}
          checked={selectedValue === value}
          onChange={handleChange}
          name="shipping-address"
        />

        <div className="space-y-2">
          <h2 className="font-semibold text-lg">{item.name}</h2>

          <p className="text-gray-600">
            {item.address}, {item.district}, {item.state}
          </p>

          <p className="text-gray-600">
            {item.country} - {item.pincode}
          </p>

          <p>
            <strong>Mobile:</strong> {item.mobile}
          </p>

          {item.email && (
            <p>
              <strong>Email:</strong> {item.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
