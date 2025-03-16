import { useState, useMemo } from "react";
import { Container } from "@/shared/ui/Container";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/Accordion";
import { UserLayout } from "@/layouts/UserLayout";
import { ProjectComplexity, ProjectStatus } from "./types";
import { ProjectCard } from "./ui/ProjectCartd";
import { mockProjects } from "./mocks";
import { Head } from "@inertiajs/react";
import { Search } from "lucide-react";

export default function Projects() {
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState<
    ProjectStatus[]
  >([]);
  const [tempSelectedComplexities, setTempSelectedComplexities] = useState<
    ProjectComplexity[]
  >([]);
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);
  const [tempIsHiringFilter, setTempIsHiringFilter] = useState<boolean | null>(
    null
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
  const [selectedComplexities, setSelectedComplexities] = useState<
    ProjectComplexity[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isHiringFilter, setIsHiringFilter] = useState<boolean | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10; // Изменено на 10 проектов на странице

  const resetFilters = () => {
    setTempSearchTerm("");
    setTempSelectedStatuses([]);
    setTempSelectedComplexities([]);
    setTempSelectedTags([]);
    setTempIsHiringFilter(null);
    setSearchTerm("");
    setSelectedStatuses([]);
    setSelectedComplexities([]);
    setSelectedTags([]);
    setIsHiringFilter(null);
    setCurrentPage(1);
  };

  const applyFilters = () => {
    setSearchTerm(tempSearchTerm);
    setSelectedStatuses(tempSelectedStatuses);
    setSelectedComplexities(tempSelectedComplexities);
    setSelectedTags(tempSelectedTags);
    setIsHiringFilter(tempIsHiringFilter);
    setCurrentPage(1);
  };

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(project.status);
      const matchesComplexity =
        selectedComplexities.length === 0 ||
        selectedComplexities.includes(project.complexity);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags.includes(tag));
      const matchesHiring =
        isHiringFilter === null || project.isHiring === isHiringFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesComplexity &&
        matchesTags &&
        matchesHiring
      );
    });
  }, [
    searchTerm,
    selectedStatuses,
    selectedComplexities,
    selectedTags,
    isHiringFilter,
  ]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const allTags = Array.from(new Set(mockProjects.flatMap((p) => p.tags)));

  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <UserLayout>
        <Container className="pt-8 pb-12">
          <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-4">
            <Heading level={1}>Проекты</Heading>
            <div className="flex gap-2 lg:basis-1/3 basis-full items-center">
              <Input
                placeholder="Поиск по названию..."
                value={tempSearchTerm}
                onChange={(e) => setTempSearchTerm(e.target.value)}
              />
              <Button size="icon" variant="outline">
                <Search strokeWidth={2} className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid mt-6 grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 border shadow-sm rounded-lg px-6 pb-4">
              <div className="sticky top-4 space-y-4">
                <Accordion
                  type="multiple"
                  defaultValue={["status", "complexity", "tags", "hiring"]}
                  className="w-full"
                >
                  <AccordionItem value="status">
                    <AccordionTrigger>Статус</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {["under_review", "in_progress", "completed"].map(
                          (status) => (
                            <div
                              key={status}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`status-${status}`}
                                checked={tempSelectedStatuses.includes(
                                  status as ProjectStatus
                                )}
                                onCheckedChange={(checked) => {
                                  setTempSelectedStatuses((prev) =>
                                    checked
                                      ? [...prev, status as ProjectStatus]
                                      : prev.filter((s) => s !== status)
                                  );
                                }}
                              />
                              <label htmlFor={`status-${status}`}>
                                <Text variant="small">
                                  {status === "under_review"
                                    ? "В рассмотрении"
                                    : status === "in_progress"
                                    ? "В разработке"
                                    : "Завершён"}
                                </Text>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="complexity">
                    <AccordionTrigger>Сложность</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {["easy", "medium", "hard"].map((complexity) => (
                          <div
                            key={complexity}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`complexity-${complexity}`}
                              checked={tempSelectedComplexities.includes(
                                complexity as ProjectComplexity
                              )}
                              onCheckedChange={(checked) => {
                                setTempSelectedComplexities((prev) =>
                                  checked
                                    ? [...prev, complexity as ProjectComplexity]
                                    : prev.filter((c) => c !== complexity)
                                );
                              }}
                            />
                            <label htmlFor={`complexity-${complexity}`}>
                              <Text variant="small">
                                {complexity === "easy"
                                  ? "Легкий"
                                  : complexity === "medium"
                                  ? "Средний"
                                  : "Сложный"}
                              </Text>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tags">
                    <AccordionTrigger>Теги</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {allTags.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`tag-${tag}`}
                              checked={tempSelectedTags.includes(tag)}
                              onCheckedChange={(checked) => {
                                setTempSelectedTags((prev) =>
                                  checked
                                    ? [...prev, tag]
                                    : prev.filter((t) => t !== tag)
                                );
                              }}
                            />
                            <label htmlFor={`tag-${tag}`}>
                              <Text variant="small">{tag}</Text>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="hiring">
                    <AccordionTrigger>Набор в команду</AccordionTrigger>
                    <AccordionContent>
                      <Select
                        value={
                          tempIsHiringFilter === null
                            ? "all"
                            : tempIsHiringFilter
                            ? "open"
                            : "closed"
                        }
                        onValueChange={(value) => {
                          if (value === "all") setTempIsHiringFilter(null);
                          else if (value === "open")
                            setTempIsHiringFilter(true);
                          else setTempIsHiringFilter(false);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все</SelectItem>
                          <SelectItem value="open">Набор открыт</SelectItem>
                          <SelectItem value="closed">Набор закрыт</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="w-full"
                  >
                    Сбросить
                  </Button>
                  <Button onClick={applyFilters} className="w-full">
                    Применить
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {filteredProjects.length === 0 ? (
                <Text className="text-center">Проекты не найдены</Text>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6">
                    {paginatedProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>

                  {/* Пагинация */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                      >
                        Назад
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        )
                      )}
                      <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      >
                        Вперед
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
