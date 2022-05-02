import { Validate } from "react-hook-form";
import { VALIDATION_PHONE_DIGITS } from "../constants/errorMessages";

export const validateFile: Record<string, Validate<FileList>> = {
    fileType: v => ["image/jpeg", "image/png"].includes(v?.[0]?.type) ? undefined : 'Не поддерживаемый формат файла',
    fileSizeLesserThen: v => v?.[0]?.size < 0 ? 'Слишком маленький файл.' : undefined,
    fileSizeBiggerThen: v => v?.[0]?.size > 10000000 ? 'Для загрузки используйте изображения от 5 до 10 МБ.' : undefined,
};

export const validatePhone: Validate<string> = (value: string) => {
    const phoneWithoutMask = value.replace(/\D/g, '');
    if (phoneWithoutMask.startsWith('8') || phoneWithoutMask.startsWith('7')) {
        return phoneWithoutMask.length === 11 ? undefined : VALIDATION_PHONE_DIGITS;
    }
    return phoneWithoutMask.length === 10 ? undefined : VALIDATION_PHONE_DIGITS;
};
