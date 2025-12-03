import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '../context/CartContext'; // Importe o Provider

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Envolvemos tudo com o CartProvider
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}