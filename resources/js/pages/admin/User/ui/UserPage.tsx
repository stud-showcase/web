import { AdminLayout } from "@/layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
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
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { ConfirmationDialog } from "@/shared/ui/ConfirmationDialog";

export default function UserPage({ user }: { user: User }) {
  const deleteUser = () => {
    router.delete(`/admin/users/${user.id}`, {
      onSuccess: () => showSuccessToast("Пользователь успешно удален"),
      onError: () =>
        showErrorToast("Произошла ошибка в ходе удаления пользователя"),
    });
  };

  return (
    <>
      <Head>
        <title>Пользователь</title>
      </Head>
      <AdminLayout
        headerSlot={
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
        }
      >
        <div className="max-w-5xl space-y-4">
          <Tabs defaultValue="main">
            <TabsList>
              <TabsTrigger value="main">Главное</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>
            <div className="mt-3">
              <TabsContent value="main">

              </TabsContent>
              <TabsContent value="settings">
                <div className="space-y-4">
                  <SettingsCard
                    heading="Удаление пользователя"
                    text="В случае удаления пользователя вы больше не сможете вернуть его. Пожалуйста, будьте внимательными."
                    buttonsSlot={
                      <ConfirmationDialog
                        title="Удаление пользователя"
                        description="Вы уверены что хотите удалить пользователя? Это действие нельзя отменить."
                        onAction={deleteUser}
                      >
                        <Button variant="destructive" size="sm">
                          <Trash2 />
                          Удалить
                        </Button>
                      </ConfirmationDialog>
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
