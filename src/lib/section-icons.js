import {
  Folder, Award, Languages, Heart, Star, BookOpen, Trophy, Globe, Users, Music,
  Code2, Lightbulb, Shield, Medal, Compass, Rocket, Mic, Camera, Palette,
  PenTool, Plane, HeartHandshake, GraduationCap, Briefcase, Layers,
} from "lucide-react";

// Daftar nama icon (dari lucide-react) yang cocok dipakai untuk custom
// section CV buatan user sendiri -- misalnya "Sertifikasi", "Bahasa",
// "Volunteer", "Penghargaan", dll. Saat user menambah section baru, salah
// satu dari daftar ini dipilih otomatis (acak), dan user tetap bisa
// menggantinya manual lewat picker di Builder.

export const SECTION_ICON_NAMES = [
  "Folder", "Award", "Languages", "Heart", "Star", "BookOpen", "Trophy",
  "Globe", "Users", "Music", "Code2", "Lightbulb", "Shield", "Medal",
  "Compass", "Rocket", "Mic", "Camera", "Palette", "PenTool", "Plane",
  "HeartHandshake", "GraduationCap", "Briefcase", "Layers",
];

// Map nama -> komponen icon asli. Dipakai bersama oleh cv-templates.jsx
// (render di preview & PDF) dan Builder UI (render di picker), supaya
// satu-satunya sumber kebenaran untuk daftar icon ada di sini.
export const SECTION_ICON_MAP = {
  Folder, Award, Languages, Heart, Star, BookOpen, Trophy, Globe, Users, Music,
  Code2, Lightbulb, Shield, Medal, Compass, Rocket, Mic, Camera, Palette,
  PenTool, Plane, HeartHandshake, GraduationCap, Briefcase, Layers,
};

export const randomSectionIcon = () =>
  SECTION_ICON_NAMES[Math.floor(Math.random() * SECTION_ICON_NAMES.length)];
