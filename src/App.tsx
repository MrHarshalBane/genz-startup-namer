import { useState, useEffect } from 'react'
import {
  Sparkles,
  Volume2,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Globe,
  Sliders,
  Flame,
  Zap,
  Rocket,
  Download,
  Key,
  Layers,
  ChevronRight,
  RefreshCw,
  TrendingUp,
  Terminal,
  X
} from 'lucide-react'
import confetti from 'canvas-confetti'


interface StartupConcept {
  id: string
  name: string
  tld: string
  domainAvailable: boolean
  tagline: string
  vibe: string
  vibeBadge: string
  vibeColor: string
  chaosLevel: number
  pitch: {
    problem: string
    solution: string
    audience: string
    businessModel: string
  }
  brand: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    iconEmoji: string
    fontStyle: string
  }
}

const VIBE_CATEGORIES = [
  {
    id: 'brainrot',
    label: 'Brainrot Slang',
    emoji: '💀',
    desc: 'Skibidi, Rizz, Gyatt, Mogging & Pure Internet Slang',
    color: 'from-pink-500 via-purple-500 to-indigo-500',
    badge: 'border-pink-500/40 text-pink-400 bg-pink-500/10'
  },
  {
    id: 'demure',
    label: 'Demure & Mindful',
    emoji: '✨',
    desc: 'Very mindful, highly aesthetic, understated luxury',
    color: 'from-emerald-400 via-teal-400 to-cyan-400',
    badge: 'border-teal-500/40 text-teal-300 bg-teal-500/10'
  },
  {
    id: 'chaos',
    label: 'Unhinged Chaos',
    emoji: '⚡',
    desc: 'Zero context, high adrenaline, 3 AM fever dream',
    color: 'from-amber-400 via-rose-500 to-red-600',
    badge: 'border-red-500/40 text-red-400 bg-red-500/10'
  },
  {
    id: 'techbro',
    label: 'Tech-Bro AI',
    emoji: '🤖',
    desc: 'Vowelless, hyper-optimized, Silicon Valley seed-stage',
    color: 'from-cyan-400 via-blue-500 to-indigo-600',
    badge: 'border-blue-500/40 text-blue-300 bg-blue-500/10'
  },
  {
    id: 'cottagecore',
    label: 'Cottagecore & Chill',
    emoji: '🍵',
    desc: 'Matcha, sage green, low cortisol, slow living',
    color: 'from-lime-400 via-emerald-500 to-teal-600',
    badge: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
  },
  {
    id: 'web3',
    label: 'Web3 & Moonshot',
    emoji: '🚀',
    desc: 'DAO governance, zero-knowledge vibes, to the moon',
    color: 'from-yellow-400 via-orange-500 to-purple-600',
    badge: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10'
  }
]

const TLD_OPTIONS = ['.ai', '.io', '.xyz', '.lol', '.gg', '.tech', '.app', 'Dynamic']

// Deterministic mock / built-in generator datasets
const BRAINROT_PREFIXES = ['Skibidi', 'Rizz', 'Sigma', 'Gyatt', 'Mew', 'Fanum', 'Bussin', 'Cap', 'NoCap', 'Delulu', 'Cooked', 'Bop', 'Grimace', 'NPC', 'Goon', 'Yap']
const BRAINROT_SUFFIXES = ['OS', 'Labs', 'AI', 'Hub', 'Fi', 'Space', 'Verse', 'Protocol', 'Pulse', 'Cloud', 'Byte', 'Sync', 'Box', 'Flow', 'Forge']
const BRAINROT_TAGLINES = [
  'Giving maximum rizz to your daily automated workflow.',
  'No cap, the fastest AI stack for the generation that does not sleep.',
  'Zero tax on your dopamine receptors. Just pure main character energy.',
  'Mewing your way to Series A funding in 3 business seconds.',
  'Unapologetically cooked, but making 7 figures in ARR.'
]

const DEMURE_PREFIXES = ['Loom', 'Aura', 'Nourish', 'Sable', 'Vesper', 'Linen', 'Pebble', 'Mist', 'Atelier', 'Silence', 'Kumo', 'Petal', 'Sora']
const DEMURE_SUFFIXES = ['studio', 'house', 'atelier', 'living', 'craft', 'haven', 'collective', 'space', 'mood', 'co']
const DEMURE_TAGLINES = [
  'Very mindful. Very demure. Not doing too much, just flawless execution.',
  'Low-cortisol product architecture for intentional modern creators.',
  'Curated digital calm wrapped in neutral tones and timeless craft.',
  'The soft launch your digital footprint has been craving.'
]

