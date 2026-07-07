import { useAppSelector } from "../../../ReduxToolkit/store";

import AdminRegister from "./AdminRegister";
import AdminInformation from "./AdminInformation";

const Account = () => {
  const adminId = localStorage.getItem("adminId");
  console.log("AdminId is here", adminId);

  const { admin, loading } = useAppSelector((state) => state.adminAuth);
  console.log("admin", admin);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-2xl text-center">loading......</h1>
      </div>
    );
  }

  return <div>{admin ? <AdminInformation /> : <AdminRegister />}</div>;
};

export default Account;
