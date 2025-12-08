import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {

    const { user } = useSelector(state => state.auth)

    const [menuOpen, setMenuOpen] = React.useState(false);



    return (
        <>
            <div className="pb-20 overflow-hidden relative">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <a href="https://prebuiltui.com">
                        <img src="/logo.svg" alt="logo" className="h-10 w-auto brightness-200" />
                    </a>

                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-300">
                        <a href="#" className="hover:text-violet-400 transition">Home</a>
                        <a href="#features" className="hover:text-violet-400 transition">Features</a>
                        <a href="#cta" className="hover:text-violet-400 transition">Contact</a>
                    </div>

                    <div className="flex gap-2">
                        <Link to='/app?state=register' className="hidden md:block px-6 py-2 glass-button hover:bg-violet-700 active:scale-95 transition-all rounded-full text-white" hidden={user}>
                            Get started
                        </Link>
                        <Link to='/app?state=login' className="hidden md:block px-6 py-2 glass-button-secondary active:scale-95 hover:bg-slate-800 transition-all rounded-full text-slate-200 hover:text-white" hidden={user}>
                            Login
                        </Link>
                        <Link to='/app' className='hidden md:block px-8 py-2 glass-button hover:bg-violet-700 active:scale-95 transition-all rounded-full text-white' hidden={!user}>
                            Dashboard
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition text-white" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-slate-900/90 text-white backdrop-blur-xl flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                    <a href="#" className="text-white hover:text-violet-400">Home</a>
                    <a href="#features" className="text-white hover:text-violet-400">Features</a>
                    <a href="#contact" className="text-white hover:text-violet-400">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-violet-600 hover:bg-violet-700 transition text-white rounded-md flex" >
                        X
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-slate-100">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-violet-600 blur-[150px] opacity-20"></div>
                    <div className="absolute bottom-0 -z-10 right-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-fuchsia-600 blur-[150px] opacity-20"></div>

                    {/* Avatars + Stars */}
                    <div className="flex items-center mt-24">
                        <div className="flex -space-x-3 pr-3">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-slate-900 hover:-translate-y-0.5 transition z-[1]" />
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-slate-900 hover:-translate-y-0.5 transition z-2" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-slate-900 hover:-translate-y-0.5 transition z-[3]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-slate-900 hover:-translate-y-0.5 transition z-[4]" />
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-slate-900 hover:-translate-y-0.5 transition z-[5]" />
                        </div>

                        <div>
                            <div className="flex ">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-amber-400" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                ))}
                            </div>
                            <p className="text-sm text-slate-400">
                                Used by 10,000+ users
                            </p>
                        </div>
                    </div>

                    {/* Headline + CTA */}
                    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px] text-white tracking-tight">
                        Land your dream job with <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent text-nowrap">AI-powered </span> resumes.
                    </h1>

                    <p className="max-w-md text-center text-lg text-slate-400 my-7">Create, edit and download professional resumes with AI-powered assistance.</p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 ">
                        <Link to='/app' className="glass-button rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-violet-500/50 flex items-center transition-colors">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                        <button className="flex items-center gap-2 border border-slate-600 hover:bg-slate-800 transition rounded-full px-7 h-12 text-slate-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video size-5" aria-hidden="true"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                            <span>Try demo</span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Hero
