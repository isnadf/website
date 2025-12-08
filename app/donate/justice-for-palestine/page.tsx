"use client"

import ProgramDonationPage from "@/components/program-donation-page"
import { useLanguage } from "@/components/language-provider"

export default function JusticeForPalestineDonatePage() {
  const { t } = useLanguage()

  return (
    <ProgramDonationPage
      heroImage="/work/1.jpeg"
      portraitImage1="/work/3.jpeg"
      portraitImage2="/work/4.jpeg"
      organizerName="ISNAD Foundation"
      organizerLogo="/logo.png"
      programTitle={t("donate.justice.title") as string}
      programDescription={t("donate.justice.description") as string}
      goalAmount={parseInt(t("donate.justice.goal") as string)}
      raisedAmount={parseInt(t("donate.justice.raised") as string)}
      supporters={1100}
      daysLeft={400}
      impactCountry={t("programs.justice.title") as string}
      suggestedAmounts={[
        { amount: 54, title: t("donate.pulse.suggested.1.title") as string, description: t("donate.pulse.suggested.1.desc") as string, claimed: 1 },
        { amount: 107, title: t("donate.pulse.suggested.2.title") as string, description: t("donate.pulse.suggested.2.desc") as string, claimed: 0 },
        { amount: 200, title: t("donate.pulse.suggested.3.title") as string, description: t("donate.pulse.suggested.3.desc") as string, claimed: 0 },
        { amount: 800, title: t("donate.pulse.suggested.4.title") as string, description: t("donate.pulse.suggested.4.desc") as string, claimed: 0 },
      ]}
    />
  )
}

