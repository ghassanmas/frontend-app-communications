import React from 'react';

import BackToInstructor from './BackToInstructor';
import {
  initializeMockApp, render, screen,
} from '../../setupTest';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({
    courseId: 'test-course-id',
  })),
}));

describe('Testing BackToInstructor Component', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });

  test('Render without Public path', async () => {
    render(<BackToInstructor />);

    const linkEl = await screen.findByText('Back to Instructor Dashboard');
    expect(linkEl.href).toEqual('http://localhost:18000/courses/test-course-id/instructor#view-course-info');
  });

  test('Render with Public path', async () => {
    Object.defineProperty(window, 'location', {
      get() {
        return { pathname: '/communications/courses/test-course-id/bulk-email' };
      },
    });

    render(<BackToInstructor />);

    const linkEl = await screen.findByText('Back to Instructor Dashboard');
    expect(linkEl.href).toEqual('http://localhost:18000/courses/test-course-id/instructor#view-course-info');
    expect(window.location.pathname).toEqual('/communications/courses/test-course-id/bulk-email');
  });
});
