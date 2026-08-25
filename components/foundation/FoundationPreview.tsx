"use client";

import { useCallback, useRef, useState } from "react";
import { CharacterDirector } from "@/components/character";
import { ArchitectureSection } from "@/components/foundation/ArchitectureSection";
import { ComponentsSection } from "@/components/foundation/ComponentsSection";
import { DirectionSection } from "@/components/foundation/DirectionSection";
import { FoundationFooter } from "@/components/foundation/FoundationFooter";
import { FoundationHero } from "@/components/foundation/FoundationHero";
import { FoundationPreloader } from "@/components/foundation/FoundationPreloader";
import { MotionSection } from "@/components/foundation/MotionSection";
import { ResponsiveSection } from "@/components/foundation/ResponsiveSection";
import { TokenSection } from "@/components/foundation/TokenSection";
import { Cursor } from "@/components/system/Cursor";
import { GlobalNavigation } from "@/components/system/GlobalNavigation";
import { SmoothScroll } from "@/components/system/SmoothScroll";

/** Composes the review surface; visual and motion logic live in focused modules. */
export function FoundationPreview() {
  const shellRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  const revealFoundation = useCallback(() => setReady(true), []);

  const updatePointer = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    shellRef.current?.style.setProperty("--pointer-x", `${event.clientX}px`);
    shellRef.current?.style.setProperty("--pointer-y", `${event.clientY}px`);
  }, []);

  return (
    <SmoothScroll>
      <main
        ref={shellRef}
        id="main-content"
        className="foundation-shell"
        onPointerMove={updatePointer}
        aria-busy={!ready}
        tabIndex={-1}
      >
        <FoundationPreloader onReveal={revealFoundation} onComplete={revealFoundation} />
        <div className="pointer-glow" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <Cursor />
        <GlobalNavigation ready={ready} />
        <CharacterDirector ready={ready} entryDelay={0.96} />
        <FoundationHero ready={ready} />
        <DirectionSection />
        <TokenSection />
        <MotionSection />
        <ResponsiveSection />
        <ComponentsSection />
        <ArchitectureSection />
        <FoundationFooter />
      </main>
    </SmoothScroll>
  );
}