const CHAOS_PREFIXES = ['Feral', 'Doom', 'Screaming', 'Hyper', 'Turbo', 'Goblin', 'Overdrive', 'Unhinged', 'Giga', 'Frenzy', 'Clown', 'Radioactive']
const CHAOS_SUFFIXES = ['Core', 'X', 'Blast', 'Nuke', 'Trash', 'Warp', 'Overload', 'Riot', 'Surge', 'Maxx']
const CHAOS_TAGLINES = [
  'We broke the server on purpose so you have something to tweet about.',
  'Fueled by 4 cans of Celsius and zero user testing.',
  'Absolute insanity packaged into a single viral API endpoint.',
  'Your parents will not understand it, but your Discord friends will invest.'
]

const TECHBRO_PREFIXES = ['Synthet', 'Cogni', 'Neuro', 'Omni', 'Vectr', 'Axon', 'Hyper', 'Tensor', 'Nexus', 'Opti', 'Flux']
const TECHBRO_SUFFIXES = ['iq', 'ly', 'ify', 'scale', 'flow', 'stack', 'engine', 'node', 'mesh', 'grid']
const TECHBRO_TAGLINES = [
  'Autonomous LLM-orchestrated autonomous orchestration for autonomous founders.',
  'Replacing entire middle management layers with an open-source bash script.',
  'Sub-millisecond inference for founders who take ice baths at 4:30 AM.',
  'Deterministic enterprise intelligence baked right into your edge nodes.'
]

const COTTAGECORE_PREFIXES = ['Matcha', 'Moss', 'Sage', 'Oat', 'Sprout', 'Flora', 'Clover', 'Fern', 'Meadow', 'Acorn']
const COTTAGECORE_SUFFIXES = ['Root', 'Bloom', 'Grove', 'Garden', 'Earth', 'Nest', 'Haven', 'Bough']
const COTTAGECORE_TAGLINES = [
  'Slow tech designed beneath sunlight and handwritten journals.',
  'Calm, restorative tools to nurture your everyday offline rituals.',
  'Software that smells like lavender tea and warm wooden floorboards.'
]

const WEB3_PREFIXES = ['Ape', 'Moon', 'Yield', 'Ether', 'Chain', 'Vault', 'ZeroK', 'Hash', 'Token', 'Nodes', 'Degen']
const WEB3_SUFFIXES = ['dao', 'fi', 'mint', 'stake', 'swap', 'drop', 'block', 'chain', 'ledger']
const WEB3_TAGLINES = [
  'Proof-of-Vibe consensus protocol built on layer 69.',
  'Decentralized community treasury where everyone owns 0.0001% of the vibe.',
  'High-yield dopamine pools backed by peer-reviewed memes.'
]

const BRAND_PALETTES = [
  { primary: '#EC4899', secondary: '#8B5CF6', accent: '#3B82F6', emoji: '⚡', font: 'font-black tracking-tight' },
  { primary: '#10B981', secondary: '#06B6D4', accent: '#3B82F6', emoji: '🌱', font: 'font-light tracking-widest' },
  { primary: '#F59E0B', secondary: '#EF4444', accent: '#EC4899', emoji: '🔥', font: 'font-extrabold italic uppercase' },
  { primary: '#6366F1', secondary: '#A855F7', accent: '#EC4899', emoji: '🔮', font: 'font-mono uppercase tracking-wider' },
  { primary: '#14B8A6', secondary: '#10B981', accent: '#84CC16', emoji: '🍵', font: 'font-serif tracking-normal' },
  { primary: '#8B5CF6', secondary: '#EC4899', accent: '#F59E0B', emoji: '💎', font: 'font-sans font-bold uppercase' }
]

