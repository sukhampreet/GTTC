
# GTTC Indigenous Smart Security Central Control Platform

Version: 1.0

---

# Project Vision

This project is an Indigenous Smart Security Central Control Platform developed on top of an existing surveillance ecosystem.

The existing surveillance infrastructure already exists and is functional.

The objective is NOT to rebuild the existing surveillance software.

The objective is to build an Indigenous Unified Smart Security Platform that integrates multiple security subsystems into a single enterprise-grade application.

The project should resemble software such as:

- HikCentral Professional
- Dahua DSS
- Genetec Security Center
- Milestone XProtect
- Huawei Smart Security Platform

This platform should be professional enough for deployment in:

- Smart Campus
- Airport
- Government Building
- Railway Station
- Smart City
- Corporate Headquarters

---

# Existing Infrastructure

The following systems already exist.

We DO NOT replace them.

Every subsystem already has its own backend.

Our frontend consumes information from these systems through APIs.

Existing infrastructure includes

- Video Surveillance
- Access Control
- Building Intercom
- Fire & Emergency
- Smart Parking
- Environment Monitoring

The existing system already contains

- Cameras
- NVRs
- AI Edge Devices
- RS485 Devices
- Docker Deployment
- nginx
- redis
- mysql
- minio
- emqx MQTT

These remain untouched.

---

# Our Contribution

We develop

- Unified Frontend
- Integration Layer
- AI Analytics Layer
- Cyber Security Layer
- Event Center
- Shared Dashboard
- Shared Reports
- Shared Notification Engine
- Shared Database (only for our platform)

---

# High Level Architecture

Users

↓

Browser

↓

Unified Smart Security Platform

↓

Frontend (React)

↓

API Integration Layer

↓

Existing Vendor Systems

↓

Physical Devices

Additionally

Frontend

↓

AI Engine

↓

Cyber Security Engine

↓

Shared Database

↓

Notification Engine

---

# Deployment Architecture

Single PC Server

Runs

Docker Desktop

Existing Containers

Our Containers

Shared Database

Frontend

Backend

AI Engine

Cyber Engine

The frontend should assume that backend APIs already exist.

Never generate backend logic unless specifically requested.

---

# Design Philosophy

Enterprise Software

Industrial Design

High Information Density

Professional

Minimal animations

No flashy UI

No glassmorphism

No neumorphism

No rounded playful cards

The UI should resemble

- HikCentral
- Dahua DSS
- Cisco DNA Center
- VMware vCenter

Not

- Generic Tailwind dashboards
- Startup landing pages
- SaaS templates

---

# Theme

Dark Theme

Primary

Blue

Secondary

Slate

Accent

Cyan

Danger

Red

Warning

Amber

Success

Green

Typography

Inter

Professional spacing

Compact tables

Sharp borders

Subtle shadows

---

# Technology Stack

Frontend

React

TypeScript

Vite

TailwindCSS

ShadCN UI

React Router

TanStack Table

React Query

Recharts

Lucide Icons

Framer Motion (minimal)

Backend (Future)

Spring Boot

Python

FastAPI

MySQL

Redis

MQTT

REST API

---

# Application Layout

Every page must use the same layout.

Top Navigation

Left Sidebar

Breadcrumb

Content Area

Right-side optional drawer

Notification System

Toast System

Modal System

Command Palette

Global Search

---

# Sidebar Structure

Dashboard

Live Monitoring

Video Surveillance

Access Control

Building Intercom

Fire & Emergency

Smart Parking

Environment Monitoring

Event Center

Device Management

AI Analytics

Reports

User Management

Settings

---

# Module Philosophy

Each module is independent.

Each module has

Overview Dashboard

Tables

Search

Filters

Toolbar

Status Cards

Charts

Health Indicators

Export

Settings

Every module follows identical UI patterns.

Never redesign components differently.

Maintain consistency.

---

# Module 1

Video Surveillance

Purpose

Monitor all CCTV infrastructure.

Pages

- Live View
- Playback
- Camera List
- Camera Health
- Recording
- Snapshots
- PTZ Control
- Recording Schedule
- Camera Configuration
- Video Analytics
- AI Detection

AI Detection contains

- Person Detection
- Vehicle Detection
- Face Detection
- Weapon Detection
- Fire Detection
- Crowd Detection
- Intrusion Detection
- Line Crossing
- Helmet Detection
- PPE Detection

Dashboard cards

- Total Cameras
- Online Cameras
- Offline Cameras
- Recording Cameras
- AI Enabled Cameras
- Storage Usage

Camera table

