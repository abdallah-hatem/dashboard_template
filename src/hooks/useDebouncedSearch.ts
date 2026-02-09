import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import debounce from "lodash.debounce";

export function useDebouncedSearch(
  paramKey: string = "search",
  debounceMs: number = 400,
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchValue = searchParams.get(paramKey) || "";
  const [searchValue, setSearchValue] = useState(urlSearchValue);
  const isUserInputRef = useRef(false);

  // Sync local state with URL (for back/forward navigation)
  useEffect(() => {
    // Only sync from URL if it's not a user input change
    if (!isUserInputRef.current && urlSearchValue !== searchValue) {
      setSearchValue(urlSearchValue);
    }
    // Reset the flag after URL sync
    isUserInputRef.current = false;
  }, [urlSearchValue]);

  // Debounced handler for search
  const debouncedPush = useMemo(
    () =>
      debounce((val: string) => {
        let value = val.trim();
        const currentParams = new URLSearchParams(window.location.search);
        if (value) {
          currentParams.set(paramKey, value);
          // currentParams.set("page", "1");
          currentParams.delete("page");
        } else {
          currentParams.delete(paramKey);
        }
        router.replace(`?${currentParams.toString()}`, { scroll: false });
      }, debounceMs),
    [router, paramKey, debounceMs],
  );

  useEffect(() => {
    return () => {
      debouncedPush.cancel();
    };
  }, [debouncedPush]);

  const handleSearchChange = useCallback(
    (value: string) => {
      isUserInputRef.current = true; // Mark as user input
      setSearchValue(value);
      debouncedPush(value);
    },
    [debouncedPush],
  );

  return { searchValue, handleSearchChange };
}
