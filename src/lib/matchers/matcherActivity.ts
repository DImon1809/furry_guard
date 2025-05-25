import { ActivityLevel } from "@/models/Pet";

const levels = {
  [ActivityLevel.HIGH]: "Высокий уровень активности",
  [ActivityLevel.MEDIUM]: "Средний уровень активности",
  [ActivityLevel.LOW]: "Низкий уровень активности",
};

export const matcherActivity = (level: keyof typeof ActivityLevel | null) =>
  level ? levels[level] : "Активность не указана";
