"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Star, ArrowRight, Bot, Zap, ArrowLeftRight, BrainCircuit, Wrench, Globe } from "lucide-react";

// shadcn/ui imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Since Avatar wasn't installed in the workspace, we mock it here to ensure it's self-contained:
const Avatar = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-800 ${className}`}>
    {children}
  </div>
);
const AvatarImage = ({ src, alt }: { src: string; alt?: string }) => (
  <img className="aspect-square h-full w-full object-cover" src={src} alt={alt} />
);
const AvatarFallback = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-white text-xs font-medium">
    {children}
  </div>
);

// Fonts injection
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

    :root {
      --bg-color: #0A0A0A;
      --accent-color: #C8F04D;
    }

    body {
      background-color: var(--bg-color);
      color: #FAFAFA;
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
    }

    .font-serif { font-family: 'DM Serif Display', serif; }
    .font-mono { font-family: 'DM Mono', monospace; }

    .bg-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    }

    /* Hide scrollbar for ticker */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}} />
);

// --- Micro-components ---

const SplitText = ({ text, className }: { text: string; className?: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const chars = container.current.querySelectorAll('.split-char');
    gsap.fromTo(chars, 
      { y: 50, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.02, ease: "back.out(1.7)", delay: 0.2 }
    );
  }, [text]);

  return (
    <div ref={container} className={className} style={{ perspective: "1000px" }}>
      {text.split('').map((char, i) => (
        <span key={i} className="split-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </span>
      ))}
    </div>
  );
};

const AnimatedCounter = ({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const springValue = useSpring(from, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) springValue.set(to);
  }, [inView, springValue, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{from}</span>;
};

// --- Main Page Component ---

export default function FlowMartLanding() {
  const heroGridRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax grid
    if (heroGridRef.current) {
      gsap.to(heroGridRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: heroGridRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Infinite Marquee GSAP
    if (tickerRef.current) {
      gsap.to(tickerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }
  }, []);

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    })
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] bg-noise relative selection:bg-[#C8F04D] selection:text-black">
      <FontStyles />

      {/* 1. NAV (Removed: Now using global @/components/navbar.tsx) */}

      {/* 2. HERO */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center text-center overflow-hidden min-h-[90vh] justify-center">
        {/* SVG Grid Background */}
        <div ref={heroGridRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="font-serif text-6xl md:text-8xl leading-[1.1] tracking-tight mb-8">
            <SplitText text="The Marketplace for" />
            <SplitText text="AI That Works." className="text-[#C8F04D] italic pr-4" />
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl text-zinc-400 mb-10 max-w-2xl"
          >
            Buy and sell automations, AI agents, and workflows. <br className="hidden sm:block" />
            Built for builders. Trusted by teams.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button className="bg-[#C8F04D] text-black hover:bg-[#b0d83a] rounded-none h-12 px-8 text-lg">
              Start Selling
            </Button>
            <Button variant="outline" className="rounded-none h-12 px-8 text-lg border-zinc-700 bg-transparent text-white hover:bg-zinc-900 hover:text-white">
              Browse Automations
            </Button>
          </motion.div>
        </div>

        {/* Marquee Ticker */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-0 w-full overflow-hidden border-y border-white/10 py-3 bg-[#0A0A0A]"
        >
          <div ref={tickerRef} className="flex whitespace-nowrap gap-8 text-sm font-mono text-zinc-500 uppercase tracking-wider w-[200%]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 shrink-0">
                <span>12,400+ automations</span><span>•</span>
                <span>3,200 creators</span><span>•</span>
                <span>$4.2M paid out</span><span>•</span>
                <span>Zapier integrations</span><span>•</span>
                <span>Make.com</span><span>•</span>
                <span>n8n</span><span>•</span>
                <span>LangChain</span><span>•</span>
                <span>CrewAI</span><span>•</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. BENTO FEATURES (DARK THEME) */}
      <section className="py-24 px-6 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Sell anything */}
            <div className="bg-[#111111] rounded-none border border-white/10 p-8 md:p-12 flex flex-col justify-between relative min-h-[400px] group hover:border-white/20 transition-colors overflow-hidden">
              <div className="relative z-10 max-w-sm mb-8">
                <h3 className="text-3xl font-serif mb-4 text-white">Sell anything</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Video lessons. Monthly subscriptions. Whatever! FlowMart was created to help you experiment with all kinds of ideas and formats.
                </p>
              </div>
              {/* Dark Theme Illustration */}
              <div className="absolute right-0 bottom-0 w-[300px] h-[200px] border-t border-l border-white/10 bg-zinc-950 p-6 flex flex-col justify-end transition-transform group-hover:-translate-y-2">
                <div className="absolute top-4 left-4 font-mono text-xs text-zinc-600">product.json</div>
                <div className="w-full h-24 border border-white/5 bg-[#1A1A1A] flex items-center justify-center relative mt-auto">
                  <div className="w-12 h-12 bg-zinc-900 border border-white/10 flex items-center justify-center text-[#C8F04D]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                     <div className="w-1.5 h-1.5 rounded-none bg-zinc-700"></div>
                     <div className="w-1.5 h-1.5 rounded-none bg-zinc-700"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Make your own road */}
            <div className="bg-[#111111] rounded-none border border-white/10 p-8 md:p-12 flex flex-col justify-between relative min-h-[400px] group hover:border-white/20 transition-colors overflow-hidden">
              <div className="relative z-10 max-w-sm mb-8">
                <h3 className="text-3xl font-serif mb-4 text-white">Make your own road</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Whether you need more balance, flexibility, or just a different gig, we make it easy to chart a new path.
                </p>
              </div>
              {/* Dark Theme Illustration */}
              <div className="absolute right-8 bottom-0 w-[320px] h-[160px] border-t border-x border-white/10 bg-zinc-950 pt-6 px-6 transition-transform group-hover:-translate-y-2">
                <div className="flex justify-between items-end mb-4 border-b border-white/5 pb-4">
                  <div>
                    <div className="text-2xl font-mono text-white">$201,083</div>
                    <div className="text-xs font-mono text-zinc-500 mt-1 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#C8F04D]"></div> TOTAL REVENUE
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-2 h-[40px] w-full">
                  {[30, 60, 45, 80, 55, 75, 45, 90, 60, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-zinc-900 relative h-full">
                      <div className="absolute bottom-0 w-full bg-zinc-800 transition-all duration-500 group-hover:bg-[#C8F04D]" style={{ height: `${h}%` }}>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Sell to anyone */}
            <div className="bg-[#111111] rounded-none border border-white/10 p-8 md:p-12 min-h-[400px] flex flex-col justify-center hover:border-white/20 transition-colors">
              <h3 className="text-3xl font-serif mb-10 text-white">Sell to anyone</h3>
              <ul className="space-y-6">
                {[
                  "Go from 0 to $1 and automated workflows.",
                  "Let your customers pay in their own currency.",
                  "Choose between one-time, recurring, or fixed-length payments in your currency of choice."
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 w-5 h-5 shrink-0 bg-[#C8F04D]/10 text-[#C8F04D] flex items-center justify-center text-xs border border-[#C8F04D]/20">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-lg text-zinc-300 leading-snug">{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 4: Sell anywhere */}
            <div className="bg-[#111111] rounded-none border border-white/10 p-8 md:p-12 overflow-hidden relative min-h-[400px] group hover:border-white/20 transition-colors">
              <div className="relative z-10 max-w-sm mb-8">
                <h3 className="text-3xl font-serif mb-4 text-white">Sell anywhere</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Create and customize your storefront with our all-in-one platform or choose to use your personal site instead. Seamlessly connect your account to thousands of apps in your current stack.
                </p>
              </div>
              
              {/* Dark Theme Illustration */}
              <div className="absolute right-0 bottom-10 w-[260px] h-[160px] border-y border-l border-white/10 bg-zinc-950 p-4 text-white flex flex-col transition-transform group-hover:-translate-x-2">
                 <div className="flex gap-1.5 mb-4 border-b border-white/5 pb-2">
                   <div className="w-2 h-2 bg-zinc-800"></div>
                   <div className="w-2 h-2 bg-zinc-800"></div>
                   <div className="w-2 h-2 bg-zinc-800"></div>
                 </div>
                 <div className="bg-[#1A1A1A] text-white p-4 flex-1 border border-white/5 flex flex-col justify-center">
                   <div className="text-xl font-mono text-[#C8F04D] mb-2">{">"} deploy</div>
                   <div className="w-full h-1 bg-zinc-800 mt-2"></div>
                   <div className="w-3/4 h-1 bg-zinc-800 mt-2"></div>
                 </div>
              </div>
              
              {/* Floating app icons */}
              <div className="absolute right-8 top-12 w-10 h-10 bg-zinc-900 border border-white/10 flex items-center justify-center font-mono text-sm text-zinc-400 shadow-2xl transition-transform group-hover:-translate-y-2">API</div>
              <div className="absolute right-24 top-[100px] w-10 h-10 bg-zinc-900 border border-[#C8F04D]/30 flex items-center justify-center font-mono text-sm text-[#C8F04D] shadow-2xl transition-transform group-hover:translate-y-2 z-0">WEB</div>
            </div>

          </div>
        </div>
      </section>      {/* 4. FEATURED LISTINGS GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-serif text-4xl">Featured Listings</h2>
          <a href="#" className="text-[#C8F04D] hover:underline text-sm font-mono flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, i) => (
            <motion.div custom={i} variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} key={i}>
              <motion.div whileHover={{ y: -6 }} className="h-full">
                <Card className="rounded-none border border-white/10 bg-[#111111] overflow-hidden h-full flex flex-col transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(200,240,77,0.05)]">
                  {/* Thumbnail Placeholder */}
                  <div className="h-48 w-full relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-b border-white/5 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay"></div>
                    <Bot className="w-12 h-12 text-zinc-700" />
                    <Badge className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-white rounded-none border border-white/10 font-mono text-xs backdrop-blur-md">
                      {i === 0 ? "Best Seller" : i === 1 ? "New" : "AI Agent"}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                          <AvatarFallback>CR</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-zinc-400 font-mono">Creator_{i}</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2 line-clamp-1">Automated Lead Qualification Agent</h3>
                      <p className="text-sm text-zinc-500 line-clamp-1">Connects Intercom to OpenAI to score leads.</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="font-mono text-[#C8F04D]">${(i + 1) * 29}</span>
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-zinc-400 hover:text-white hover:bg-white/5 rounded-none">
                        View details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-16">Built for velocity.</h2>
          
          <div className="flex flex-col md:flex-row justify-between relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] border-t border-dashed border-zinc-800 z-0" />
            
            {[
              { num: "01", title: "Discover", desc: "Browse vetted, ready-to-use automations." },
              { num: "02", title: "Deploy", desc: "One-click setup or instant code download." },
              { num: "03", title: "Scale", desc: "Automate your entire stack effortlessly." }
            ].map((step, i) => (
              <motion.div custom={i} variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} key={i} className="relative z-10 flex flex-col items-center mb-12 md:mb-0 bg-[#0D0D0D] px-4">
                <div className="w-24 h-24 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 font-serif text-3xl text-zinc-500">
                  {step.num}
                </div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-zinc-500 text-sm max-w-[200px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CREATOR SPOTLIGHT */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-12 border border-white/10 bg-[#111111] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8F04D]/5 blur-[100px] rounded-full" />
            <Badge className="bg-[#C8F04D] text-black hover:bg-[#C8F04D] rounded-none mb-8">Creator Spotlight</Badge>
            <Avatar className="w-20 h-20 mb-6 border border-white/20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=spotlight" />
              <AvatarFallback>CX</AvatarFallback>
            </Avatar>
            <h2 className="font-serif text-4xl mb-2">Alex Chen</h2>
            <p className="text-xl text-zinc-400 mb-6">Top Rated Systems Architect</p>
            <div className="inline-block border border-zinc-800 bg-zinc-950 px-4 py-2 font-mono text-sm text-zinc-300 mb-8">
              Earned <span className="text-[#C8F04D]">$142,000+</span> this year
            </div>
            <p className="text-zinc-500 mb-8 max-w-md">"FlowMart completely changed how I monetize my internal tools. I package up the n8n workflows I use daily, and teams pay a premium to save weeks of setup time."</p>
            <Button className="bg-transparent border border-[#C8F04D] text-[#C8F04D] hover:bg-[#C8F04D] hover:text-black rounded-none h-12 px-8">
              Become a Seller <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-sm text-zinc-500 uppercase tracking-widest mb-4">Top Listings from Alex</h3>
            {[1, 2, 3].map((i) => (
              <motion.div key={i} custom={i} variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="rounded-none border border-white/10 bg-transparent hover:bg-[#111111] transition-colors cursor-pointer group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-[#C8F04D]/30 transition-colors">
                        <ArrowLeftRight className="w-5 h-5 text-zinc-500 group-hover:text-[#C8F04D]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Advanced CRM Sync Agent</h4>
                        <p className="text-xs text-zinc-500">n8n • 14 nodes</p>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-white">${i * 49}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STATS BAR */}
      <section className="border-y border-white/10 bg-[#C8F04D] text-black">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10 divide-y md:divide-y-0 border-black/10">
          {[
            { value: 12400, label: "Automations", prefix: "", suffix: "+" },
            { value: 3200, label: "Active Creators", prefix: "", suffix: "+" },
            { value: 4.2, label: "Paid Out", prefix: "$", suffix: "M" },
            { value: 98, label: "Satisfaction", prefix: "", suffix: "%" }
          ].map((stat, i) => (
            <div key={i} className="py-12 px-6 flex flex-col items-center justify-center text-center">
              <div className="font-serif text-5xl md:text-6xl mb-2 tracking-tight">
                {stat.prefix}
                <AnimatedCounter from={0} to={stat.value} duration={2} />
                {stat.suffix}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest opacity-70 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl text-center mb-16">Trusted by builders.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "Found an AI agent that handles our tier-1 support natively in Zendesk. Saved us $40k/yr in tooling.", name: "Sarah J.", role: "CTO, FinTech Startup" },
            { quote: "The quality bar here is insane. You don't just buy a script, you buy a fully documented, robust system.", name: "Mark D.", role: "Lead Engineer" },
            { quote: "I sell my Notion+Make workflows here. The audience is highly targeted and ready to deploy.", name: "Elena V.", role: "Indie Hacker" }
          ].map((test, i) => (
            <motion.div custom={i} variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} key={i}>
              <Card className="rounded-none border border-white/10 bg-[#0A0A0A] h-full">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#C8F04D] text-[#C8F04D]" />)}
                  </div>
                  <p className="text-zinc-300 text-lg mb-8 leading-relaxed">"{test.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{test.name}</p>
                      <p className="text-xs text-zinc-500 font-mono">{test.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. PRICING */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">Simple, transparent pricing.</h2>
          <p className="text-zinc-400">Buy automations individually, or subscribe to sell.</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Buyer", price: "Free", desc: "For exploring and buying.", features: ["Browse marketplace", "Purchase securely", "Community access", "Standard support"] },
            { name: "Creator Pro", price: "$19", suffix: "/mo", desc: "For selling your automations.", features: ["Sell unlimited items", "95% revenue share", "Analytics dashboard", "Priority support"], highlight: true },
            { name: "Team", price: "$49", suffix: "/mo", desc: "For agencies and teams.", features: ["Everything in Pro", "Multi-seat management", "White-label options", "API Access"] }
          ].map((plan, i) => (
            <motion.div custom={i} variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} key={i}>
              <Card className={`rounded-none bg-[#0A0A0A] h-full relative ${plan.highlight ? 'border-[#C8F04D]' : 'border-white/10'}`}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C8F04D] text-black font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                  <p className="text-zinc-500 text-sm mb-6">{plan.desc}</p>
                  <div className="mb-8 border-b border-white/5 pb-8">
                    <span className="font-serif text-4xl">{plan.price}</span>
                    <span className="text-zinc-500 font-mono">{plan.suffix}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                        <div className={`w-1.5 h-1.5 rounded-full ${plan.highlight ? 'bg-[#C8F04D]' : 'bg-zinc-600'}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full rounded-none h-12 ${plan.highlight ? 'bg-[#C8F04D] text-black hover:bg-[#b0d83a]' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="relative py-40 px-6 overflow-hidden flex flex-col items-center justify-center text-center min-h-[60vh]">
        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8F04D] rounded-full blur-[150px] opacity-5 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1]">
            Start selling your <br/> automations today.
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
            Join the premier marketplace for AI agents, workflows, and tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="name@email.com" 
              className="rounded-none border-zinc-700 bg-zinc-900/50 h-12 px-4 focus-visible:ring-[#C8F04D] focus-visible:ring-1 focus-visible:border-[#C8F04D] text-white"
            />
            <Button className="bg-[#C8F04D] text-black hover:bg-[#b0d83a] rounded-none h-12 px-8 font-medium shrink-0">
              Join Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t border-white/10 bg-[#0A0A0A] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-4 bg-[#C8F04D]" />
              <span className="font-serif text-xl tracking-wide text-white">FlowMart</span>
            </div>
            <p className="text-zinc-500 max-w-xs text-sm">
              The marketplace for AI builders. Buy, sell, and deploy automations that actually work.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12 mt-12 md:mt-0">
            <div>
              <h4 className="font-mono text-white text-sm mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-[#C8F04D] transition-colors">Explore</a></li>
                <li><a href="#" className="hover:text-[#C8F04D] transition-colors">Become a Seller</a></li>
                <li><a href="#" className="hover:text-[#C8F04D] transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-white text-sm mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-[#C8F04D] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#C8F04D] transition-colors">Creator Guide</a></li>
                <li><a href="#" className="hover:text-[#C8F04D] transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-zinc-600 font-mono">
          <p>© {new Date().getFullYear()} FlowMart. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Made for builders by builders</p>
        </div>
      </footer>
    </div>
  );
}
