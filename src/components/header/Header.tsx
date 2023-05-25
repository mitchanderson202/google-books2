import "./Header.scss";

const Header = () => {
  return (
    <div className="Header">
      <h1>Google Books</h1>
      <div className="Header-Information">
        Search for a book using the Input and the Search Button. This will
        search through the Google Books API and render a maximum of
        <span> 40 books</span>, keep this in mind if you're just browsing.
        Otherwise search directly for a Title or Artist.
        <br />
        <h6>By Mitchell Anderson</h6>
        <a
          href="https://www.linkedin.com/in/mitchandersondeveloper/"
          target="blank"
          rel="noopener"
        >
          LinkedIn
        </a>{" "}
        ||{" "}
        <a
          href="https://github.com/mitchanderson202"
          target="blank"
          rel="noopener"
        >
          Github
        </a>{" "}
        ||{" "}
        <a
          href="https://mitchandersondeveloper.com/"
          target="blank"
          rel="noopener"
        >
          Website
        </a>
      </div>
    </div>
  );
};

export default Header;
