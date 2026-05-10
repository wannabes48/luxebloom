import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import ValueProps from "@/components/ValueProps";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <ProductGrid />
      <PromoBanner />
      <ValueProps />
    </>
  );
}
