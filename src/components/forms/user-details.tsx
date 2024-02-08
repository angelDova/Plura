"use client";

import {
  AuthUserWithAgencySigebarOptionsSubAccounts,
  UserWithPermissionsAndSubAccounts,
} from "@/lib/types";
import { useModal } from "@/providers/modal-provider";
import { SubAccount, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  getAuthUserDetails,
  getUserPermissions,
  saveActivityLogsNotification,
  updateUser,
} from "@/lib/queries";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form } from "../ui/form";

type Props = {
  id: string | null;
  type: "agency" | "subaccount";
  userData?: Partial<User>;
  subAccounts?: SubAccount[];
};

const UserDetails = ({ id, type, userData, subAccounts }: Props) => {
  const [subAccountsPermissions, setSubAccountsPermissions] =
    useState<UserWithPermissionsAndSubAccounts | null>(null);

  const { data, setClose } = useModal();
  const [roleState, setRoleState] = useState("");
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [authUserData, setAuthUserData] =
    useState<AuthUserWithAgencySigebarOptionsSubAccounts | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (data.user) {
      const fetchDetails = async () => {
        const response = await getAuthUserDetails();
        if (response) setAuthUserData(response);
      };
      fetchDetails();
    }
  }, [data]);

  const userDataSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    avatarUrl: z.string(),
    role: z.enum([
      "AGENCY_OWNER",
      "AGENCY_ADMIN",
      "SUBACCOUNT_USER",
      "SUBACCOUNT_GUEST",
    ]),
  });

  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    mode: "onChange",
    defaultValues: {
      name: userData ? userData.name : data?.user?.name,
      email: userData ? userData.email : data?.user?.email,
      avatarUrl: userData ? userData.avatarUrl : data?.user?.avatarUrl,
      role: userData ? userData.role : data?.user?.role,
    },
  });

  useEffect(() => {
    if (!data.user) return;
    const getPermissions = async () => {
      if (!data.user) return;
      const permission = await getUserPermissions(data.user.id);
      setSubAccountsPermissions(permission);
    };
    getPermissions();
  }, [data, form]);

  useEffect(() => {
    if (data.user) {
      form.reset(data.user);
    }
    if (userData) {
      form.reset(userData);
    }
  }, [userData, data]);

  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    if (!id) return;
    if (userData || data?.user) {
      const updatedUser = await updateUser(values);
      authUserData?.Agency?.SubAccount.filter((subacc: any) =>
        authUserData.Permissions.find(
          (p: any) => p.subAccountId === subacc.id && p.access
        )
      ).forEach(async (subaccount: any) => {
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Updated ${userData?.name} information`,
          subaccountId: subaccount.id,
        });
      });

      if (updatedUser) {
        toast.success("Updated user information");
        setClose();
        router.refresh();
      } else {
        toast.error("Ooops! Could not update user information");
      }
    } else {
      console.log("Error could not submit");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>Add or update your informartion</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          ></form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
