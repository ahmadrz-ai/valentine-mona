import React, { useState, useEffect, useRef } from 'react';
import { Heart, Volume2, VolumeX, Camera, X, Play, Stars, Sparkles } from 'lucide-react';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const [yesPressed, setYesPressed] = useState(false);
    const [typedText, setTypedText] = useState('');

    // RUDE / SASSY POETRY (The "I'm the prize" vibe)
    const fullMessage = "Suno, zyada nakhre mat dikhao. I know I'm your favorite notification. Tumhari har smile pe sirf mera copyright hai. You are the only masterpiece I never want to change. Chup chap haan kardo. Will you be my Valentine?";

    // Typewriter effect
    useEffect(() => {
        if (isOpen && !showGallery && typedText.length < fullMessage.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullMessage.slice(0, typedText.length + 1));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, showGallery, typedText]);

    // Handle "No" button escape logic - Mobile Optimized
    // Now triggers on Hover, Touch, AND Click
    const moveNoButton = () => {
        const x = Math.random() * 150 - 75;
        const y = Math.random() * 150 - 75;
        setNoBtnPos({ x, y });
    };

    const handleOpen = () => {
        setIsOpen(true);
        setIsMuted(false);
    };

    // Floating Hearts & Sparkles Background
    const FloatingElements = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute opacity-20 animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${6 + Math.random() * 10}s`,
                        fontSize: `${10 + Math.random() * 20}px`,
                        color: i % 2 === 0 ? '#fda4af' : '#f472b6' // Pink & Rose colors
                    }}
                >
                    {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '✨' : '🌸'}
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-rose-950 via-slate-900 to-rose-950 text-white font-sans overflow-x-hidden relative selection:bg-rose-500 selection:text-white">

            {/* YOUTUBE PLAYER - FIXED 
          Swapped to ID: oIiGq7l71EI (Lyric Video) to bypass T-Series Embed Block
          Start time: 73 seconds (1:13)
      */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-px h-px opacity-0 pointer-events-none z-0">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/oIiGq7l71EI?start=73&autoplay=1&controls=0&loop=1&playlist=oIiGq7l71EI&enablejsapi=1&mute=${isMuted ? '1' : '0'}&playsinline=1`}
                        title="Background Music"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {/* Music Control - Top Right */}
            {isOpen && (
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10 active:scale-95 shadow-lg"
                >
                    {isMuted ? <VolumeX size={20} className="text-gray-400" /> : <Volume2 size={20} className="text-rose-200 animate-pulse" />}
                </button>
            )}

            {/* Animated Background */}
            <FloatingElements />

            {/* Main Content Area */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6 w-full max-w-screen-xl mx-auto">

                {!isOpen ? (
                    /* INTRO SCREEN */
                    <div className="text-center space-y-8 animate-fade-in-up w-full max-w-xs mx-auto">
                        <div className="relative group cursor-pointer touch-manipulation" onClick={handleOpen}>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                            {/* Card */}
                            <div className="relative bg-gradient-to-br from-rose-500 to-purple-600 p-0.5 rounded-3xl shadow-2xl transform active:scale-95 transition-transform duration-300">
                                <div className="bg-slate-900 rounded-[22px] p-8 flex flex-col items-center justify-center border border-white/10 h-72">
                                    <div className="relative">
                                        <Heart size={64} className="text-rose-400 animate-pulse mb-6" fill="currentColor" />
                                        <Sparkles className="absolute -top-2 -right-4 text-yellow-200 animate-spin-slow" size={24} />
                                    </div>
                                    <h1 className="text-2xl font-light tracking-widest text-white mb-3">FOR MONA</h1>
                                    <div className="flex items-center gap-2 text-rose-200/60 text-xs tracking-widest uppercase mt-4 border px-4 py-2 rounded-full border-rose-500/30">
                                        <Play size={10} fill="currentColor" /> Tap to Open
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : !showGallery ? (
                    /* MESSAGE & PROPOSAL SCREEN */
                    <div className="max-w-xl w-full text-center space-y-6 animate-fade-in px-2">

                        {/* Typewriter Text Card */}
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl min-h-[220px] flex items-center justify-center relative overflow-hidden">
                            {/* Decorative Gradient Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50"></div>

                            <p className="text-lg md:text-2xl font-light leading-relaxed text-rose-50 italic">
                                "{typedText}"
                                <span className="animate-blink not-italic ml-1 text-rose-400">|</span>
                            </p>
                        </div>

                        {/* Interaction Buttons */}
                        {!yesPressed ? (
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-8 w-full relative h-32 md:h-auto">
                                {/* YES BUTTON - RESTORED OLD TEXT */}
                                <button
                                    onClick={() => setYesPressed(true)}
                                    className="w-full md:w-auto z-20 group relative px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 active:scale-95 rounded-full text-lg font-medium transition-all md:hover:scale-110 flex items-center justify-center gap-3 overflow-hidden shadow-lg shadow-rose-900/50"
                                >
                                    <span className="relative z-10 text-white">Yes, obviously!</span>
                                    <Heart className="group-hover:fill-current relative z-10 transition-colors" size={20} />
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>

                                {/* NO BUTTON - RESTORED OLD TEXT */}
                                <button
                                    onMouseEnter={moveNoButton}
                                    onTouchStart={moveNoButton}
                                    onClick={moveNoButton}
                                    style={{
                                        transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)`,
                                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    }}
                                    className="w-full md:w-auto absolute md:static top-20 md:top-auto px-8 py-4 bg-slate-800 text-slate-400 rounded-full text-lg font-medium border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
                                >
                                    No way
                                </button>
                            </div>
                        ) : (
                            /* SUCCESS STATE */
                            <div className="animate-pop-in space-y-6 py-8">
                                <div className="relative inline-block">
                                    <div className="text-6xl md:text-8xl mb-6 animate-bounce">🙈🌹🥰</div>
                                    <Sparkles className="absolute -top-4 -right-8 text-yellow-300 animate-pulse" size={40} />
                                </div>

                                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400 drop-shadow-sm">
                                    I KNEW IT!
                                </h2>

                                <p className="text-slate-300 text-lg font-light">
                                    Maan gayi! See you on the 14th.
                                </p>

                                <button
                                    onClick={() => setShowGallery(true)}
                                    className="inline-block mt-8 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 border border-white/10 transition-all text-sm uppercase tracking-wider hover:tracking-widest duration-300"
                                >
                                    View Our Memories &rarr;
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* GALLERY SCREEN */
                    <div className="w-full max-w-4xl animate-fade-in relative pb-20">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 sticky top-0 bg-rose-950/90 backdrop-blur-md p-4 -mx-4 z-30 md:static md:bg-transparent md:p-0 rounded-b-2xl md:rounded-none border-b border-white/5 md:border-none">
                            <h2 className="text-xl md:text-2xl font-light text-rose-200">Our Highlights</h2>
                            <button
                                onClick={() => setShowGallery(false)}
                                className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors p-2 bg-white/5 rounded-full"
                            >
                                <X size={20} /> <span className="hidden md:inline text-sm">Back</span>
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2">
                            {[
                                { img: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&auto=format&fit=crop&q=80", text: "The first date" },
                                { img: "https://images.unsplash.com/photo-1621112904887-419379ce6824?w=600&auto=format&fit=crop&q=80", text: "Endless laughter" },
                                { img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&auto=format&fit=crop&q=80", text: "My Sukoon" }
                            ].map((item, idx) => (
                                <div key={idx} className="group relative aspect-[4/5] bg-slate-800 rounded-2xl overflow-hidden shadow-2xl transform hover:rotate-1 transition-all duration-300">
                                    <img src={item.img} alt={item.text} className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <p className="text-white font-medium text-lg tracking-wide">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Loading Indicator */}
                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-rose-500/10 text-rose-300 rounded-full border border-rose-500/20 backdrop-blur-sm animate-pulse">
                                <Camera size={18} />
                                <span className="text-sm font-medium">Making more memories...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.4; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-pop-in {
          animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
};

export default App;
