import Image from 'next/image';
import { links } from './utils/links';
import logo from '../../assets/landing-page/main-logo.svg';
import Button from '../../components/bootstrap/Button';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handeProjectClick = () => {
    router.push('/project');
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="inner-wrapper d-flex align-items-center gap-5">
          <Image src={logo} alt="C2D Logo" width={336} height={43} className="logo" />
          <nav className="nav-links">
            {links.map(({ path, label }, i) => (
              <a key={i} href={path} className="nav-link">
                {label}
              </a>
            ))}
          </nav>
          <div className="d-flex align-items-center gap-2 ms-auto">
            {!session && (
              <>
                <Button
                  className="btn btn-outline-secondary btn-public-outline btn-lg"
                  onClick={() => signIn('github', { callbackUrl: '/project' })}>
                  Login
                </Button>
                <Button
                  className="btn btn-primary btn-public btn-lg"
                  onClick={() => signIn('github', { callbackUrl: '/project' })}>
                  Try it free
                </Button>
              </>
            )}

            {session && (
              <>
                <Button className="btn btn-primary btn-public btn-lg" onClick={handeProjectClick}>
                  Go to projects
                </Button>
                <Button
                  className="btn btn-outline-secondary btn-public-outline btn-lg"
                  onClick={() => {
                    signOut();
                    localStorage.clear();
                  }}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
