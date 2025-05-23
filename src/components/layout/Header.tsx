
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'; // Added SheetTitle
import { Menu, CodeXml, Sun, Moon } from 'lucide-react';
import { developerName } from '@/lib/data';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils';

const navItems = [
  
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#about', label: 'About' },
  // { href: '#certifications', label: 'Certifications' },
  // { href: '#github-activity', label: 'GitHub' },
  // { href: '#testimonials', label: 'Testimonials' },
  // { href: '#contact', label: 'Contact' },
  // { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'py-3 bg-background/90 shadow-lg backdrop-blur-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center space-x-2 font-bold text-primary hover:text-accent transition-all duration-500 ease-in-out ${
              isScrolled ? 'text-2xl' : 'text-3xl'
            }`}
          >
            <CodeXml
              className={`transition-all duration-500 ease-in-out ${
                isScrolled ? 'h-7 w-7' : 'h-9 w-9'
              }`}
            />
            <span>
              {developerName.split(' ')[0]}
              <span className="text-accent">{developerName.split(' ')[1]}</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                asChild
                className={cn(
                  `text-foreground hover:bg-accent/10 hover:text-accent transition-colors nav-link-wavy ${
                    isScrolled ? 'text-sm lg:text-base py-1 px-2' : 'text-base lg:text-lg py-2 px-3'
                  }`
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme"
              className={`text-foreground hover:bg-accent/10 hover:text-accent transition-all duration-500 ease-in-out ${
                isScrolled ? 'h-9 w-9' : 'h-10 w-10'
              }`}
            >
              {theme === 'light' ?
                <Moon className={`transition-all duration-500 ease-in-out ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} /> :
                <Sun className={`transition-all duration-500 ease-in-out ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
              }
            </Button>
          </nav>

          <div className="md:hidden flex items-center space-x-2">
             <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme"
               className={`text-primary hover:bg-accent/10 hover:text-accent transition-all duration-500 ease-in-out ${
                 isScrolled ? 'h-9 w-9' : 'h-10 w-10'
               }`}
             >
              {theme === 'light' ?
                <Moon className={`transition-all duration-500 ease-in-out ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} /> :
                <Sun className={`transition-all duration-500 ease-in-out ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
              }
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"
                  className={`transition-all duration-500 ease-in-out ${isScrolled ? 'h-9 w-9' : 'h-10 w-10'}`}
                >
                  <Menu className={`text-primary transition-all duration-500 ease-in-out ${isScrolled ? 'h-6 w-6' : 'h-7 w-7'}`} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background p-6">
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle> 
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      asChild
                      className={cn(
                        "text-lg text-foreground hover:bg-accent/10 hover:text-accent justify-start nav-link-wavy"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
