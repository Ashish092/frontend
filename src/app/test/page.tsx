// pages/test.tsx
import MainLayout from '@/components/layout/MainLayout';
import type { NextPage } from 'next';

const TestPage: NextPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center">Test Page</h1>
        <p className="text-xl text-center mt-4">
          This is a test page to check the footer duplication issue.
        </p>
      </div>
    </MainLayout>
  );
};

export default TestPage;
