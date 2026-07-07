import { Card, CardContent, Chip } from "@mui/material";

import { useAppSelector } from "../../ReduxToolkit/store";

const Addresses = () => {
  const user = useAppSelector((state) => state.userData.userdata);

  const address = user?.address;

  if (!address) {
    return (
      <div className="flex justify-center items-center py-10">
        <h1 className="text-gray-500 text-lg">No Address Found</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Address</h1>

      <Card className="rounded-2xl shadow-lg border border-gray-200">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-medium text-2xl text-center">{address.name}</h1>

            <Chip label="Default Address" color="success" size="small" />
          </div>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Locality:</strong> {address.locality}
            </p>

            <p>
              <strong>Address:</strong> {address.address}
            </p>

            <p>
              <strong>City:</strong> {address.city}
            </p>

            <p>
              <strong>State:</strong> {address.state}
            </p>

            <p>
              <strong>Pincode:</strong> {address.pincode}
            </p>

            <p>
              <strong>Mobile:</strong> {address.mobile}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Addresses;
