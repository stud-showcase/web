import { TaskTag } from "../model/TaskTag";

export function getOptionsTags(tags: TaskTag[]) {
  return tags.map((tag) => ({ label: tag.name, value: tag.id.toString() }));
}

export function getFlatTags(tags: TaskTag[]) {
  return tags.map((tag) => tag.id.toString());
}
