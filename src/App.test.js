import { render, screen } from '@testing-library/react';
import App from './App';
import { projects } from './assets/data/data';

// The hero canvas needs WebGL, which jsdom lacks; it falls back to hiding itself, so silence its warning.
beforeAll(() => { jest.spyOn(console, 'error').mockImplementation(() => {}); });
afterAll(() => { console.error.mockRestore(); });

test('renders the hero and every section', async () => {
  render(<App />);
  expect(await screen.findByRole('heading', { name: 'Vithursan Thiruvarooran' }, { timeout: 5000 })).toBeInTheDocument();
  for (const title of ['About', 'Experience', 'Projects', 'Contact']) {
    expect((await screen.findAllByText(title)).length).toBeGreaterThan(0);
  }
});

test('lists every project', async () => {
  render(<App />);
  for (const project of projects) {
    expect(await screen.findByRole('heading', { name: project.title }, { timeout: 5000 })).toBeInTheDocument();
  }
});
