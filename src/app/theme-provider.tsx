// src/app/theme-provider.tsx
"use client";
import { ThemeProvider } from 'next-themes';
import { useEffect, useState, type ReactNode } from 'react';

export default function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) { return <>{children}</>; }

  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>;
}