import React from "react";

import { CustomSelector } from "../CustomSelector";

import styles from "./style.module.scss";

type Props = {
  id: string;
  onChange?: (val: number) => void;
};

export const TimeSelector = ({ id, onChange }: Props) => {
  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");

  React.useEffect(() => {
    if ((hour || minute) && onChange) {
      const time = Number(hour) * 60 + Number(minute);
      onChange(time);
    }
  }, [hour, minute]);

  return (
    <div id={id} className={styles.time__selector}>
      <CustomSelector
        options={Array(25)
          .fill(0)
          .map((_, hour) => ({
            label: hour < 10 ? `0${hour}` : `${hour}`,
            value: hour < 10 ? `0${hour}` : `${hour}`,
          }))}
        onChange={val => setHour(val.value)}
        placeholder="Часы"
      />

      <CustomSelector
        options={Array(61)
          .fill(0)
          .map((_, minute) => ({
            label: minute < 10 ? `0${minute}` : `${minute}`,
            value: minute < 10 ? `0${minute}` : `${minute}`,
          }))}
        onChange={val => setMinute(val.value)}
        placeholder="Минуты"
      />
    </div>
  );
};
