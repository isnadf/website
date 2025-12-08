"use client"

import ProgramDonationPage from "@/components/program-donation-page"
import { useLanguage } from "@/components/language-provider"

export default function PalestinianTalentedDonatePage() {
  const { t } = useLanguage()

  return (
    <ProgramDonationPage
      heroImage="/work/3.jpeg"
      portraitImage1="/work/2.jpeg"
      portraitImage2="/work/4.jpeg"
      organizerName="ISNAD Foundation"
      organizerLogo="/logo.png"
      programTitle={t("donate.talented.title") as string}
      programDescription={t("donate.talented.description") as string}
      goalAmount={parseInt(t("donate.talented.goal") as string)}
      raisedAmount={parseInt(t("donate.talented.raised") as string)}
      supporters={1200}
      daysLeft={380}
      impactCountry={t("programs.talented.category") as string}
      suggestedAmounts={[
        { amount: 54, title: t("donate.pulse.suggested.1.title") as string, description: t("donate.pulse.suggested.1.desc") as string, claimed: 1 },
        { amount: 107, title: t("donate.pulse.suggested.2.title") as string, description: t("donate.pulse.suggested.2.desc") as string, claimed: 0 },
        { amount: 200, title: t("donate.pulse.suggested.3.title") as string, description: t("donate.pulse.suggested.3.desc") as string, claimed: 0 },
        { amount: 800, title: t("donate.pulse.suggested.4.title") as string, description: t("donate.pulse.suggested.4.desc") as string, claimed: 0 },
      ]}
    />
  )
}

