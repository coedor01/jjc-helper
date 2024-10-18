import { useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import * as React from "react";

interface QueryHook {
  searchParams: ReadonlyURLSearchParams,
  upsertQueryString: (name: string, value: string) => string;
  upsertMultiQueryString: (quries: Record<string, string>) => string;
  updateArrQueryString: (name: string, value: string) => string;
  arrQueryStringContains: (name: string, value: string) => boolean;
}

function useQueryHook(): QueryHook {
  const searchParams = useSearchParams();
  const upsertQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  );

  const upsertMultiQueryString = React.useCallback(
    (queries: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(queries).forEach(([key, value]) => {
        params.set(key, value);
      });
      return params.toString()
    },
    [searchParams]
  );

  const updateArrQueryString = React.useCallback(
    (name: string, value: string): string => {

      let prev: string[] | undefined = searchParams
        .get(name)
        ?.split(",");

      if (prev === undefined) {
        prev = [];
      }

      let current: string[];
      if (prev.includes(value)) {
        current = prev.filter((val) => val !== value);
      } else {
        current = [...prev, value];
      }
      const params = upsertQueryString(name, current.join(","));

      return params
    },
    [searchParams, upsertQueryString]
  );

  const arrQueryStringContains = React.useCallback(
    (name: string, value: string): boolean => {
      let prev: string[] | undefined = searchParams
        .get(name)
        ?.split(",");

      if (prev === undefined) {
        prev = [];
      }

      return prev.includes(value);
    },
    [searchParams]
  )

  return {
    searchParams,
    upsertQueryString,
    upsertMultiQueryString,
    updateArrQueryString,
    arrQueryStringContains,
  }
}

export default useQueryHook;