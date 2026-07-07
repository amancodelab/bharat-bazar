import { Avatar, Card, CardContent, Divider, Typography } from "@mui/material";

import { useAppSelector } from "../../../ReduxToolkit/store";

const AdminInformation = () => {
  const { admin, loading } = useAppSelector((state: any) => state.adminAuth);

  if (loading) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  console.log("our amdin", admin);

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent>
          <div className="flex flex-col items-center">
            <Avatar
              sx={{
                width: 90,
                height: 90,
                fontSize: 32,
              }}
            >
              {admin?.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Typography variant="h5" sx={{ mt: 2 }}>
              {admin?.name}
            </Typography>

            <Typography color="text.secondary">{admin?.email}</Typography>
          </div>

          <Divider sx={{ my: 3 }} />

          <Typography sx={{ mb: 2 }}>
            <strong>Role:</strong> {admin?.role}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            <strong>Status:</strong> {admin?.accountStatus}
          </Typography>

          <Typography>
            <strong>Joined:</strong>{" "}
            {new Date(admin?.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInformation;
