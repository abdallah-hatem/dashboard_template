import { useLocale } from "next-intl";

const useIsArabic = () => {
  const locale = useLocale();
  const rtlLocales = ["ar"];
  return rtlLocales.includes(locale);
};

export default useIsArabic;
