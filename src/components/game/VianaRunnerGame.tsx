"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ATTRACTION_PRIZES,
  BIKE_SPRITE,
  GAME_COLORS,
  OBSTACLE_TYPES,
  type AttractionPrize,
} from "@/data/runner-game";
import { cn } from "@/lib/utils";

type GamePhase = "idle" | "playing" | "over";

interface Obstacle {
  x: number;
  type: (typeof OBSTACLE_TYPES)[number];
}

interface Prize {
  x: number;
  y: number;
  attraction: AttractionPrize;
  collected: boolean;
}

interface GameState {
  phase: GamePhase;
  playerY: number;
  velocityY: number;
  groundY: number;
  obstacles: Obstacle[];
  prizes: Prize[];
  score: number;
  prizesCollected: number;
  speed: number;
  frame: number;
  lastObstacleX: number;
  lastPrizeX: number;
  lastCollectedLabel: string | null;
  collectFlash: number;
}

const GRAVITY = 0.55;
const JUMP_FORCE = -11.5;
const PLAYER_X = 64;
/** Sprite aspect ratio from bike-viana-experience.png (211×130) */
const BIKE_ASPECT = 211 / 130;
const PLAYER_W = 118;
const PLAYER_H = Math.round(PLAYER_W / BIKE_ASPECT);
const GROUND_OFFSET = 56;
const BIKE_FOOT_OFFSET = 6;

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createInitialState(canvasHeight: number): GameState {
  const groundY = canvasHeight - GROUND_OFFSET;
  return {
    phase: "idle",
    playerY: groundY - PLAYER_H,
    velocityY: 0,
    groundY,
    obstacles: [],
    prizes: [],
    score: 0,
    prizesCollected: 0,
    speed: 5,
    frame: 0,
    lastObstacleX: 0,
    lastPrizeX: 400,
    lastCollectedLabel: null,
    collectFlash: 0,
  };
}

