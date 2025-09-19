import React from "react";
import UsersHeader from "../../components/dashboard/user/UsersHeader";
import UsersDetail from "../../components/dashboard/user/UsersDetail";

const Users = () => {
  return (
    <div className="lg:ml-64 md:ml-20 p-4 sm:p-6 md:p-8">
      <UsersHeader />
      <UsersDetail />
    </div>
  );
};

export default Users;
