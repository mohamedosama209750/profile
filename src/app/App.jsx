import Background from './Background';
import Footer from './Footer';
import Header from './Header';
import { profile, ProfilePage } from '../modules/profile';
import ThemeProvider from '../modules/theme/ThemeProvider';
import styles from './App.module.css';

export default function App() {
  return (
    <ThemeProvider>
      <div className={styles.shell}>
        <Background />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header profile={profile} />
        <main id="main" className={styles.main}>
          <div className="container">
            <ProfilePage />
          </div>
        </main>
        <Footer profile={profile} />
      </div>
    </ThemeProvider>
  );
}
