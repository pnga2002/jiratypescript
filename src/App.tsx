import { Route, Routes, unstable_HistoryRouter as HistoryBrowser, } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import HomeTemplate from './templates/HomeTemplate';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreateProject from './pages/Project/CreateProject';
import Project from './pages/Project/Project';

export const history: any = createBrowserHistory()

export default function App() {
    return (
        <HistoryBrowser history={history}>
            <Routes>
                <Route path='' element={<HomeTemplate />}>
                    <Route index element={<Project/>}  />
                    <Route path='/login' element={<Login/>}  />
                    <Route path='/register' element={<Register/>}  />
                    <Route path='/createProject' element={<CreateProject/>}  />
                </Route>
                
                
            </Routes>
        </HistoryBrowser>
    )
}
