"use client"

import ProgramDonationPage from "@/components/program-donation-page"
import { useLanguage } from "@/components/language-provider"

export default function IbnKhaldunDonatePage() {
  const { t } = useLanguage()

  return (
    <ProgramDonationPage
      heroImage="/educationalenvironment/p2.jpg"
      portraitImage1="/work/1.jpeg"
      portraitImage2="/work/2.jpeg"
      organizerName="ISNAD Foundation"
      organizerLogo="/logo.png"
      programTitle={t("donate.ibn-khaldun.title") as string}
      programDescription={t("donate.ibn-khaldun.description") as string}
      goalAmount={parseInt(t("donate.ibn-khaldun.goal") as string)}
      raisedAmount={parseInt(t("donate.ibn-khaldun.raised") as string)}
      supporters={880}
      daysLeft={360}
      impactCountry={t("programs.ibn-khaldun.title") as string}
      suggestedAmounts={[
        { amount: 54, title: t("donate.pulse.suggested.1.title") as string, description: t("donate.pulse.suggested.1.desc") as string, claimed: 1 },
        { amount: 107, title: t("donate.pulse.suggested.2.title") as string, description: t("donate.pulse.suggested.2.desc") as string, claimed: 0 },
        { amount: 200, title: t("donate.pulse.suggested.3.title") as string, description: t("donate.pulse.suggested.3.desc") as string, claimed: 0 },
        { amount: 800, title: t("donate.pulse.suggested.4.title") as string, description: t("donate.pulse.suggested.4.desc") as string, claimed: 0 },
      ]}
    />
  )
}