- Camera Name
- IP Address
- Status
- Recording
- AI Enabled
- Location
- Firmware
- Last Seen
- Health

---

# Module 2

Access Control

Purpose

Manage entry access.

Pages

- Live Door Status
- Access Logs
- Face Management
- Card Management
- Visitor Management
- Employee Management
- Door Control
- Attendance
- Time Schedule
- Access Permissions
- Anti Passback
- Blacklist
- Emergency Unlock
- Device Configuration

Overview

- Online Doors
- Offline Doors
- Today's Entries
- Today's Exits
- Failed Attempts
- Active Alarms

---

# Module 3

Building Intercom

Pages

- Indoor Stations
- Outdoor Stations
- Live Calls
- Call History
- Remote Unlock
- Voice Broadcast
- Device Status
- Recording
- Configuration

Overview

- Online Devices
- Active Calls
- Missed Calls
- Device Health

---

# Module 4

Fire & Emergency

Pages

- Fire Dashboard
- Smoke Detection
- Heat Detection
- Manual Call Point
- Alarm History
- Emergency Broadcast
- PA System
- Zone Monitoring
- Device Health
- Alarm Reset
- Fault Monitoring
- Event Logs

Overview

- Fire Panels
- Smoke Sensors
- Heat Sensors
- Active Alarms
- Fault Devices

---

# Module 5

Smart Parking

Pages

- Live Parking
- Entry Gate
- Exit Gate
- Vehicle List
- Parking Slots
- Barrier Control
- Visitor Vehicle
- ANPR
- Parking Reports
- Vehicle History

Overview

- Total Slots
- Occupied
- Free
- Reserved
- Vehicle Count
- Barrier Status

---

# Module 6

Environment Monitoring

Pages

- Temperature
- Humidity
- Air Quality
- Occupancy
- Energy Usage
- Lighting
- HVAC
- Alerts
- Historical Graphs
- Device Status

Overview

- Temperature
- Humidity
- AQI
- CO₂
- PM2.5
- Noise
- Energy

---

# Event Center

This is OUR module.

Centralize every event from all subsystems.

Includes

- Critical Events
- Warnings
- Information
- Timeline
- Replay
- Search
- Export
- Acknowledge

Receives

- Video Events
- Fire Events
- Access Events
- Parking Events
- Environment Events
- AI Events
- Cyber Events

---

# Device Management

Central inventory of every device.

Pages

- Cameras
- Fire Devices
- Parking Devices
- Access Devices
- Environment Sensors
- Intercom Devices
- Firmware
- Diagnostics
- Health

---

# AI Analytics

Our biggest contribution.

Includes

- Face Recognition
- Intrusion Detection
- Weapon Detection
- Fire Detection
- PPE Detection
- Vehicle Detection
- Crowd Analysis
- Behavior Analysis
- Heat Maps
- Threat Scoring
- AI Model Manager

---

# Reports

Daily

Weekly

Monthly

Incident Reports

Attendance Reports

Parking Reports

Fire Reports

AI Reports

PDF Export

Excel Export

---

# Settings

Users

Roles

Permissions

SMTP

SMS

Network

Docker

Database

System Logs

Backup

Restore

---

# Shared Services

Notification Engine

Audit Logs

Global Search

Authentication

Authorization

RBAC

Reports

Export

Shared Database

Health Monitoring

---

# Coding Standards

Always use reusable components.

Never duplicate layouts.

Every page must support

- Search
- Sorting
- Filtering
- Pagination
- Status Badges
- Export
- Loading States
- Empty States
- Error States

Use TypeScript everywhere.

Keep folder structure modular.

Avoid inline styles.

Use Tailwind utility classes.

Create reusable UI primitives.

---

# Sprint Development Rules

Sprint 1

Application Shell

Layout

Sidebar

Top Navigation

Theme

Routing

Reusable Components

Sprint 2

Dashboard

Sprint 3

Video Surveillance

Sprint 4

Access Control

Sprint 5

Building Intercom

Sprint 6

Fire & Emergency

Sprint 7

Smart Parking

Sprint 8

Environment Monitoring

Sprint 9

Event Center

Sprint 10

Device Management

AI Analytics

Reports

Settings

---

# IMPORTANT

Before implementing any feature:

1. Read this context.md completely.
2. Never change the architecture.
3. Never redesign the navigation.
4. Follow enterprise software UI conventions.
5. Maintain visual consistency across all modules.
6. Assume all backend APIs already exist.
7. Focus only on frontend unless explicitly instructed otherwise.
8. Keep every screen inspired by professional surveillance platforms while remaining an original indigenous implementation.