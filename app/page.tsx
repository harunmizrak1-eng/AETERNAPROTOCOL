import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { ResearchMetrics } from "@/components/research-metrics"
import { WhyAeterna } from "@/components/why-aeterna"
import { Categories } from "@/components/categories"
import { Idea } from "@/components/idea"
import { Process } from "@/components/process"
import { Offerings } from "@/components/offerings"
import { Trust } from "@/components/trust"
import { CaseStudies } from "@/components/case-studies"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"

export default function Page() {
  return (
    <main id="main-content" className="bg-background">
      <Nav />
      <Hero />
      <ResearchMetrics />
      <Reveal>
        <WhyAeterna />
      </Reveal>
      <Reveal>
        <Categories />
      </Reveal>
      <Reveal>
        <Idea />
      </Reveal>
      <Reveal>
        <Process />
      </Reveal>
      <Reveal>
        <Offerings />
      </Reveal>
      <Reveal>
        <Trust />
      </Reveal>
      <Reveal>
        <CaseStudies />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
      <Footer />
    </main>
  )
}
