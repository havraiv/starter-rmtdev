import { useEffect, useState } from 'react';
import { JobItem } from './types';
import { BASE_API_URL } from './constants';
import { useQuery } from '@tanstack/react-query';

export const useJobItem = (id: number | null) => {
  const { data, isLoading } = useQuery(
    ['job-item', id],
    async () => {
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      return data;
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: () => {},
    },
  );
  const jobItem = data?.jobItem;
  return { jobItem, isLoading } as const;
};

export const useJobItems = (searchText?: string) => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsCount = jobItems.length;

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);
  return { jobItemsSliced, isLoading, jobItemsCount } as const;
};

export const useDebounce = <T>(value: T, time = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => clearTimeout(timerId);
  }, [value, time]);

  return debouncedValue;
};

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return activeId;
};
