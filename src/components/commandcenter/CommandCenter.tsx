"use client";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { useAtom } from "jotai";
import { commandCenterOpenAtom } from "./store";

const kbdVariants = cva(
  "pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground opacity-100 sm:inline-block",
  {
    variants: {
      size: {
        sm: "text-[10px]",
        default: "text-[12px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export function CommandCenter() {
  const [open, setOpen] = useAtom(commandCenterOpenAtom);

  // handler for ctrl K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen} loop>
      <CommandInput placeholder="Click on a result or search (character, light cone)..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Group 1">
          <CommandItem>Calendar</CommandItem>
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Group 2"></CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
