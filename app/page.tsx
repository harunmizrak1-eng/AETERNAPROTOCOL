import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { Categories } from "@/components/categories"
import { Idea } from "@/components/idea"
import { Process } from "@/components/process"
import { Offerings } from "@/components/offerings"
import { Trust } from "@/components/trust"
import { FinalCta, Footer } from "@/components/final-cta"
import { Reveal } from "@/components/reveal"

export default function Page() {
  return (
    <main className="bg-background">
      <Nav />
      <Hero />
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
        <FinalCta />
      </Reveal>
      <Footer />
    </main>
  )
}
