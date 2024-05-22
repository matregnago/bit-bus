import { NavBar } from "@/components/global/navbar";
import * as React from "react";
import Footer from "@/components/global/footer";
import FilteredItems from "./showItems";

const getItems = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/items", {
      cache: "no-cache",
    });
    const items = await res.json();
    return items;
  } catch (error) {
    console.error(error);
  }
};

export default async function ShowcaseItems() {
  const items = await getItems();
  return (
    <div>
      <NavBar />
      <section className="bg-gray-50 py-20">
        <div className="text-center">
          <h1 className=" mt-36 text-5xl font-bold text-[#333333]">
            Our Museum Collection
          </h1>
          <p className="text-[#666666] mt-4">
            Discover our curated collection of rare and unique artifacts from
            around the world..
          </p>
          <FilteredItems items={items} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
