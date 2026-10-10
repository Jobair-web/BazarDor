import Image from "next/image";
import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="hero rounded-box border border-base-300 bg-base-100 shadow-sm">
      <div className="hero-content w-full flex-col justify-between gap-8 p-8 lg:flex-row">
        <div className="max-w-xl space-y-4">
          <BanglaDate className="badge badge-soft badge-primary" />
          <h1 className="text-3xl font-bold sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary">সব পণ্য দেখুন</a>
        </div>
        <Image
          src="/bazar-hero.png"
          alt="বাজারের সবজি ও পণ্যের ব্যানার"
          width={480}
          height={360}
          priority
          className="h-auto w-56 lg:w-80"
        />
      </div>
    </section>
  );
}