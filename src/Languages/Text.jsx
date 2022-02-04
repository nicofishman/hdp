import { useLanguageContext } from "Context/LanguageContext";

export function Text({ tid }) {
    const languageContext = useLanguageContext();
    console.log(languageContext.dictionary[tid]);
    return languageContext.dictionary[tid] || tid;
};