"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"

type NavSubItem = { name: string; href: string }
type NavDropdownItem = { name: string; href: string; items?: NavSubItem[] }
type NavItem =
  | { name: string; href: string; dropdown?: true; items?: NavDropdownItem[] }
  | { name: string; href: string; dropdown?: false }

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const isRTL = language === "ar"

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const navItems: NavItem[] = [
    { name: t("nav.home") as string, href: "/" },
    { name: t("nav.about") as string, href: "/about" },
    {
      name: t("nav.programs") as string,
      href: "/programs",
      dropdown: true,
      items: [
        {
          name: t("nav.programs.undergraduate") as string,
          href: "/programs#undergraduate-scholarships",
          items: [
            { name: t("programs.pulse.title") as string, href: "/programs/pulse-of-life" },
            { name: t("programs.talented.title") as string, href: "/programs/palestinian-talented" },
          ],
        },
        {
          name: t("nav.programs.graduate") as string,
          href: "/programs#graduate-scholarships",
          items: [
            { name: t("sustainability.title") as string, href: "/programs/sustainability" },
            { name: t("justice.title") as string, href: "/programs/justice-for-palestine" },
            { name: t("ibn-khaldun.title") as string, href: "/programs/ibn-khaldun" },
          ],
        },
      ],
    },
    { name: t("nav.educational.environment") as string, href: "/educational-environment" },
    {
      name: t("nav.media") as string,
      href: "/media",
      dropdown: true,
      items: [
        { name: t("nav.news") as string, href: "/news" },
        { name: t("nav.media.success") as string, href: "/success-stories" },
        { name: t("nav.media.activities") as string, href: "/activities" },
        {
          name: t("nav.media.testimonials") as string,
          href: "/testimonials",
          items: [
            { name: t("testimonials.student_voices") as string, href: "/testimonials?type=students" },
            { name: t("testimonials.public_figures") as string, href: "/testimonials?type=influencers" },
          ],
        },
      ],
    },
    { name: t("nav.contact") as string, href: "/contact" },
  ]

  const DonateButton = ({ className }: { className?: string }) => (
    <NavbarButton
      href="/donate"
      className={`bg-[#34a853] text-white shadow-md hover:bg-[#2d9249] text-xs sm:text-sm leading-tight px-3 py-2 h-10 whitespace-nowrap ${className ?? ""}`}
      variant="dark"
    >
      {t("nav.donate")}
    </NavbarButton>
  )

  const handleCloseMobile = () => setIsMobileMenuOpen(false)

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX: 0 }} initial={{ scaleX: 0 }} />
      <Navbar className="fixed inset-x-0 top-0 z-50 px-2 sm:px-3 pt-3 pb-2" dir={isRTL ? "rtl" : "ltr"}>
        {isDesktop && (
          <NavBody className="rounded-2xl px-3 sm:px-4 py-3 flex items-center gap-3 lg:gap-5 flex-nowrap">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/logo.png" alt="ifpps logo" width={52} height={52} className="h-11 w-11" priority />
              <span className="text-base sm:text-lg font-semibold text-black whitespace-nowrap">IFPSS</span>
            </Link>

            <nav
              className={`hidden lg:flex flex-1 items-center justify-center gap-3 lg:gap-4 whitespace-nowrap ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {navItems.map((item) =>
                "dropdown" in item && item.dropdown ? (
                  <NavigationMenu key={item.href}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-[13px] lg:text-[14px] font-medium bg-transparent hover:bg-transparent text-black hover:text-[#34a853] px-3 py-2 whitespace-nowrap leading-tight">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            {item.items?.map((dropdownItem) => (
                              <li key={dropdownItem.href} className="row-span-3">
                                {dropdownItem.items ? (
                                  <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none">
                                    <div className="text-[15px] font-medium leading-none mb-2 text-black">
                                      {dropdownItem.name}
                                    </div>
                                    <div className="mt-2 space-y-1">
                                      {dropdownItem.items.map((subItem) => (
                                        <Link
                                          key={subItem.href}
                                          href={subItem.href}
                                          className="block text-[14px] text-black hover:text-[#34a853] pl-2 py-1.5 rounded-md whitespace-nowrap"
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
                                    <div className="text-[14px] lg:text-[15px] font-medium leading-none text-black hover:text-[#34a853]">
                                      {dropdownItem.name}
                                    </div>
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
                    className="text-[13px] lg:text-[14px] font-medium transition-colors text-black hover:text-[#34a853] px-3 py-2 whitespace-nowrap leading-tight"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-2 lg:gap-3 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 whitespace-nowrap"
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              >
                <span className="text-sm font-medium">{language === "ar" ? "EN" : "AR"}</span>
                <span className="sr-only">Change language</span>
              </Button>
              <DonateButton className="hidden lg:inline-flex whitespace-nowrap" />
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </NavBody>
        )}

        {!isDesktop && (
          <MobileNav className="rounded-2xl px-2">
            <MobileNavHeader className="gap-3">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="ifpps logo" width={48} height={48} className="h-12 w-12" priority />
                <span className="text-base font-semibold text-black">IFPSS</span>
              </Link>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                >
                  <span className="text-sm font-medium">{language === "ar" ? "EN" : "AR"}</span>
                  <span className="sr-only">Change language</span>
                </Button>
                <DonateButton className="hidden sm:inline-flex" />
                <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((prev) => !prev)} />
              </div>
            </MobileNavHeader>
            <MobileNavMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobile}>
              <div className="flex flex-col gap-4">
                {navItems.map((item) =>
                  "dropdown" in item && item.dropdown ? (
                    <div key={item.href} className="space-y-3">
                      <div className="text-base font-semibold text-black">{item.name}</div>
                      <div className="pl-2 space-y-3">
                        {item.items?.map((dropdownItem) => (
                          <div key={dropdownItem.href} className="space-y-2">
                            {dropdownItem.items ? (
                              <>
                                <div className="text-sm font-medium">{dropdownItem.name}</div>
                                <div className="pl-3 space-y-1.5">
                                  {dropdownItem.items.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className="block text-sm text-black hover:text-[#34a853]"
                                      onClick={handleCloseMobile}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <Link
                                href={dropdownItem.href}
                                className="block text-sm text-black hover:text-[#34a853]"
                                onClick={handleCloseMobile}
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
                      className="text-base font-medium text-black hover:text-[#34a853]"
                      onClick={handleCloseMobile}
                    >
                      {item.name}
                    </Link>
                  )
                )}
                <DonateButton className="w-full justify-center" />
              </div>
            </MobileNavMenu>
          </MobileNav>
        )}
      </Navbar>
    </>
  )
}
