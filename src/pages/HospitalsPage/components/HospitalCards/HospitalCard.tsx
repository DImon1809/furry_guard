import React from "react";
import { CiStar } from "react-icons/ci";
import { MdStar } from "react-icons/md";

import { Heart } from "@/components/ui";
import { cn } from "@/lib/utils";

import styles from "./style.module.scss";

type Props = {
  nodeTime: number;
};

const stars: number[] = Array(5).fill(5, 0, 4).fill(0, 4, 5);

export const HospitalCard = ({ nodeTime }: Props) => {
  const [isAnimation, setIsAnimation] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isAnimation) {
      setTimeout(() => {
        setIsAnimation(true);
      }, nodeTime);
    }
  }, [isAnimation, nodeTime]);

  return (
    <div className={cn(styles.hospital__card, isAnimation && styles.move)}>
      <div className={styles.card__info}>
        <div className={styles.card__header}>
          <div className={styles.hospital__avatar}>
            <img src="https://fotocheb.ru/800x600/foto.cheb.ru-319723.jpg" alt="#" />
          </div>
          <div className={styles.status__stars}>
            <div className={styles.status}>
              <p>Открыто</p>
            </div>

            <div className={styles.stars}>
              {stars.map((l, index) => {
                if (l === 5) return <MdStar size={16} key={index} color="#ffd700" />;

                return <CiStar size={16} key={index} />;
              })}
            </div>
          </div>
        </div>
        <div className={styles.hospital__description}>
          <div>
            <h3>Центральная ветеринарная клиника</h3>
          </div>
          <div>ул. Стаханова 29д</div>
        </div>
      </div>
      <div className={styles.heart__wrapper}>
        <Heart />
      </div>
    </div>
  );
};
