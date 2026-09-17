export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <header className="hero">
        <h1>Sarah Wong</h1>
        <p className="tagline">a senior at UH Manoa studying Korean and SLS.</p>
      </header>

      <main>
        <section className="section">
          <h2>About</h2>
          <p>
            Sarah Wong is a senior at the University of Hawaiʻi at Mānoa,
            studying Korean alongside Second Language Studies. Her coursework
            sits at the intersection of language learning and the science
            behind it, blending hands-on language practice with research into
            how people acquire new languages. She's especially interested in
            what that combination reveals about language, culture, and
            communication.
          </p>
        </section>

        <section className="section">
          <h2>This semester</h2>
          <ul className="this-semester">
            <li>Advanced Korean language coursework</li>
            <li>Second Language Acquisition seminar</li>
            <li>Weekly Korean conversation practice group</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>
          Sarah Wong &middot; {year}
        </p>
      </footer>
    </>
  );
}
