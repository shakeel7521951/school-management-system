import { useEffect } from "react";

export default function OrbEffect() {
  useEffect(() => {
    const orb = document.querySelector(".orb");
    const handleMove = (e) => {
      if (orb) {
        requestAnimationFrame(() => {
          orb.style.left = `${e.clientX}px`;
          orb.style.top = `${e.clientY}px`;
        });
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="orb absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#104c80]/20 via-white/10 to-black/10 blur-3xl pointer-events-none transition-transform duration-100 ease-out"></div>
  );
}
