import { FiDownload } from 'react-icons/fi';
import { FiDownload } from 'react-icons/fi';
// global.d.ts
import React from "react";
declare module "framer-motion" {
  interface MotionProps {
    className?: string;
    id?: string;
    // href?: string;
    // download?:any;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<any>;
    whileTap?: any;
  }
}

