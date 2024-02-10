import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAuthUserDetails } from "@/lib/queries";
import { SubAccount } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: { agencyId: string };
};

const SubaccountsPage = async ({ params }: Props) => {
  const user = await getAuthUserDetails();
  return (
    <AlertDialog>
      <div className="flex flex-col">
        <Button className="">Create</Button>
        <Command className="rounded-lg bg-transparent pt-2">
          <CommandInput placeholder="Search Account..." />
          <CommandList>
            <CommandEmpty>No Results Found</CommandEmpty>
            <CommandGroup heading="Sub Accounts">
              {!!user.Agency?.SubAccount.length
                ? user.Agency.subAccount.map((subaccount: SubAccount) => (
                    <CommandItem
                      key={subaccount.id}
                      className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all"
                    >
                      <Link
                        href={`/subaccount/${subaccount.id}`}
                        className="flex gap-4 w-full h-full"
                      >
                        <div className="relative w-32">
                          <Image
                            src={subaccount.subAccountLogo}
                            alt="subaccount logo"
                            fill
                            className="rounded-md object-contain bg-muted/50 p-4"
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col">{subaccount.name}</div>
                        </div>
                      </Link>
                    </CommandItem>
                  ))
                : ""}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  );
};

export default SubaccountsPage;
