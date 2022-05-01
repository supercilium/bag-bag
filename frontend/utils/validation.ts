import { Validate } from "react-hook-form";

export const validateFile: Record<string, Validate<FileList>> = {
    fileType: v => ["image/jpeg", "image/png"].includes(v?.[0]?.type) ? undefined : 'Не поддерживаемый формат файла',
    fileSizeLesserThen: v => v?.[0]?.size < 0 ? 'Слишком маленький файл.' : undefined,
    fileSizeBiggerThen: v => v?.[0]?.size > 10000000 ? 'Для загрузки используйте изображения от 5 до 10 МБ.' : undefined,
};