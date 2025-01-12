import { ThemeSwitcher } from "@/lib/theme/theme-provider/theme-switcher.tsx";

export default function Header() {
  return (
    <header className="flex items-center justify-end h-14 shadow-lg px-3 bg-background sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
