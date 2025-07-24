import React, { useEffect, useRef, useState } from "react";

export function CustomScrollbar({
  height = 300,
  children,
}: {
  height?: number | string;
  children: React.ReactNode;
}) {
  const [showBar, setShowBar] = useState(false);
  const [barTop, setBarTop] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤시 바 노출 + 위치 계산
  const handleScroll = () => {
    setShowBar(true);
    setIsVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    const el = containerRef.current;
    if (el) {
      const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight);
      const scrollBarHeight = Math.max(20, (el.clientHeight / el.scrollHeight) * el.clientHeight);
      setBarHeight(scrollBarHeight);
      setBarTop(ratio * (el.clientHeight - scrollBarHeight));
    }

    timerRef.current = setTimeout(() => {
      setShowBar(false);
      setTimeout(() => setIsVisible(false), 400);
    }, 1000);
  };

  // 최초 마운트시 bar 계산
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      const scrollBarHeight = Math.max(20, (el.clientHeight / el.scrollHeight) * el.clientHeight);
      setBarHeight(scrollBarHeight);
      setBarTop(0);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      style={{
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll pr-2"
        tabIndex={0}
        role="region"
        aria-label="스크롤 영역"
        onScroll={handleScroll}
        // 모든 브라우저에서 기본 스크롤바 제거(크로스브라우징, purge 영향 X)
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {/* Webkit 브라우저에서 스크롤바 숨기기 */}
        <div style={{ display: "contents" }}>
          <style>
            {`
            [data-custom-scrollbar]::-webkit-scrollbar { display: none !important; }
            `}
          </style>
        </div>
        <div data-custom-scrollbar>{children}</div>
      </div>
      {/* 커스텀 바 */}
      {isVisible && (
        <div
          aria-hidden="true"
          className="absolute right-1 rounded pointer-events-none transition-opacity duration-[400ms]"
          style={{
            width: 8, // 더 두껍게
            top: barTop,
            height: barHeight,
            opacity: showBar ? 1 : 0,
            background: "rgba(60,60,60,0.7)", // 좀 더 눈에 띄게
            zIndex: 20,
          }}
        />
      )}
    </div>
  );
}
