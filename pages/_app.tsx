import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './navBar';

interface Item {
  current: boolean;
  name: string;
}

interface NavBarProps {
  onButtonClick: (items: Item[], tab: string) => Item[];
}

export default function App({ Component, pageProps }: AppProps) {
  const handleToggle = (items: Item[], tab: string): Item[] => {
    const updatedItems = items.map((item) => {
      if (item.name === tab) {
        return {
          ...item,
          current: true,
        };
      }
      return {...item, current: false}
    });
    return updatedItems;
  };

  const navBarProps: NavBarProps = {
    onButtonClick: handleToggle,
  };

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <NavBar {...navBarProps} />
      <Component {...pageProps} />
    </div>
  );
}
