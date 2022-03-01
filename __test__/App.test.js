import React from 'react';
import { getByRole, render, screen, waitFor } from '@testing-library/react';
import App from '../client/App.jsx';

/**
 * @jest-environment jsdom
 */
describe("App Component", function () {
  it("should have hello world message", function () {
    let { getByText } = render(<App />);
    expect(getByText("App Component")).toMatchInlineSnapshot(`
      <div>
        App Component
      </div>
    `);
  });
});