export function App() {
  const [selectedVibe, setSelectedVibe] = useState('brainrot')
  const [chaosLevel, setChaosLevel] = useState(3)
  const [selectedTLD, setSelectedTLD] = useState('.ai')
  const [customKeyword, setCustomKeyword] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<StartupConcept[]>([])
  const [favorites, setFavorites] = useState<StartupConcept[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [activeDeck, setActiveDeck] = useState<StartupConcept | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [pronouncingId, setPronouncingId] = useState<string | null>(null)

  // Load saved state from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('genz_openai_key')
    if (savedKey) setApiKey(savedKey)

    const savedFavs = localStorage.getItem('genz_favorites')
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs))
      } catch {
        // ignore
      }
    }

    // Generate initial pack
    generateNames()
  }, [])

  const saveFavorites = (favs: StartupConcept[]) => {
    setFavorites(favs)
    localStorage.setItem('genz_favorites', JSON.stringify(favs))
  }

  const toggleFavorite = (concept: StartupConcept) => {
    const exists = favorites.some((f) => f.id === concept.id)
    if (exists) {
      saveFavorites(favorites.filter((f) => f.id !== concept.id))
    } else {
      saveFavorites([...favorites, concept])
      triggerMiniConfetti()
    }
  }

  const triggerMiniConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981']
    })
  }

  const triggerMegaConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF007A', '#7928CA', '#00DFD8', '#FF4D4D', '#FFBE0B']
    })
  }

  const handlePronounce = (name: string, id: string) => {
    if (!('speechSynthesis' in window)) return
    setPronouncingId(id)
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(name)
    utterance.rate = 0.95
    utterance.pitch = 1.1
    utterance.onend = () => setPronouncingId(null)
    utterance.onerror = () => setPronouncingId(null)
    window.speechSynthesis.speak(utterance)
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const generateOfflineConcept = (index: number): StartupConcept => {
    let prefixes = BRAINROT_PREFIXES
    let suffixes = BRAINROT_SUFFIXES
    let taglines = BRAINROT_TAGLINES
    let paletteIdx = 0

    if (selectedVibe === 'demure') {
      prefixes = DEMURE_PREFIXES
      suffixes = DEMURE_SUFFIXES
      taglines = DEMURE_TAGLINES
      paletteIdx = 1
    } else if (selectedVibe === 'chaos') {
      prefixes = CHAOS_PREFIXES
      suffixes = CHAOS_SUFFIXES
      taglines = CHAOS_TAGLINES
      paletteIdx = 2
    } else if (selectedVibe === 'techbro') {
      prefixes = TECHBRO_PREFIXES
      suffixes = TECHBRO_SUFFIXES
      taglines = TECHBRO_TAGLINES
      paletteIdx = 3
    } else if (selectedVibe === 'cottagecore') {
      prefixes = COTTAGECORE_PREFIXES
      suffixes = COTTAGECORE_SUFFIXES
      taglines = COTTAGECORE_TAGLINES
      paletteIdx = 4
    } else if (selectedVibe === 'web3') {
      prefixes = WEB3_PREFIXES
      suffixes = WEB3_SUFFIXES
      taglines = WEB3_TAGLINES
      paletteIdx = 5
    }

    const kw = customKeyword.trim()
    const pref = prefixes[Math.floor(Math.random() * prefixes.length)]
    const suff = suffixes[Math.floor(Math.random() * suffixes.length)]

    let finalName = ''
    if (kw) {
      if (Math.random() > 0.5) {
        finalName = `${kw}${suff}`
      } else {
        finalName = `${pref}${kw.charAt(0).toUpperCase() + kw.slice(1)}`
      }
    } else {
      if (chaosLevel >= 4 && Math.random() > 0.4) {
        finalName = `${pref}${suffixes[Math.floor(Math.random() * suffixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`
      } else {
        finalName = `${pref}${suff}`
      }
    }

    if (selectedVibe === 'demure') {
      finalName = finalName.toLowerCase()
    }

    const tld =
      selectedTLD === 'Dynamic'
        ? ['.ai', '.io', '.xyz', '.lol', '.gg', '.tech'][Math.floor(Math.random() * 6)]
        : selectedTLD

    const vibeObj = VIBE_CATEGORIES.find((v) => v.id === selectedVibe) || VIBE_CATEGORIES[0]
    const palette = BRAND_PALETTES[(paletteIdx + index) % BRAND_PALETTES.length]
    const tagline = taglines[Math.floor(Math.random() * taglines.length)]

    return {
      id: `${finalName}-${Date.now()}-${index}`,
      name: finalName,
      tld,
      domainAvailable: Math.random() > 0.35,
      tagline,
      vibe: vibeObj.label,
      vibeBadge: vibeObj.badge,
      vibeColor: vibeObj.color,
      chaosLevel,
      pitch: {
        problem: `Modern GenZ users have 2.3 seconds of attention span and standard corporate legacy solutions give them immediate existential dread.`,
        solution: `${finalName} delivers high-velocity, automated vibe optimization with instant zero-friction viral payoff.`,
        audience: `Chronically online creators, late-night founders, remote engineers, and aesthetic trendsetters aged 16-29.`,
        businessModel: `Freemium micro-transactions, meme coin revenue share, or $9.99/mo premium vibe boost tier.`
      },
      brand: {
        primaryColor: palette.primary,
        secondaryColor: palette.secondary,
        accentColor: palette.accent,
        iconEmoji: palette.emoji,
        fontStyle: palette.font
      }
    }
  }

  const generateNames = async () => {
    setIsGenerating(true)

    // Optional OpenAI branch if key provided
    if (apiKey.trim().startsWith('sk-')) {
      try {
        const prompt = `Generate 6 viral, super modern GenZ startup names for the vibe '${selectedVibe}' with chaos level ${chaosLevel}/5. Keyword hint: '${customKeyword}'. Return valid JSON array of objects with fields: name, tagline, problem, solution, audience, businessModel.`
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey.trim()}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' }
          })
        })

        if (response.ok) {
          const data = await response.json()
          const parsed = JSON.parse(data.choices[0].message.content)
          const items = parsed.startups || parsed.items || parsed.names || Object.values(parsed)[0]

          if (Array.isArray(items)) {
            const aiResults: StartupConcept[] = items.slice(0, 6).map((item: any, i: number) => {
              const vibeObj = VIBE_CATEGORIES.find((v) => v.id === selectedVibe) || VIBE_CATEGORIES[0]
              const palette = BRAND_PALETTES[i % BRAND_PALETTES.length]
              const tld =
                selectedTLD === 'Dynamic'
                  ? ['.ai', '.io', '.xyz', '.lol', '.gg'][i % 5]
                  : selectedTLD
              return {
                id: `ai-${Date.now()}-${i}`,
                name: item.name || `Vibe${i}`,
                tld,
                domainAvailable: Math.random() > 0.4,
                tagline: item.tagline || 'Next-gen viral digital intelligence.',
                vibe: vibeObj.label,
                vibeBadge: vibeObj.badge,
                vibeColor: vibeObj.color,
                chaosLevel,
                pitch: {
                  problem: item.problem || 'Legacy tools are too slow and painful.',
                  solution: item.solution || 'Instant high-velocity creative infrastructure.',
                  audience: item.audience || 'GenZ founders and digital nomads.',
                  businessModel: item.businessModel || 'Freemium subscriptions + community tiers.'
                },
                brand: {
                  primaryColor: palette.primary,
                  secondaryColor: palette.secondary,
                  accentColor: palette.accent,
                  iconEmoji: palette.emoji,
                  fontStyle: palette.font
                }
              }
            })
            setResults(aiResults)
            setIsGenerating(false)
            triggerMegaConfetti()
            return
          }
        }
      } catch (e) {
        console.warn('OpenAI request failed or rate limited, using built-in generator:', e)
      }
    }

    // Built-in smart fallback engine (immediate & reliable)
    setTimeout(() => {
      const generated: StartupConcept[] = Array.from({ length: 6 }).map((_, i) =>
        generateOfflineConcept(i)
      )
      setResults(generated)
      setIsGenerating(false)
      triggerMegaConfetti()
    }, 450)
  }

  const exportFavoritesJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(favorites, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `genz-startups-favorites-${Date.now()}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="min-h-screen bg-[#070913] text-gray-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#070913]/80 border-b border-gray-800/80 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-pink-500/20">
            <div className="h-full w-full bg-[#070913] rounded-[10px] flex items-center justify-center font-black text-lg text-pink-400">
              ⚡
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-black tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                GenZ Startup Namer
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400">
                v2.0 Turbo
              </span>
            </div>
            <p className="text-xs text-gray-400 hidden sm:block">
              Quirky, viral names, logos & VC pitch decks powered by dual AI engines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowKeyModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-700 bg-gray-900/80 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-yellow-400" />
            <span>{apiKey ? 'API Key Linked' : 'OpenAI Key'}</span>
            {apiKey && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
          </button>

          <button
            onClick={() => setShowFavorites(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-md shadow-pink-500/20 transition-all active:scale-95"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Vault</span>
            {favorites.length > 0 && (
              <span className="px-1.5 py-0.2 bg-white text-purple-900 rounded-full text-[10px] font-black">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
            Turn Brainrot, Aesthetic Vibe & Chaos into Millions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Generate your next{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Unstoppable Startup
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Domain extensions, AI logo previews, audio pronunciations, and an instant 4-slide elevator pitch deck ready for Y Combinator or TikTok.
          </p>
        </div>

        {/* Generator Controls Card */}
        <section className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-6">
          {/* Vibe Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-pink-400" />
                Select Vibe / Aesthetic
              </label>
              <span className="text-xs text-gray-400">
                Current: <strong className="text-pink-300 capitalize">{selectedVibe}</strong>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {VIBE_CATEGORIES.map((v) => {
                const active = selectedVibe === v.id
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVibe(v.id)}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      active
                        ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/10 ring-1 ring-pink-500/30'
                        : 'border-gray-800 bg-gray-950/40 hover:border-gray-700 hover:bg-gray-800/40'
                    }`}
                  >
                    <span className="text-2xl mb-1">{v.emoji}</span>
                    <span className="text-xs font-bold text-gray-200">{v.label}</span>
                    <span className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{v.desc}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sliders & Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-gray-800/80">
            {/* Chaos Level */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Chaos & Slang Intensity
                </label>
                <span className="font-mono text-cyan-300 font-bold">Lvl {chaosLevel} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={chaosLevel}
                onChange={(e) => setChaosLevel(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer bg-gray-800 rounded-lg h-2"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Safe 👔</span>
                <span>Mild 💅</span>
                <span>Max Chaos ⚡</span>
              </div>
            </div>

            {/* TLD Selection */}
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 text-xs">
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                Target TLD / Extension
              </label>
              <div className="flex flex-wrap gap-1.5">
                {TLD_OPTIONS.map((tld) => {
                  const active = selectedTLD === tld
                  return (
                    <button
                      key={tld}
                      onClick={() => setSelectedTLD(tld)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        active
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {tld}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Keyword Seed */}
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 text-xs">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                Custom Core Topic / Word
              </label>
              <input
                type="text"
                value={customKeyword}
                onChange={(e) => setCustomKeyword(e.target.value)}
                placeholder="e.g. matcha, crypto, tutor, pet..."
                className="w-full px-3 py-2 bg-gray-950/70 border border-gray-700 rounded-xl text-xs placeholder:text-gray-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={generateNames}
              disabled={isGenerating}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-95 active:scale-95 shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Viral Names...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 text-white" />
                  <span>Generate Viral Startup Batch</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Results Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm uppercase font-bold tracking-wider text-gray-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-pink-400" />
              Generated Concepts ({results.length})
            </h3>
            <span className="text-xs text-gray-400">Click Pitch Deck to inspect VC cards</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((item) => {
              const isFav = favorites.some((f) => f.id === item.id)
              const domainName = `${item.name.toLowerCase()}${item.tld}`

              return (
                <div
                  key={item.id}
                  className="group relative bg-gray-900/50 hover:bg-gray-900/90 border border-gray-800 hover:border-pink-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1"
                >
                  {/* Top Bar inside card */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      {/* Logo Preview Avatar */}
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-md shrink-0 border border-white/10"
                        style={{
                          background: `linear-gradient(135deg, ${item.brand.primaryColor}, ${item.brand.secondaryColor})`
                        }}
                      >
                        {item.brand.iconEmoji}
                      </div>

                      {/* Badges & Actions */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handlePronounce(item.name, item.id)}
                          title="Listen pronunciation"
                          className="p-1.5 rounded-lg border border-gray-800 bg-gray-950/60 hover:text-white text-gray-400 hover:border-gray-700 transition-colors"
                        >
                          <Volume2
                            className={`w-4 h-4 ${
                              pronouncingId === item.id ? 'text-pink-400 animate-ping' : ''
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleCopy(item.name, item.id)}
                          title="Copy name"
                          className="p-1.5 rounded-lg border border-gray-800 bg-gray-950/60 hover:text-white text-gray-400 hover:border-gray-700 transition-colors"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleFavorite(item)}
                          title="Save to vault"
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isFav
                              ? 'border-pink-500/50 bg-pink-500/20 text-pink-400'
                              : 'border-gray-800 bg-gray-950/60 hover:text-white text-gray-400 hover:border-gray-700'
                          }`}
                        >
                          {isFav ? (
                            <BookmarkCheck className="w-4 h-4 text-pink-400" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Name & TLD */}
                    <div className="space-y-1 mb-2">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className={`text-2xl font-black tracking-tight text-white ${item.brand.fontStyle}`}>
                          {item.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/20">
                          {item.tld}
                        </span>
                      </div>

                      {/* Domain Availability Simulation */}
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.domainAvailable ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-amber-400'
                          }`}
                        ></span>
                        <span className="font-mono text-gray-400">{domainName}</span>
                        <span
                          className={`text-[10px] font-semibold px-1 rounded ${
                            item.domainAvailable
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : 'text-amber-400 bg-amber-500/10'
                          }`}
                        >
                          {item.domainAvailable ? 'Available' : 'Taken'}
                        </span>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-gray-300 leading-relaxed font-medium mb-4">
                      "{item.tagline}"
                    </p>
                  </div>

                  {/* Bottom details & Pitch Deck CTA */}
                  <div className="space-y-3 pt-3 border-t border-gray-800/80">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${item.vibeBadge}`}>
                        {item.vibe}
                      </span>

                      {/* Color Palette swatch */}
                      <div className="flex items-center gap-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                          style={{ backgroundColor: item.brand.primaryColor }}
                        ></span>
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                          style={{ backgroundColor: item.brand.secondaryColor }}
                        ></span>
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                          style={{ backgroundColor: item.brand.accentColor }}
                        ></span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveDeck(item)}
                      className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-gray-800 hover:bg-gray-700/80 text-gray-200 flex items-center justify-center gap-1.5 border border-gray-700/80 hover:border-gray-600 transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Inspect VC Pitch Deck</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Live Brand Studio Preview Showcase */}
        <section className="bg-gradient-to-r from-purple-950/40 via-gray-900 to-pink-950/40 border border-purple-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm uppercase font-bold tracking-wider text-purple-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                Live Startup Brand Studio
              </h3>
              <p className="text-xs text-gray-400">
                Visual identity previews generated dynamically for social banners, app icons & sticker swag.
              </p>
            </div>
            {results.length > 0 && (
              <span className="text-xs font-mono text-pink-400 bg-pink-500/10 px-2 py-1 rounded border border-pink-500/20">
                Active Spotlight: {results[0].name}
              </span>
            )}
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* App Icon Mock */}
              <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                  iOS / Android Icon
                </span>
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-pink-500/20 border border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${results[0].brand.primaryColor}, ${results[0].brand.secondaryColor})`
                  }}
                >
                  {results[0].brand.iconEmoji}
                </div>
                <span className="text-xs font-bold text-white">{results[0].name}</span>
              </div>

              {/* X / Twitter Header Mock */}
              <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">
                  Social Banner Header
                </span>
                <div
                  className="h-24 rounded-lg p-3 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-inner"
                  style={{
                    background: `linear-gradient(90deg, ${results[0].brand.primaryColor}33, ${results[0].brand.secondaryColor}66)`
                  }}
                >
                  <span className="text-lg font-black text-white">{results[0].name}</span>
                  <span className="text-[10px] text-gray-200 line-clamp-1">{results[0].tagline}</span>
                </div>
                <div className="text-[10px] text-gray-400 mt-2 flex justify-between">
                  <span>3:1 Aspect Ratio</span>
                  <span className="text-pink-400">Ready to export</span>
                </div>
              </div>

              {/* Startup Hex Swatch */}
              <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">
                  Brand Hex Palette
                </span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono bg-gray-900 p-2 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: results[0].brand.primaryColor }}
                      ></span>
                      <span>Primary</span>
                    </div>
                    <span className="text-gray-400">{results[0].brand.primaryColor}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono bg-gray-900 p-2 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: results[0].brand.secondaryColor }}
                      ></span>
                      <span>Secondary</span>
                    </div>
                    <span className="text-gray-400">{results[0].brand.secondaryColor}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono bg-gray-900 p-2 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: results[0].brand.accentColor }}
                      ></span>
                      <span>Accent</span>
                    </div>
                    <span className="text-gray-400">{results[0].brand.accentColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* VC Pitch Deck Modal */}
      {activeDeck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveDeck(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Deck Header */}
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${activeDeck.brand.primaryColor}, ${activeDeck.brand.secondaryColor})`
                }}
              >
                {activeDeck.brand.iconEmoji}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-white">{activeDeck.name}</h3>
                  <span className="text-xs font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                    {activeDeck.tld}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{activeDeck.tagline}</p>
              </div>
            </div>

            {/* 4 Slide Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Slide 1 */}
              <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-4 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 flex items-center gap-1.5">
                  Slide 01 • The Problem 🤔
                </span>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {activeDeck.pitch.problem}
                </p>
              </div>

              {/* Slide 2 */}
              <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-4 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 flex items-center gap-1.5">
                  Slide 02 • Our Solution 💡
                </span>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {activeDeck.pitch.solution}
                </p>
              </div>

              {/* Slide 3 */}
              <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-4 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 flex items-center gap-1.5">
                  Slide 03 • Target Audience 🎯
                </span>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {activeDeck.pitch.audience}
                </p>
              </div>

              {/* Slide 4 */}
              <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-4 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                  Slide 04 • Business Model 💸
                </span>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {activeDeck.pitch.businessModel}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  const deckContent = `Startup: ${activeDeck.name}${activeDeck.tld}\nTagline: ${activeDeck.tagline}\n\n1. Problem: ${activeDeck.pitch.problem}\n2. Solution: ${activeDeck.pitch.solution}\n3. Audience: ${activeDeck.pitch.audience}\n4. Business Model: ${activeDeck.pitch.businessModel}`
                  handleCopy(deckContent, 'deck')
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-pink-600/20"
              >
                {copiedId === 'deck' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === 'deck' ? 'Copied Pitch!' : 'Copy Entire Pitch'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Vault Drawer */}
      {showFavorites && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-gray-900 border-l border-gray-800 h-full p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-pink-400" />
                  <h3 className="text-lg font-black text-white">Your Saved Vault</h3>
                  <span className="text-xs text-gray-400 font-mono">({favorites.length})</span>
                </div>
                <button
                  onClick={() => setShowFavorites(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {favorites.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <p className="text-sm text-gray-500">Your startup vault is empty.</p>
                  <p className="text-xs text-gray-600">
                    Click the bookmark icon on any card to save your favorite names.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3 overflow-y-auto max-h-[70vh] pr-1">
                  {favorites.map((fav) => (
                    <div
                      key={fav.id}
                      className="bg-gray-950/70 border border-gray-800 rounded-xl p-3 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{fav.name}</span>
                          <span className="text-[10px] font-mono text-pink-400">{fav.tld}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 line-clamp-1">{fav.tagline}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(`${fav.name}${fav.tld}`, fav.id)}
                          className="p-1.5 rounded-lg bg-gray-800 text-gray-300 hover:text-white"
                        >
                          {copiedId === fav.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleFavorite(fav)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {favorites.length > 0 && (
              <div className="pt-4 border-t border-gray-800">
                <button
                  onClick={exportFavoritesJson}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Saved Startups (.JSON)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* OpenAI Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowKeyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-yellow-400" />
                Custom OpenAI API Key
              </h3>
              <p className="text-xs text-gray-400">
                Optional: Connect your own OpenAI key for GPT-4o powered generation. Without a key, our built-in smart AI engine generates infinite names instantly.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full px-3 py-2 bg-gray-950/70 border border-gray-700 rounded-xl text-xs font-mono placeholder:text-gray-600 focus:outline-none focus:border-pink-500"
              />
              <p className="text-[10px] text-gray-500">
                Keys are stored strictly in your browser's local storage and communicated directly over HTTPS.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  localStorage.removeItem('genz_openai_key')
                  setApiKey('')
                  setShowKeyModal(false)
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  localStorage.setItem('genz_openai_key', apiKey.trim())
                  setShowKeyModal(false)
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white transition-colors cursor-pointer"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-800/80 px-4 py-6 text-center text-xs text-gray-500 space-y-1">
        <p>
          GenZ Startup Namer © {new Date().getFullYear()} • Built with React 19, Tailwind CSS v4, Lucide & Canvas Confetti.
        </p>
        <p className="text-[11px] text-gray-600">
          Engineered for modern builders, dreamers, and chronically online founders.
        </p>
      </footer>
    </div>
  )
}
export default App
