import { AdminLayout } from "@/layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { User } from "@/entities/User";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { SettingsCard } from "@/shared/ui/SettingsCard";
import { Button } from "@/shared/ui/Button";
import { Trash2 } from "lucide-react";

export default function UserPage({ user }: { user: User }) {
  return (
    <>
      <Head>
        <title>Пользователь</title>
      </Head>
      <AdminLayout>
        <div className="max-w-4xl space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/users">Пользователи</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Пользователь №{user.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Tabs defaultValue="main">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="main">Основная информация</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>
            <div className="mt-3">
              <TabsContent value="main"></TabsContent>
              <TabsContent value="settings">
                <div className="space-y-4">
                  <SettingsCard
                    heading="Удалить пользователя"
                    text="В случае удаления пользователя вы больше не сможете вернуть его. Пожалуйста, будьте внимательными."
                    buttonsSlot={
                      <Button variant="destructive" size="sm">
                        <Trash2 />
                        Удалить
                      </Button>
                    }
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}
