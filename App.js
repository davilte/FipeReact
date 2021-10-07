import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Fipe from './pages/Fipe';
import Header from './components/Header';

export default function App() {
  return (
    <>
    <Header></Header>
      <Fipe />
      <StatusBar style="auto" />
    </>
  );
}