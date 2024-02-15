import { getAuthUserDetails } from "@/lib/queries";
import MenuOptions from "./menu-options";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return null;

  if (!user.Agency) return;

  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency.SubAccount.find(
          (subaccount: { id: string }) => subaccount.id === id
        );

  const isWhiteLabelAgency = user.Agency.whiteLabel;
  if (!details) return;

  let sidebarLogo = user.Agency.agencyLogo || "/assets/plura-logo.svg";

  if (!isWhiteLabelAgency) {
    if (type === "subaccount") {
      sidebarLogo =
        user?.Agency.SubAccount.find(
          (subaccount: { id: string }) => subaccount.id === id
        )?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOption =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || [];

  const subaccounts = user.Agency.SubAccount.filter(
    (subaccount: { id: string }) =>
      user.Permissions.find(
        (permission: { subAccountId: string; access: any }) =>
          permission.subAccountId === subaccount.id && permission.access
      )
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOption={sidebarOption}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOption={sidebarOption}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  );
};

export default Sidebar;
