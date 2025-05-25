import { AdminLayout } from "@/layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Heading } from "@/shared/ui/Heading";
import { ApplicationsTable } from "./ApplicationsTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Application } from "@/entities/Application";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { getCurrentTab } from "../util/getCurrentTab";
import { ApplicationsFilters } from "../model/ApplicationsFilters";
import { ApplicationsFiltersContext } from "../context/ApplicationsFiltersContext";
import { useFilters } from "@/shared/hooks/useFilters";
import { tabToUrl } from "../consts/tabToUrl";

type Props = {
  taskRequests: ServerPaginatedData<Application>;
  filters: ApplicationsFilters;
  availableFilters: { customers: string[] };
};

const defaultApplicationsFilters: ApplicationsFilters = {
  customers: [],
  withProject: undefined,
  search: undefined,
};

export default function ApplicationsPage(props: Props) {
  const { taskRequests, availableFilters, filters: appliedFilters } = props;

  const {
    filters,
    setFilters,
    handleFiltersApply,
    handleFiltersReset,
    handleSearch,
  } = useFilters<ApplicationsFilters>(
    defaultApplicationsFilters,
    appliedFilters
  );

  const handleTabChange = (value: string) => {
    handleFiltersReset(tabToUrl[value as "my" | "all"]);
  };

  return (
    <>
      <Head>
        <title>Заявки</title>
      </Head>
      <AdminLayout>
        <ApplicationsFiltersContext.Provider value={{ filters, setFilters }}>
          <Tabs defaultValue={getCurrentTab()} onValueChange={handleTabChange}>
            <div className="flex gap-3 items-center justify-between">
            <Heading level={1}>Заявки</Heading>
            <TabsList>
              <TabsTrigger value="all">Все заявки</TabsTrigger>
              <TabsTrigger value="my">Мои заявки</TabsTrigger>
            </TabsList>
            </div>
            <TabsContent value="all">
              <div className="mt-4">
                <ApplicationsTable
                  applications={taskRequests}
                  customers={availableFilters.customers}
                  handleFiltersApply={handleFiltersApply}
                  handleFiltersReset={handleFiltersReset}
                  handleSearch={handleSearch}
                />
              </div>
            </TabsContent>
            <TabsContent value="my">
              <div className="mt-4">
                <ApplicationsTable
                  applications={taskRequests}
                  customers={availableFilters.customers}
                  handleFiltersApply={handleFiltersApply}
                  handleFiltersReset={handleFiltersReset}
                  handleSearch={handleSearch}
                />
              </div>
            </TabsContent>
          </Tabs>
        </ApplicationsFiltersContext.Provider>
      </AdminLayout>
    </>
  );
}
