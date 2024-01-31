"use client";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastContainerWrapper() {
    return (
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
    );
}