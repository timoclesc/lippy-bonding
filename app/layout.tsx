import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

 export default function RootLayout(props) {
   const { children } = props;
   return (
     <html lang="en">
      <body className={roboto.variable}>
          <AppRouterCacheProvider>
           <ThemeProvider theme={theme}>
              {children}
           </ThemeProvider>
          </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
