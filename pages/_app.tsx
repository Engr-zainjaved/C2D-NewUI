import 'react-toastify/dist/ReactToastify.css';
import '../styles/styles.scss';
import '../views/Home/home.scss';
import '../styles/c2d-theme/c2d-theme.scss';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../context/authContext';
import { ThemeContextProvider } from '../context/themeContext';
import useDarkMode from '../hooks/useDarkMode';
import COLORS from '../common/data/enumColors';
import { getOS } from '../helpers/helpers';
import { ThemeProvider } from 'react-jss';
import { ToastProvider } from 'react-toast-notifications';
import NextTopLoader from 'nextjs-toploader';
import { Toast, ToastContainer } from '../components/bootstrap/Toasts';
import { TourProvider } from '@reactour/tour';
import steps, { styles } from '../steps';
import Portal from '../layout/Portal/Portal';
import { ReactNotifications } from 'react-notifications-component';
import Wrapper from '../layout/Wrapper/Wrapper';
import { appWithTranslation } from 'next-i18next';
import App from '../layout/App/App';
import AsideRoutes from '../layout/Aside/AsideRoutes';
import { SessionProvider } from 'next-auth/react';
import { ProjectProvider } from '../context/projectContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from '../views/Projects/Details/Layout';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  getOS();

  /**
   * Dark Mode
   */
  const { themeStatus } = useDarkMode();
  const theme = {
    theme: themeStatus,
    primary: COLORS.PRIMARY.code,
    secondary: COLORS.SECONDARY.code,
    success: COLORS.SUCCESS.code,
    info: COLORS.INFO.code,
    warning: COLORS.WARNING.code,
    danger: COLORS.DANGER.code,
    dark: COLORS.DARK.code,
    light: COLORS.LIGHT.code,
  };

  const queryClient = new QueryClient();
  const router = useRouter();

  const layoutRoutes = [
    '/project/[name]',
    '/project/[name]/branches/[branchName]/history',
    '/project/[name]/branches/[branchName]/logs',
    '/project/[name]/branches/[branchName]/backups',
    '/project/[name]/branches/[branchName]/monitor',
    '/project/[name]/branches/[branchName]/upgrade',
    '/project/[name]/branches/[branchName]/settings',
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <NextTopLoader showSpinner={false} color="#2733BB" zIndex={99999999} />

        <SessionProvider session={session}>
          <AuthContextProvider>
            <ThemeContextProvider>
              <ThemeProvider theme={theme}>
                <ToastProvider components={{ ToastContainer, Toast }}>
                  <TourProvider steps={steps} styles={styles} showNavigation={false} showBadge={false}>
                    <ProjectProvider>
                      <App>
                        <AsideRoutes />
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <Wrapper>
                          {layoutRoutes.includes(router.pathname) ? (
                            <Layout>
                              <Component {...pageProps} />
                            </Layout>
                          ) : (
                            <Component {...pageProps} />
                          )}
                          <ToastContainer />
                        </Wrapper>
                      </App>
                    </ProjectProvider>
                    <Portal id="portal-notification">
                      <ReactNotifications />
                    </Portal>
                  </TourProvider>
                </ToastProvider>
              </ThemeProvider>
            </ThemeContextProvider>
          </AuthContextProvider>
        </SessionProvider>
      </DndProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp /*, nextI18NextConfig */);
