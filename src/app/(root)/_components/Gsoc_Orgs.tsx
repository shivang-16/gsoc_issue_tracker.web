'use client';
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Organisation } from "@/lib/type";
import { ClipLoader } from 'react-spinners';  // Import spinner loader
import { fetchGSoCOrganizations } from "@/actions/gsoc";

export default function Gsoc_Orgs({top, filters}: {top?: boolean, filters?: any}) {
  const [items, setItems] = useState<Organisation[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  // console.log(filters, 'filter');
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        // console.log('Fetching GSoC organizations...');
        const response = await fetchGSoCOrganizations(top, filters);
        setItems(response);
      } catch (error) {
        console.error('Error fetching GSoC organizations:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchOrgs();
  }, [filters]);

  return (
    <BentoGrid className="mx-auto">
      {loading ? (
        // Show spinner loader while loading
        <div className="flex justify-center items-center w-full h-full text-center">
          <ClipLoader color="#fff" loading={loading} size={50} />
        </div>
      ) : (
        items.map((item, i) => (
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
        ))
      )}
    </BentoGrid>
  );
}

const Skeleton = ({item}: {item: any}) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#171717]">
    <img src={item.image_url} className="h-16 m-auto" alt="" />
  </div>
);
