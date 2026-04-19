'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Star, ChevronRight, Navigation, QrCode } from 'lucide-react';
import Image from 'next/image';

const RESTAURANTS = [
  {
    id: 1,
    name: "Da Luna Restaurant",
    type: "Fine Italian Dining",
    rating: 4.8,
    reviews: "1.2k",
    distance: "1.2 km away",
    offer: "15% OFF Your Entire Bill",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
    description: "Authentic Italian pastas and wood-fired pizzas in Candolim's most romantic setting."
  },
  {
    id: 2,
    name: "Fisherman's Wharf",
    type: "Goan Seafood Specialty",
    rating: 4.6,
    reviews: "840",
    distance: "2.4 km away",
    offer: "Complimentary Dessert",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=80",
    description: "The ultimate destination for riverfront dining and incredible Goan thalis."
  },
  {
    id: 3,
    name: "Souza Lobo",
    type: "Beachfront Heritage",
    rating: 4.5,
    reviews: "2.1k",
    distance: "3.1 km away",
    offer: "Priority Seating + 10% OFF",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
    description: "Generations of secret recipes served right on the Calangute beach."
  },
  {
    id: 4,
    name: "Olive Bar & Kitchen",
    type: "Mediterranean",
    rating: 4.9,
    reviews: "3.4k",
    distance: "5.5 km away",
    offer: "Free Signature Cocktail",
    image: "https://images.unsplash.com/photo-1544025162-831ab00a98ed?auto=format&fit=crop&w=1200&q=80",
    description: "Cliffside views, sun-drenched Mediterranean vibes, and exquisite culinary art."
  }
];

const FLOATING_FOOD = [
  { src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80", size: 180, top: "5%", left: "5%", delay: 0 },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80", size: 240, top: "25%", left: "80%", delay: 2 },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80", size: 160, top: "60%", left: "10%", delay: 1 },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", size: 200, top: "15%", left: "55%", delay: 3 },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80", size: 280, top: "75%", left: "75%", delay: 1.5 },
  { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80", size: 150, top: "85%", left: "20%", delay: 2.5 },
];

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="min-h-screen relative w-full">
      <FloatingFoods />

      {/* Navigation (Transparent) */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black font-serif font-bold text-3xl">V</div>
            <span className="font-serif font-semibold text-2xl tracking-tight text-white">Exclusive</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm font-medium tracking-widest uppercase mb-[2px]">
            <QrCode className="w-4 h-4" /> Guest Access Verified
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-40 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-semibold tracking-widest uppercase mb-8 backdrop-blur-md">
            <Star className="w-4 h-4" /> VIP Access Unlocked
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-[1.1] mb-6 drop-shadow-2xl">
             Taste the Best <br/> of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 italic">Goa.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-light">
            You've arrived. Browse our curated list of elite dining destinations and present this screen to claim your exclusive benefits.
          </p>
        </motion.div>

        <div className="space-y-16 lg:space-y-32">
           {RESTAURANTS.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
        </div>
      </main>
    </div>
  );
}

// --- Components ---

function FloatingFoods() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {FLOATING_FOOD.map((food, i) => (
        <FloatingFoodItem key={i} food={food} index={i} scrollY={scrollY} />
      ))}
      
      {/* Ambient lighting spots to make it cinematic */}
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]" />
      <div className="absolute top-[50%] left-[-10%] w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[150px]" />
    </div>
  )
}

function FloatingFoodItem({ food, index, scrollY }: { food: any, index: number, scrollY: any }) {
  const parallaxY = useTransform(scrollY, (value: any) => value * -0.3 * (index % 2 === 0 ? 1 : 1.5));
  
  return (
    <motion.div
      className="absolute rounded-full overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] opacity-40 md:opacity-60"
      style={{
         width: food.size,
         height: food.size,
         top: food.top,
         left: food.left,
         y: parallaxY,
         boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8), 0 30px 60px rgba(0,0,0,0.9)',
      }}
      animate={{
         y: ["0px", "-40px", "0px"],
         rotateX: [0, 15, -10, 0],
         rotateY: [0, -15, 10, 0],
         rotateZ: [0, 20, 0],
      }}
      transition={{
         duration: 20 + index * 5,
         repeat: Infinity,
         ease: "easeInOut",
         delay: food.delay
      }}
    >
       <Image src={food.src} alt="Dish" fill className="object-cover scale-110" />
       <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
       <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/90 via-transparent to-white/20 mix-blend-overlay" />
    </motion.div>
  )
}

