import { Route, Routes } from 'react-router-dom';
import { ItemCategory2 } from './components/ItemCategory';
import Home from './Home';
import ItemManagement from './ItemManagement';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemManagement />} />
        <Route path="/items/category/:category" element={<ItemCategory2 />} />
      </Routes>
    </div>
  );
}
