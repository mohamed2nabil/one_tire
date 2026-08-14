import Image from 'next/image'
import { Reveal } from './reveal'
import { db } from '@/lib/db'

interface TireBrandCardProps {
  name: string
  logo: string
  alt?: string
  websiteUrl?: string
}

function TireBrandCard({ name, logo, alt, websiteUrl }: TireBrandCardProps) {
  const CardContent = (
    <div className="group relative flex h-36 items-center justify-center rounded-2xl border border-border/40 bg-gradient-to-b from-card/40 to-card/10 p-4 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.3)] overflow-hidden">
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100 group-hover:rotate-12" />
      
      <div className="relative z-10 h-full w-full p-2 transition-transform duration-500 group-hover:scale-[1.15]">
        <Image
          src={logo}
          alt={alt || `${name} logo`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-contain filter dark:brightness-0 dark:invert drop-shadow-sm transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] dark:group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        />
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  )

  if (websiteUrl) {
    return (
      <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl">
        {CardContent}
      </a>
    )
  }

  return CardContent
}

const tireBrands = [
  { name: 'MICHELIN', logo: '/brands/MICHELIN.png' },
  { name: 'BRIDGESTONE', logo: '/brands/BRIDGESTONE.png' },
  { name: 'HANKOOK', logo: '/brands/Hankook_Logo.png' }, // Updated to match the actual filename
  { name: 'GOODYEAR', logo: '/brands/GOODYEAR.png' },
  { name: 'PIRELLI', logo: '/brands/PIRELLI.png' },
  { name: 'YOKOHAMA', logo: '/brands/YOKOHAMA.png' },
  { name: 'CONTINENTAL', logo: '/brands/CONTINENTAL.png' },
  { name: 'TOYO', logo: '/brands/TOYO.png' },
  { name: 'NEXEN', logo: '/brands/NEXEN.png' },
]

export async function Brands() {
  let dbBrands: any[] = [];
  try {
    dbBrands = await db.brand.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } });
  } catch (e) {}

  const activeBrands = dbBrands.length > 0 ? dbBrands : tireBrands;

  return (
    <section id="brands" className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-24">
      <Image
        src="/images/site/tire-showroom.png"
        alt=""
        fill
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold tracking-widest text-primary">علاماتنا</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            نخبة من أفخم العلامات العالمية
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            نوفّر لك إطارات أصلية من أشهر المصنّعين حول العالم — لتختار ما يناسب سيارتك وأداءك.
          </p>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:gap-8"
        >
          {activeBrands.map((brand: any) => (
            <TireBrandCard key={brand.name} name={brand.name} logo={brand.logoUrl || brand.logo} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
