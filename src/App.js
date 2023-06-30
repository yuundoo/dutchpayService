import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateGruop } from './components/CreateGroup';
import { AddMembers } from './components/AddMembers';
import { ExpenseMain } from './components/ExpenseMain';
import { RecoilRoot } from 'recoil';
import { ROUTES } from './routes';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
   return (
      <BrowserRouter>
         <RecoilRoot>
            <Routes>
               <Route path="/" element={<Navigate to={ROUTES.CREATE_GROUP} />} />
               <Route path={ROUTES.CREATE_GROUP} element={<CreateGruop />} />
               <Route path={ROUTES.ADD_MEMBERS} element={<AddMembers />} />
               <Route path={ROUTES.EXPENSE_MAIN} element={<ExpenseMain />} />
            </Routes>
         </RecoilRoot>
      </BrowserRouter>
   );
};

export default App;
