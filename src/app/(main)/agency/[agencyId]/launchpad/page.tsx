import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    agencyId: string;
  };
  searchParams: { code: string };
};

const LaunchpadPage = async ({ params }: Props) => {
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
  });

  if (!agencyDetails) return;

  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode;

  return (
    <>
      <h1 className="text-4xl p-4">Launchpad</h1>
      <Separator className="mb-6" />
      <div className="flex flex-col justify-center items-center">
        <div className="w-full h-full max-w-[800px]">
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Lets get started!</CardTitle>
              <CardDescription>
                Follow the steps bellow to get your account set up.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
                <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                  <Image
                    src={"/appstore.png"}
                    alt="app logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain"
                  />
                  <p className="">
                    Save the website as a shortcut on your mobile device
                  </p>
                </div>
                <Button>Start</Button>
              </div>
              <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
                <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                  <Image
                    src={"/stripelogo.png"}
                    alt="stripe logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain"
                  />
                  <p className="">
                    Connect your stripe account to accept payments and see your
                    dashboard.
                  </p>
                </div>
                <Button>Start</Button>
              </div>
              <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
                <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                  <Image
                    src={agencyDetails.agencyLogo}
                    alt="stripe logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain"
                  />
                  <p className="">Fill in all your business details</p>
                </div>
                {allDetailsExist ? (
                  <CheckCircleIcon
                    size={50}
                    className="text-primary p-2 flex-shrink-0"
                  />
                ) : (
                  <Link
                    className="bg-primary py-2 px-4 rounded-md text-white"
                    href={`/agency/${params.agencyId}/settings`}
                  >
                    start
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LaunchpadPage;
