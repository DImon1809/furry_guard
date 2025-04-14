import { useNavigate } from "react-router-dom";

import { ContentWrapper } from "@/components/ContentWrapper";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui";

import { AnswersByQuestion } from "./components/AnswersByQuestion";
import { TransferPoints } from "./components/TransferPoints";

import styles from "./style.module.scss";

const AboutProject = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />
      <ContentWrapper>
        <section className={styles.section}>
          <h1 className={styles.main__header}>
            Furry guard – умный мониторинг здоровья вашего питомца
          </h1>

          <div className={styles.intro}>
            <p>
              С каждым годом всё больше людей считают домашних животных членами семьи. Но как
              вовремя заметить изменения в их здоровье? Многие болезни долго остаются незаметными, а
              регулярные визиты к ветеринару требуют времени и денег.
            </p>
          </div>

          <h3 className={styles.transfer__header}>
            Furry guard – это удобное приложение для контроля здоровья вашего любимца:
          </h3>

          <TransferPoints />

          <h3 className={styles.question__header}>Почему это актуально?</h3>
          <AnswersByQuestion />
          <Button className="w-32 !mt-5" onClick={goToRegister}>
            Попробовать
          </Button>
        </section>
      </ContentWrapper>
    </>
  );
};

export default AboutProject;
