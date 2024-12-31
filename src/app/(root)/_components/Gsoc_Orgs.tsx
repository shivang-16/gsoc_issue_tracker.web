'use client';
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import apiClient from '@/apiClient/apiClient';
import { Organisation } from "@/lib/type";

export default function Gsoc_Orgs() {
  const [items, setItems] = useState<Organisation[]>([]);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        console.log('Fetching GSoC organizations...');
        const response = await apiClient.get('/api/gsoc/orgs');
        console.log('Fetched GSoC organizations:', response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching GSoC organizations:', error);
      }
    };
    fetchOrgs();
  }, []);

  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.organisation}
          description={item.description}
          header={<Skeleton item={item} />}
          icon={item.image_url}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          url={item.github}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = ({item}: {item: any}) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-slate-100">
  <img src={item.image_url} className="h-16 m-auto" alt="" />
  </div>
);
