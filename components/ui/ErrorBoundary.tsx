"use client";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#04060a",
              color: "#eef0f4",
              fontFamily: "var(--font-heebo), sans-serif",
              gap: "24px",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#34d399", textTransform: "uppercase" }}>
              שגיאה
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, fontFamily: "var(--font-syne)" }}>
              משהו השתבש
            </h1>
            <p style={{ color: "#8a8a9a", maxWidth: "400px", lineHeight: 1.7 }}>
              אנחנו על זה. רעננו את הדף או חזרו בעוד רגע.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "14px 32px",
                background: "#059669",
                border: "none",
                color: "#fff",
                fontFamily: "var(--font-heebo)",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              רענן את הדף
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
