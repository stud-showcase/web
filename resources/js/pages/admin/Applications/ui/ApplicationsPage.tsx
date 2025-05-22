import { AdminLayout } from "@/layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Heading } from "@/shared/ui/Heading";
import { ApplicationsTable } from "./ApplicationsTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Application } from "@/entities/Application";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { getCurrentTab } from "../util/getCurrentTab";
import { sendApplicationsFilters } from "../util/sendApplicationsFilters";
import { ApplicationsFilters } from "../model/ApplicationsFilters";
import { useState } from "react";
import { defaultApplicationsFilters } from "../consts/defaultApplicationsFilters";
import { ApplicationsFiltersContext } from "../context/ApplicationsFiltersContext";

type Props = {
  taskRequests: ServerPaginatedData<Application>;
  filters: ApplicationsFilters;
  availableFilters: { customers: string[] };
};

export default function ApplicationsPage(props: Props) {
  const { taskRequests, availableFilters, filters: appliedFilters } = props;

  const [filters, setFilters] = useState<ApplicationsFilters>({
    ...defaultApplicationsFilters,
    ...appliedFilters,
  });

  const handleTabChange = (value: string) => {
    setFilters(defaultApplicationsFilters);
    sendApplicationsFilters(defaultApplicationsFilters, value as "my" | "all");
  };

  return (
    <>
      <Head>
        <title>Заявки</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Заявки</Heading>
        <ApplicationsFiltersContext.Provider value={{ filters, setFilters }}>
          <Tabs defaultValue={getCurrentTab()} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="all">Все заявки</TabsTrigger>
              <TabsTrigger value="my">Мои заявки</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="mt-4">
                <ApplicationsTable
                  applications={taskRequests}
                  customers={availableFilters.customers}
                />
              </div>
            </TabsContent>
            <TabsContent value="my">
              <div className="mt-4">
                <ApplicationsTable
                  applications={taskRequests}
                  customers={availableFilters.customers}
                />
              </div>
            </TabsContent>
          </Tabs>
        </ApplicationsFiltersContext.Provider>
      </AdminLayout>
    </>
  );
}
