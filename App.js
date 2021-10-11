import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Fipe from './pages/Fipe';

export default function App() {
  return (
    <>
      <Fipe />
      <StatusBar style="auto" />
    </>
  );
}