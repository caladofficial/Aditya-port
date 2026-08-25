import { identity } from "@/data/design-system";

export function FoundationFooter() {
  return (
    <footer id="contact" className="foundation-footer" tabIndex={-1}>
      <div>
        <span>Foundation / complete</span>
        <h2>Ready for<br /><em>the story.</em></h2>
      </div>
      <p>This phase establishes the visual, responsive, motion, and component language only. Portfolio content remains intentionally unbuilt.</p>
      <div className="footer-meta">
        <span>{identity.name}</span>
        <span>Design System v1.0</span>
        <span>2026</span>
      </div>
    </footer>
  );
}
