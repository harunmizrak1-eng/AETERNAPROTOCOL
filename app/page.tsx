import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { ResearchMetrics } from "@/components/research-metrics"
import { Categories } from "@/components/categories"
import { Idea } from "@/components/idea"
import { Process } from "@/components/process"
import { Offerings } from "@/components/offerings"
import { Trust } from "@/components/trust"
import { CaseStudy } from "@/components/case-study"
import { FinalCta, Footer } from "@/components/final-cta"
import { Reveal } from "@/components/reveal"

export default function Page() {
  return (
    <main className="bg-background">
      <Nav />
      <Hero />
      <ResearchMetrics />
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
        <CaseStudy />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
      <Footer />
    </main>
  )
}
