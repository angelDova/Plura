"use client";

import {
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from "@prisma/client";
import React from "react";

interface MenuOptionsProps {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOption: AgencySidebarOption[] | SubAccountSidebarOption;
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
}

const MenuOptions = ({
  defaultOpen,
  subAccounts,
  sidebarLogo,
  sidebarOption,
  details,
  user,
  id,
}: MenuOptionsProps) => {
  return <div>MenuOptions</div>;
};

export default MenuOptions;
