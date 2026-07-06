"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type DnaHelixBackgroundProps = {
  className?: string;
  opacity?: number;
};

/**
 * Reusable rotating DNA double-helix background, extracted from the
 * repeated Three.js snippet in the Stitch mockups (home hero, partnerships
 * funding panel). Respects prefers-reduced-motion by rendering a static frame.
 */
export function DnaHelixBackground({ className, opacity = 0.4 }: DnaHelixBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: import("three").WebGLRenderer;
    let frameId: number;
    let disposed = false;

    (async () => {
      const THREE = await import("three");
      if (disposed || !container) return;

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const pointLight = new THREE.PointLight(0x2bb7e8, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      const group = new THREE.Group();
      scene.add(group);

      const count = 40;
      for (let i = 0; i < count; i++) {
        const y = (i / count) * 10 - 5;
        const angle = (i / count) * Math.PI * 4;
        const x1 = Math.cos(angle) * 2;
        const z1 = Math.sin(angle) * 2;
        const x2 = Math.cos(angle + Math.PI) * 2;
        const z2 = Math.sin(angle + Math.PI) * 2;

        const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
        const mat1 = new THREE.MeshPhongMaterial({ color: 0x0f9d8a, emissive: 0x0a2342 });
        const mat2 = new THREE.MeshPhongMaterial({ color: 0x2bb7e8, emissive: 0x0a2342 });

        const s1 = new THREE.Mesh(sphereGeo, mat1);
        s1.position.set(x1, y, z1);
        group.add(s1);

        const s2 = new THREE.Mesh(sphereGeo, mat2);
        s2.position.set(x2, y, z2);
        group.add(s2);

        if (i % 2 === 0) {
          const cylinderGeo = new THREE.CylinderGeometry(0.02, 0.02, 4);
          const cylinderMat = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            transparent: true,
            opacity: 0.3,
          });
          const line = new THREE.Mesh(cylinderGeo, cylinderMat);
          line.position.set(0, y, 0);
          line.rotation.z = Math.PI / 2;
          line.rotation.y = angle;
          group.add(line);
        }
      }

      camera.position.z = 12;

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      const animate = () => {
        if (disposed) return;
        if (!prefersReducedMotion) {
          group.rotation.y += 0.005;
          group.rotation.x += 0.002;
        }
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      return () => window.removeEventListener("resize", handleResize);
    })();

    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