function drawGround(ctx: CanvasRenderingContext2D, w: number, h: number, offset: number) {
  const groundY = h - GROUND_OFFSET;
  ctx.fillStyle = GAME_COLORS.ground;
  ctx.fillRect(0, groundY, w, GROUND_OFFSET);

  ctx.strokeStyle = GAME_COLORS.groundLine;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(w, groundY);
  ctx.stroke();

  ctx.strokeStyle = GAME_COLORS.groundDetail;
  ctx.lineWidth = 1;
  for (let x = -((offset % 40) + 40); x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, groundY + 12);
    ctx.lineTo(x + 20, groundY + 12);
    ctx.stroke();
  }
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.beginPath();
  ctx.ellipse(x, y, 28 * scale, 14 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 22 * scale, y + 4 * scale, 22 * scale, 12 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x - 18 * scale, y + 6 * scale, 18 * scale, 10 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawBikeShadow(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  grounded: boolean,
) {
  const shadowScale = grounded ? 1 : 0.72;
  ctx.fillStyle = "rgba(31, 58, 46, 0.18)";
  ctx.beginPath();
  ctx.ellipse(
    x + PLAYER_W * 0.48,
    groundY + 5,
    PLAYER_W * 0.34 * shadowScale,
    5 * shadowScale,
    0,
    0,
    Math.PI * 2,
  );
  ctx.fill();
}

function drawBikeSprite(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  frame: number,
  grounded: boolean,
) {
  const bob = grounded ? Math.sin(frame * 0.14) * 1.2 : 0;
  const tilt = grounded ? Math.sin(frame * 0.14) * 0.012 : -0.07;
  const anchorX = x + PLAYER_W * 0.48;
  const anchorY = y + PLAYER_H - BIKE_FOOT_OFFSET + bob;

  ctx.save();
  ctx.translate(anchorX, anchorY);
  ctx.rotate(tilt);
  ctx.drawImage(img, -PLAYER_W / 2, -PLAYER_H + BIKE_FOOT_OFFSET, PLAYER_W, PLAYER_H);
  ctx.restore();
}

/** Fallback enquanto o sprite carrega */
function drawBikeFallback(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number,
  grounded: boolean,
) {
  const bob = grounded ? Math.sin(frame * 0.14) * 1.2 : 0;
  const cy = y + PLAYER_H - BIKE_FOOT_OFFSET + bob;
  const wheelR = 16;

  ctx.strokeStyle = GAME_COLORS.wheel;
  ctx.lineWidth = 3;
  for (const wx of [x + 22, x + PLAYER_W - 28]) {
    ctx.beginPath();
    ctx.arc(wx, cy, wheelR, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = GAME_COLORS.bikeCream;
  ctx.strokeStyle = GAME_COLORS.bike;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 22, cy);
  ctx.quadraticCurveTo(x + 48, y + 8, x + PLAYER_W - 28, cy);
  ctx.stroke();

  ctx.fillStyle = GAME_COLORS.bike;
  ctx.fillRect(x + PLAYER_W - 18, y + 14, 14, 8);
}

function drawObstacle(
  ctx: CanvasRenderingContext2D,
  obs: Obstacle,
  groundY: number,
) {
  const x = obs.x;
  const h = obs.type.height;
  const w = obs.type.width;
  const y = groundY - h;

  if (obs.type.id === "hop") {
    ctx.fillStyle = "#4A7C59";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h - 8, w / 2, h / 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#3D6B4F";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w / 2, y + h - 10);
    ctx.stroke();
  } else if (obs.type.id === "rock") {
    ctx.fillStyle = "#7A6A5A";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (obs.type.id === "stump") {
    ctx.fillStyle = "#6B3D2E";
    ctx.fillRect(x, y + 8, w, h - 8);
    ctx.fillStyle = "#4A7C59";
    ctx.beginPath();
    ctx.arc(x + w / 2, y + 8, w / 2, Math.PI, 0);
    ctx.fill();
  } else {
    ctx.fillStyle = "#6B3D2E";
    ctx.fillRect(x, y, 4, h);
    ctx.fillRect(x + w - 4, y, 4, h);
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(x, y + i * 14, w, 3);
    }
  }
}

function drawPrize(ctx: CanvasRenderingContext2D, prize: Prize) {
  if (prize.collected) return;
  const size = 36;
  ctx.fillStyle = prize.attraction.color;
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.arc(prize.x + size / 2, prize.y + size / 2, size / 2 + 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = prize.attraction.color;
  ctx.lineWidth = 2;
  ctx.strokeRect(prize.x, prize.y, size, size);

  ctx.font = "22px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(prize.attraction.icon, prize.x + size / 2, prize.y + size / 2);
}

function rectsOverlap(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

export function VianaRunnerGame({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const rafRef = useRef<number>(0);
  const [uiScore, setUiScore] = useState(0);
  const [uiPrizes, setUiPrizes] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [lastPrize, setLastPrize] = useState<string | null>(null);
  const [highScore, setHighScore] = useState(0);
  const highScoreRef = useRef(0);
  const bikeImageRef = useRef<HTMLImageElement | null>(null);
  const bikeReadyRef = useRef(false);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s) return;
    if (s.phase === "idle") {
      s.phase = "playing";
      setPhase("playing");
      s.velocityY = JUMP_FORCE;
      return;
    }
    if (s.phase === "over") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      stateRef.current = createInitialState(canvas.height);
      stateRef.current.phase = "playing";
      setPhase("playing");
      setUiScore(0);
      setUiPrizes(0);
      setLastPrize(null);
      return;
    }
    const grounded = s.playerY >= s.groundY - PLAYER_H - 1;
    if (grounded) {
      s.velocityY = JUMP_FORCE;
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = BIKE_SPRITE;
    img.onload = () => {
      bikeImageRef.current = img;
      bikeReadyRef.current = true;
    };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("viana-runner-high");
    if (stored) {
      const n = Number(stored);
      setHighScore(n);
      highScoreRef.current = n;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = Math.min(320, Math.max(260, Math.floor(w * 0.45)));
      canvas.width = w;
      canvas.height = h;
      if (!stateRef.current) {
        stateRef.current = createInitialState(h);
      } else {
        stateRef.current.groundY = h - GROUND_OFFSET;
        if (stateRef.current.phase !== "playing") {
          stateRef.current.playerY = stateRef.current.groundY - PLAYER_H;
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      const s = stateRef.current;
      if (!s || !ctx) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = GAME_COLORS.sky;
      ctx.fillRect(0, 0, w, h);

      drawCloud(ctx, (w * 0.2 + s.frame * 0.2) % (w + 100) - 50, 40, 1);
      drawCloud(ctx, (w * 0.7 + s.frame * 0.12) % (w + 100) - 50, 70, 0.8);

      drawGround(ctx, w, h, s.frame * s.speed);

      if (s.phase === "playing") {
        s.frame += 1;
        s.speed = Math.min(9, 5 + s.frame / 1200);
        s.score += Math.floor(s.speed / 2);
        s.velocityY += GRAVITY;
        s.playerY += s.velocityY;

        const floor = s.groundY - PLAYER_H;
        if (s.playerY >= floor) {
          s.playerY = floor;
          s.velocityY = 0;
        }

        // Spawn obstacles
        const minGap = 280 + Math.random() * 180;
        if (s.frame - s.lastObstacleX > minGap / s.speed) {
          s.obstacles.push({ x: w + 20, type: randomItem(OBSTACLE_TYPES) });
          s.lastObstacleX = s.frame;
        }

        // Spawn prizes
        if (s.frame - s.lastPrizeX > 420 / s.speed) {
          const air = Math.random() > 0.45;
          const prizeY = air
            ? s.groundY - PLAYER_H - 50 - Math.random() * 30
            : s.groundY - 40;
          s.prizes.push({
            x: w + 20,
            y: prizeY,
            attraction: randomItem(ATTRACTION_PRIZES),
            collected: false,
          });
          s.lastPrizeX = s.frame;
        }

        s.obstacles = s.obstacles
          .map((o) => ({ ...o, x: o.x - s.speed }))
          .filter((o) => o.x > -60);

        s.prizes = s.prizes
          .map((p) => ({ ...p, x: p.x - s.speed }))
          .filter((p) => p.x > -60 && !p.collected);

        const px = PLAYER_X;
        const py = s.playerY;
        const hitboxPad = 14;

        for (const obs of s.obstacles) {
          if (
            rectsOverlap(
              px + hitboxPad,
              py + hitboxPad,
              PLAYER_W - hitboxPad * 2,
              PLAYER_H - hitboxPad,
              obs.x,
              s.groundY - obs.type.height,
              obs.type.width,
              obs.type.height,
            )
          ) {
            s.phase = "over";
            setPhase("over");
            if (s.score > highScoreRef.current) {
              highScoreRef.current = s.score;
              setHighScore(s.score);
              localStorage.setItem("viana-runner-high", String(s.score));
            }
          }
        }

        for (const prize of s.prizes) {
          if (prize.collected) continue;
          if (
            rectsOverlap(px, py, PLAYER_W, PLAYER_H, prize.x, prize.y, 36, 36)
          ) {
            prize.collected = true;
            s.score += prize.attraction.points;
            s.prizesCollected += 1;
            s.lastCollectedLabel = prize.attraction.label;
            s.collectFlash = 45;
            setLastPrize(prize.attraction.label);
            setUiPrizes(s.prizesCollected);
          }
        }

        if (s.collectFlash > 0) s.collectFlash -= 1;

        if (s.frame % 8 === 0) {
          setUiScore(s.score);
        }
      }

      for (const prize of s.prizes) drawPrize(ctx, prize);
      for (const obs of s.obstacles) drawObstacle(ctx, obs, s.groundY);

      const grounded = s.playerY >= s.groundY - PLAYER_H - 1;
      drawBikeShadow(ctx, PLAYER_X, s.groundY, grounded);
      const bikeImg = bikeImageRef.current;
      if (bikeReadyRef.current && bikeImg) {
        drawBikeSprite(ctx, bikeImg, PLAYER_X, s.playerY, s.frame, grounded);
      } else {
        drawBikeFallback(ctx, PLAYER_X, s.playerY, s.frame, grounded);
      }

      if (s.phase === "idle") {
        ctx.fillStyle = "rgba(31,58,46,0.75)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#F6F0E4";
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Pedale por Viana!", w / 2, h / 2 - 16);
        ctx.font = "14px system-ui, sans-serif";
        ctx.fillStyle = "rgba(246,240,228,0.85)";
        ctx.fillText("Espaço ou toque para pular · Colete as atrações", w / 2, h / 2 + 12);
      }

      if (s.phase === "over") {
        ctx.fillStyle = "rgba(31,58,46,0.72)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#F6F0E4";
        ctx.font = "bold 20px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Fim da pedalada!", w / 2, h / 2 - 28);
        ctx.font = "14px system-ui, sans-serif";
        ctx.fillText(`Pontos: ${s.score} · Atrações: ${s.prizesCollected}`, w / 2, h / 2);
        ctx.fillText("Espaço ou toque para tentar de novo", w / 2, h / 2 + 28);
      }

      if (s.collectFlash > 0 && s.lastCollectedLabel) {
        ctx.fillStyle = GAME_COLORS.bike;
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`+ ${s.lastCollectedLabel}!`, PLAYER_X + PLAYER_W + 8, s.playerY + 16);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    stateRef.current = createInitialState(canvas.height);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex gap-4 font-mono-label text-[10px] text-primary">
          <span>Pontos: {uiScore}</span>
          <span>Atrações: {uiPrizes}</span>
          <span>Recorde: {highScore}</span>
        </div>
        {lastPrize && phase === "playing" ? (
          <span className="font-mono-label text-[10px] text-brown">Última: {lastPrize}</span>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-sm border-4 border-brown shadow-[inset_0_2px_8px_rgba(107,61,46,0.15)]">
        <canvas
          ref={canvasRef}
          className="block w-full touch-none select-none"
          onPointerDown={(e) => {
            e.preventDefault();
            jump();
          }}
          role="img"
          aria-label="Jogo da bicicleta — desvie de obstáculos e colete atrações de Viana"
        />
      </div>

      <p className="mt-3 text-center font-mono-label text-[10px] text-primary/45">
        {phase === "idle"
          ? "Toque ou pressione Espaço para começar"
          : "Espaço / ↑ / toque = pular"}
      </p>
    </div>
  );
}
