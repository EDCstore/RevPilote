import { AppShell } from "@/components/app-shell"
import { PageHeader } from "@/components/page-header"
import { SettingsForm } from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Settings"
        description="Manage your organization profile, pricing automation and integrations."
      />
      <SettingsForm />
    </AppShell>
  )
}
