import { useLanguageContext } from "Context/LanguageContext";

export function Text({ tid }) {
    const languageContext = useLanguageContext();
    return languageContext.dictionary[tid] || tid;
};