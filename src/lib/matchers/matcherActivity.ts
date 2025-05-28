import { ActivityLevel } from "@/models/Pet";

const levels = {
  [ActivityLevel.HIGH]: "Более 2 часов в день",
  [ActivityLevel.MEDIUM]: "1-2 часа в день",
  [ActivityLevel.LOW]: "До 60 минут в день",
};

export const matcherActivity = (level: keyof typeof ActivityLevel | null) =>
  level ? levels[level] : "Активность не указана";
