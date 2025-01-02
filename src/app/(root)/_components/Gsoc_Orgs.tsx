'use client';
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import apiClient from '@/apiClient/apiClient';
import { Organisation } from "@/lib/type";

export default function Gsoc_Orgs({top}: {top?: boolean}) {
  const [items, setItems] = useState<Organisation[]>([]);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        console.log('Fetching GSoC organizations...');
        const response = await apiClient.get(`/api/gsoc/orgs?top=${top}`);
        console.log('Fetched GSoC organizations:', response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching GSoC organizations:', error);
      }
    };
    fetchOrgs();
  }, []);

  return (
    <BentoGrid className="mx-auto ">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.organisation}
          description={item.description}
          header={<Skeleton item={item} />}
          icon={item.image_url}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          url={item.github}
          technologies={item.technologies}
          twitter_url={item.twitter_url}
          github_url={item.github}
          blog_url={item.blog_url}
          website_url={item.url}
          email={item.contact_email}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = ({item}: {item: any}) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#171717]">
  <img src={item.image_url} className="h-16 m-auto" alt="" />
  </div>
);
