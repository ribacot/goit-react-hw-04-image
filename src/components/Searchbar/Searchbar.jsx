import css from './Searchbar.module.css';
export default function Searchbar({ value, onSubmit, onChenge }) {
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchForm_button}>
          Search
        </button>

        <input
          name="searchQwery"
          className={css.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={onChenge}
        />
      </form>
    </header>
  );
}
