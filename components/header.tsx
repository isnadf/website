"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, GraduationCap, Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import Image from "next/image"

// Define a type for nav items

type NavSubItem = { name: string; href: string };
type NavDropdownItem = { name: string; href: string; items?: NavSubItem[] };
type NavItem = { name: string; href: string; dropdown?: true; items?: NavDropdownItem[] } | { name: string; href: string; dropdown?: false };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems: NavItem[] = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    {
      name: t("nav.programs"),
      href: "/programs",
      dropdown: true,
      items: [
        {
          name: "Undergraduate Scholarships",
          href: "/programs#undergraduate-scholarships",
          items: [
            { name: "Pulse of Life Scholarship", href: "/programs/pulse-of-life" },
            { name: "Palestinian Talented Scholarship", href: "/programs/palestinian-talented" }
          ]
        },
        {
          name: "Graduate Scholarships",
          href: "/programs#graduate-scholarships",
          items: [
            { name: "Sustainability Scholarship", href: "/programs/sustainability" },
            { name: "Justice for Palestine Program", href: "/programs/justice-for-palestine" },
            { name: "Ibn Khaldun Scholarship Program", href: "/programs/ibn-khaldun" }
          ]
        }
      ]
    },
    {
      name: t("nav.media"),
      href: "/media",
      dropdown: true,
      items: [
        { name: t("nav.news"), href: "/news" },
        { name: t("nav.media.success"), href: "/success-stories" },
        { name: t("nav.media.activities"), href: "/activities" },
        { 
          name: t("nav.media.testimonials"),
          href: "/testimonials",
          items: [
            { name: "Students", href: "/testimonials?type=students" },
            { name: "Influencers", href: "/testimonials?type=influencers" }
          ]
        }
      ]
    },
    { name: t("nav.contact"), href: "/contact" },
  ];

  // Check if we're on the activities page
  const isActivitiesPage = pathname.includes('/activities')

  // Special donation button component
  const DonateButton = () => (
    <Link
      href="/donate"
      className="hidden lg:flex items-center justify-center px-6 py-2 rounded-full bg-[#34a853] text-white font-medium hover:bg-[#2d9249] transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      {t("nav.donate")}
    </Link>
  );

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX: 0 }} initial={{ scaleX: 0 }} />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white dark:bg-background backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <Link href="/" className="flex items-center z-50 pl-4 sm:pl-6 lg:pl-8">
            <Image
              src="/logo.png"
              alt="ifpps logo"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mt-2 sm:mt-3 md:mt-4"
              width={80}
              height={80}
              priority
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold ml-2 text-black">
              IFPPS
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 px-4 sm:px-6 lg:px-8">
            {navItems.map((item) => (
              (item as any).dropdown ? (
                <NavigationMenu key={item.href}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className="text-[15px] font-medium transition-colors bg-transparent hover:bg-transparent text-black hover:text-[#34a853] px-3 py-2"
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                          {(item as NavItem & { items?: NavDropdownItem[] }).items?.map((dropdownItem) => (
                            <li key={dropdownItem.href} className="row-span-3">
                              {dropdownItem.items ? (
                                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none">
                                  <div className="text-[15px] font-medium leading-none mb-2 text-black">{dropdownItem.name}</div>
                                  <div className="mt-2 space-y-1">
                                    {dropdownItem.items.map((subItem: NavSubItem) => (
                                      <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        className="block text-[14px] text-black hover:text-[#34a853] pl-2 py-1.5 rounded-md"
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  href={dropdownItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                                >
                                  <div className="text-[15px] font-medium leading-none text-black hover:text-[#34a853]">{dropdownItem.name}</div>
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] font-medium transition-colors text-black hover:text-[#34a853] px-3 py-2"
                >
                  {item.name}
                </Link>
              )
            ))}
            <DonateButton />
          </nav>

          <div className="flex items-center gap-3 pr-4 sm:pr-6 lg:pr-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                >
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  <span className={language === "en" ? "font-bold" : ""}>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar")}>
                  <span className={language === "ar" ? "font-bold" : ""}>العربية</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button> */}

            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] bg-white dark:bg-background z-40 lg:hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  (item as any).dropdown ? (
                    <div key={item.href} className="space-y-3">
                      <div className="text-[15px] font-medium text-black">{item.name}</div>
                      <div className="pl-4 space-y-4">
                        {(item as NavItem & { items?: NavDropdownItem[] }).items?.map((dropdownItem) => (
                          <div key={dropdownItem.href} className="space-y-3">
                            {dropdownItem.items ? (
                              <>
                                <div className="text-[15px] font-medium text-black">
                                  {dropdownItem.name}
                                </div>
                                <div className="pl-4 space-y-2">
                                  {dropdownItem.items.map((subItem: NavSubItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className="block text-[14px] text-black hover:text-[#34a853] py-1.5"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <Link
                                href={dropdownItem.href}
                                className="block text-[15px] font-medium text-black hover:text-[#34a853] py-1.5"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {dropdownItem.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-[15px] font-medium transition-colors text-black hover:text-[#34a853] py-1.5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                {/* Add donation button to mobile menu */}
                <Link
                  href="/donate"
                  className="w-full flex items-center justify-center px-6 py-3 rounded-full bg-[#34a853] text-white font-medium hover:bg-[#2d9249] transition-colors duration-200 shadow-md hover:shadow-lg mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.donate")}
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

