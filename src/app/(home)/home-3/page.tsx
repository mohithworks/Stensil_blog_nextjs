import React from "react";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import { DEMO_POSTS, DEMO_POSTS_AUDIO } from "@/data/posts";
import SectionHero from "@/components/SectionHero/SectionHero";
import rightImg from "@/images/hero-right.png";
import Vector1 from "@/images/Vector1.png";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "@/data/authors";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import Image from "next/image";
import SectionMagazine5 from "@/components/Sections/SectionMagazine5";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import SectionAds from "@/components/Sections/SectionAds";
import SectionMagazine8 from "@/components/Sections/SectionMagazine8";
import SectionMagazine9 from "@/components/Sections/SectionMagazine9";
import SectionVideos from "@/components/Sections/SectionVideos";
import SectionLatestPosts from "@/components/Sections/SectionLatestPosts";

// DEMO DATA
const POSTS = DEMO_POSTS;
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
//

const PageHomeDemo3: React.FC = () => {
  return (
    <div className="nc-PageHomeDemo3 relative">
      <div className="container relative">
        <SectionHero
          rightImg={rightImg}
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          heading={
            <span>
              Far from face <br /> but not from {` `}
              <span className="relative pr-3">
                <Image
                  className="w-full absolute top-1/2 -left-1 transform -translate-y-1/2"
                  src={Vector1}
                  alt=""
                />
                <span className="relative">heart</span>
              </span>
            </span>
          }
          btnText="Getting started"
          subHeading="Let stay at home and share with everyone the most beautiful stories in your hometown 🎈"
        />

        <SectionGridCategoryBox
          headingCenter={false}
          categoryCardType="card2"
          className="pb-16 lg:pb-28"
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
        />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine5 heading="🧩 Editor Picks" posts={MAGAZINE1_POSTS} />
        </div>

        <SectionSliderPosts
          className="py-16 lg:py-28"
          postCardName="card10"
          heading="Sea travel enthusiast"
          subHeading="Over 218 articles about sea travel"
          posts={POSTS.filter((_, i) => i < 8)}
        />

        <SectionAds />

        <SectionMagazine8
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine9
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 18)}
          />
        </div>

        <SectionVideos className="py-16 lg:py-28" />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewAuthors
            heading="Newest authors"
            subHeading="Say hello to future creator potentials"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          />
        </div>

        <SectionBecomeAnAuthor className="py-16 lg:py-28" />

        <SectionLatestPosts
          posts={DEMO_POSTS.filter((_, i) => i > 7 && i < 16)}
          postCardName="card7"
          gridClass="sm:grid-cols-2"
          className="pb-16 lg:pb-28"
        />

        <SectionSubscribe2 className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default PageHomeDemo3;
