import { css } from 'lit';

export default css`
  .music-item {
    display: flex;
    align-items: center;
    max-width: 450px;
    margin: 0 auto;
  }

  .music-item > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    flex-grow: 1;
    padding: 20px;
    color: var(--text-color);
    text-decoration: none;
    transition: var(--fade-transition);
  }

  .music-item-container {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .music-item-img {
    width: 36px;
  }

  .delete-wrapper {
    padding: 28px;
    cursor: pointer;
    transition: var(--fade-transition);
  }

  .delete-wrapper svg {
    fill: var(--text-color);
    display: block;
    width: 20px;
  }

  .music-item > a:hover,
  .delete-wrapper:hover {
    background-color: var(--primary-color);
  }
`;
