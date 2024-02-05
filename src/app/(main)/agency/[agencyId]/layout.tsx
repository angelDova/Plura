import { verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const Layout = async ({ children, params }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  if (!agencyId) {
    return redirect("/");
  }

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  )
    return <div>{children}</div>;
};

export default Layout;