function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rY = ((mouseX / width) - 0.5) * 20;
    const rX = ((mouseY / height) - 0.5) * -20;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

function RestaurantCard({ restaurant, index }: { restaurant: any, index: number }) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.5 0.5"] // Start when top of element hits bottom of screen, end when centers align
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y, perspective: 2000 }}
      className="relative z-10 w-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 350, damping: 40, mass: 0.5 }}
        className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-[3rem] p-6 md:p-10 flex flex-col md:flex-row gap-8 lg:gap-16 items-center cursor-pointer transform-gpu shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Background Image Parallax effect on hover */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem]">
           <motion.div 
             className="w-full h-full"
             animate={{ x: rotateY * -1.5, y: rotateX * 1.5 }}
             transition={{ type: "spring", stiffness: 300, damping: 30 }}
           >
              <Image 
                src={restaurant.image} 
                alt={restaurant.name} 
                fill 
                className="object-cover opacity-20 md:opacity-30 group-hover:opacity-40 transition-opacity duration-1000 blur-md group-hover:blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:bg-gradient-to-r" />
           </motion.div>
        </div>

        {/* Content Side */}
        <div className="relative z-10 flex-1 w-full flex flex-col justify-center" style={{ transform: 'translateZ(60px)' }}>
          <div className="flex flex-wrap items-center gap-3 mb-6">
             <span className="bg-amber-500/10 text-amber-400 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-500/20">
               {restaurant.type}
             </span>
             <span className="flex items-center gap-1.5 text-sm font-medium text-slate-300">
               <MapPin className="w-4 h-4 text-emerald-400" /> {restaurant.distance}
             </span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-serif text-white mb-4 drop-shadow-lg">
            {restaurant.name}
          </h2>

          <p className="text-slate-300 text-lg lg:text-xl mb-8 leading-relaxed font-light">
            {restaurant.description}
          </p>

          <div className="flex items-center gap-6 mb-10">
             <div className="flex items-center text-amber-400 font-bold text-xl gap-1.5 bg-amber-400/5 px-4 py-2 rounded-xl border border-amber-400/10">
                <Star className="w-5 h-5 fill-amber-400" /> {restaurant.rating} 
                <span className="text-amber-400/60 ml-2 font-medium text-base">({restaurant.reviews} reviews)</span>
             </div>
          </div>

          {/* Offer Banner */}
          <div 
            className="relative p-[1px] rounded-2xl overflow-hidden group/offer"
            style={{ transform: 'translateZ(30px)' }}
          >
             {/* Animated border gradient */}
             <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500 bg-[length:200%_auto] animate-[pulse_3s_linear_infinite]" />
             
             <div className="relative bg-[#0a0a0a] rounded-[15px] p-5 lg:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/offer:translate-x-full transition-transform duration-1000" />
                
                <div className="text-center sm:text-left z-10">
                   <p className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-2 justify-center sm:justify-start">
                     <span className="w-2 h-2 rounded-full bg-amber-500 animate-[ping_2s_ease-in-out_infinite]" /> V Exclusive Benefit
                   </p>
                   <p className="text-2xl text-white font-serif">{restaurant.offer}</p>
                </div>

                <button className="z-10 w-full sm:w-auto bg-amber-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] group-hover:scale-105 duration-300">
                   Visit & Claim <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
        </div>

        {/* 3D Image Side */}
        <div 
           className="relative z-10 w-full md:w-[45%] lg:w-[450px] shrink-0 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-4 border-white/5" 
           style={{ transform: 'translateZ(100px)' }}
        >
            <Image 
              src={restaurant.image} 
              alt={restaurant.name} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute bottom-6 right-6 bg-white text-black rounded-full p-4 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-2xl flex items-center gap-2 font-bold pr-6">
               <Navigation className="w-5 h-5" /> <span>Navigate</span>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
