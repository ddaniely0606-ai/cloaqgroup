"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 2.5;

    // Main purple particle field
    const count = 7000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Vary between purple and silver
      const t = Math.random();
      if (t > 0.85) {
        colors[i * 3] = 0.77; colors[i * 3 + 1] = 0.77; colors[i * 3 + 2] = 0.83;
      } else {
        colors[i * 3] = 0.48; colors[i * 3 + 1] = 0.23; colors[i * 3 + 2] = 0.93;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.012,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Secondary smaller ring of particles
    const ringCount = 2000;
    const ringPositions = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2;
      ringPositions[i * 3] = Math.cos(angle) * radius;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      ringPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));
    const ringMat = new THREE.PointsMaterial({
      size: 0.008,
      color: new THREE.Color("#6d28d9"),
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Points(ringGeo, ringMat);
    scene.add(ring);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      particles.rotation.x = elapsed * 0.025;
      particles.rotation.y = elapsed * 0.04;
      ring.rotation.y = elapsed * 0.06;
      ring.rotation.x = Math.sin(elapsed * 0.1) * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    />
  );
}
