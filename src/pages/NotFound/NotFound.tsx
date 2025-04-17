import { useNavigate } from "react-router-dom";

import NotFoundImg from "@/assets/not_found.webp";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Button } from "@/components/ui";

import styles from "./style.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ContentWrapper>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__img}>
          <img src={NotFoundImg} alt="#" />
        </div>

        <Button className="w-36" onClick={goBack}>
          Вернуться назад
        </Button>
      </div>
    </ContentWrapper>
  );
};

export default NotFound;
