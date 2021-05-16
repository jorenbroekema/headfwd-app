import { css } from 'lit';

export default css`
  .btn {
    background-color: var(--primary-color);
    color: var(--text-color);
    padding: 10px 20px;
    border-radius: 4px;
    border: none;
    transition: var(--fade-transition);
  }

  .btn:hover {
    background-color: var(--text-color);
    color: var(--secondary-color);
    transform: translateY(-3px);
  }
`;
