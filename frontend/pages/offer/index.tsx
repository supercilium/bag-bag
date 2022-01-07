import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { FileInput } from "../../components/FileInput";
import { Input } from "../../components/Input";
import { Box } from "../../styles/layout";
import { ProcessRow } from "../process/Process.styles";
import { ImageInputsRow, OrderContainer } from "./Offer.styles";

const Offer = () => {
  //   const router = useRouter()
  //   if (router.isFallback) {
  //     return <div>Loading category...</div>
  //   }

  return (
    <div>
      <Head>
        <title>Offer (ex)bags</title>
      </Head>
      <OrderContainer>
        <h1 className="align-center">продажа</h1>
        <form>
          <Box>
            <ProcessRow>
              <Input label="Бренд" placeholder="Выберите бренд" name="brand" />
              <Input label="Состояние" placeholder="Выберите" />
            </ProcessRow>
            <ProcessRow>
              <Input label="Модель" placeholder="Введите модель сумки" />
              <Input label="Ваша цена" placeholder="Введите сумму" />
            </ProcessRow>
            <Input label="Комментарий" placeholder="Укажите ваши пожелания" />
          </Box>
        </form>
        <Box>
          <ProcessRow>
            <div className="primary-text">
              Пожалуйста следуйте{" "}
              <Link href="/">Инструкции для съемки изображений</Link>, чтобы
              успешно продать свою сумку. Для загрузки используйте изображения
              от 5 до 10 МБ.
            </div>
            <div className="primary-text">
              Если ваши фотографии не соответствуют вашей сумке, мы не сможем ее
              принять. В этом случае мы вернем сумку по указанному вами адресу.
            </div>
          </ProcessRow>
          <p className="subtitle">внутри</p>
          <ImageInputsRow>
            <FileInput labelText="серийный номер*" />
            <FileInput labelText="логотип*" />
            <FileInput labelText="внутри*" />
          </ImageInputsRow>
          <p className="subtitle">Снаружи</p>
          <ImageInputsRow>
            <FileInput labelText="спереди*" />
            <FileInput labelText="сзади*" />
            <FileInput labelText="внутри*" />
            <FileInput labelText="сбоку*" />
            <FileInput labelText="снизу*" />
            <FileInput labelText="замок*" />
            <FileInput labelText="логотип*" />
          </ImageInputsRow>
        </Box>
        <Box>
          <p>
            <span className="subtitle">повреждения</span>{" "}
            <span className="primary-text">(если имеются)</span>
          </p>
          <FileInput />
        </Box>
        <Button $size="s">продать</Button>
      </OrderContainer>
    </div>
  );
};

export default Offer;
