import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateGruop } from './components/CreateGroup';
import { AddMemebers } from './components/AddMembers';
import { ExpenseMain } from './components/ExpenseMain';
import { RecoilRoot } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
   return (
      <BrowserRouter>
         <RecoilRoot>
            <Routes>
               <Route path="/" element={<CreateGruop />} />
               <Route path="/members" element={<AddMemebers />} />
               <Route path="/expense" element={<ExpenseMain />} />
            </Routes>
         </RecoilRoot>
      </BrowserRouter>
   );
};

export default App;
