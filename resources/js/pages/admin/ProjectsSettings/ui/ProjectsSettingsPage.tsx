import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/Breadcrumb";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { EditTeamBuildingPeriod } from "./EditTeamBuildingPeriod";
import { Settings } from "../model/Settings";

export default function ProjectsSettingsPage({
  settings,
}: {
  settings: Settings;
}) {
  return (
    <>
      <Head>
        <title>Настройки проектов</title>
      </Head>
      <AdminLayout
        headerSlot={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/projects">Проекты</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Настройки</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <div className="max-w-4xl">
          <EditTeamBuildingPeriod settings={settings} />
        </div>
      </AdminLayout>
    </>
  );
}
