# Frontend Architecture

---

# Purpose

The frontend is the projection layer of AURA.

It does not perform intelligence.

It visualizes intelligence.

---

# Responsibilities

Display

Animate

Project

Communicate State

Never perform reasoning.

---

# Layout

```
Header

↓

Lotus Heart

↓

Projection Panels

↓

Navigation
```

---

# Major Components

Lotus Heart

Conversation

Mission Control

AI Insight

Neural Activity

Diagnostics

Voice

Weather

News

Clock

Settings

---

# State Flow

Backend

↓

Frontend Store

↓

Components

↓

Animations

↓

User

---

# Animation Rules

Every animation communicates state.

Idle

Listening

Thinking

Remembering

Speaking

Learning

---

# Component Rules

Components should remain isolated.

Communication occurs through shared state.

Never through direct component coupling.

---

# Long-Term Goal

The frontend should feel like a living holographic operating system rather than a dashboard.