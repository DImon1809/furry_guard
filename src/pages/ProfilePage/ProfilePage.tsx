import React from "react";

import { RegisterForm } from "@/components/Form/RegisterForm";

import { AvatarChange } from "../../components/ui/AvatarChange";

const ProfilePage = () => {
  return (
    <RegisterForm>
      <AvatarChange />
    </RegisterForm>
  );
};

export default ProfilePage;
