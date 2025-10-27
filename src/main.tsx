import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router/index.tsx';
import {RouterProvider} from "react-router-dom";
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
