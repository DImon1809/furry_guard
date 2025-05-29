import { WalkingStatusDto } from "@/models/Pet";

const statuses = {
  [WalkingStatusDto.WANT_HOME]: "Сидит дома",
  [WalkingStatusDto.WANT_TO_WALK]: "Хочет гулять",
};

export const matcherWalkStatus = (status: keyof typeof WalkingStatusDto) => statuses[status];
