
import AppRoutes from '@/routes/AppRoutes';
import './App.css';

import LoadingScreen from '@/components/common/LoadingScreen';

function App() {
  return (
    <>
      <LoadingScreen />
      <AppRoutes />
    </>
  );
}

export default App;
