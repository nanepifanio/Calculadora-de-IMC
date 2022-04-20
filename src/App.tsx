import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import arrow from "./assets/leftarrow.png";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { useState } from "react";
import { calcImc, levels, Level } from "./helpers/imc";
import { Levels } from "./components/Levels";

const App = () => {
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [imcLevel, setImcLevel] = useState<Level | undefined>(undefined);

  const handleHeight = (h: number): void => setHeight(h);
  const handleWeight = (w: number): void => setWeight(w);

  const handleBtnClick = (): void => {
    height && weight
      ? setImcLevel(calcImc(weight, height))
      : alert("Preencha todos os campos!");
  };

  const handleArrowClick = (): void => {
    setImcLevel(undefined);
    setHeight(0);
    setWeight(0);
  };

  return (
    <div className={styles.main}>
      <header>
        <img src={poweredImage} alt="Powered" />
      </header>
      <main className={styles.container}>
        <section className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela
            OMS para calcular o peso ideal de cada pessoa.
          </p>

          <Input
            placeHolder="Digite a sua altura. Ex.: 1.5 ou 1(em metros)"
            value={height}
            change={handleHeight}
            disabled={imcLevel ? true : false}
          />
          <Input
            placeHolder="Digite o seu Peso. Ex.: 70.5 ou 70(em Kg)"
            value={weight}
            change={handleWeight}
            disabled={imcLevel ? true : false}
          />

          <Button imc={handleBtnClick} disabled={imcLevel ? true : false} />
        </section>
        <section className={styles.rightSide}>
          {imcLevel && (
            <>
              <div className={styles.backArrow} onClick={handleArrowClick}>
                <img src={arrow} alt="" />
              </div>
              <Levels data={imcLevel} />
            </>
          )}

          {!imcLevel &&
            levels.map((level, index) => {
              if (level.yourImc) {
                level.yourImc = undefined;
              }
              return <Levels key={index} data={level} />;
            })}
        </section>
      </main>
    </div>
  );
};
export default App;
