import './Footer.css'

export const Footer = () => {
  return <footer className="app-footer">
    <a href="https://www.strava.com">
    <img alt="Powered by Strava" src={`${process.env.PUBLIC_URL}/powered-by-strava.svg`} style={{ height: '2rem' }}/>
    </a>
  </footer>
}
