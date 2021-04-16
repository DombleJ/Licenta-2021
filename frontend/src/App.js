import React from 'react'
import Navbar from './Components/Navbar'
import './App.css'
import Home from './Components/pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import AuthStudent from './Components/pages/AuthStudent'
import AuthProf from './Components/pages/AuthProf'
import QuizCreate from './Components/pages/QuizCreate'
import Courses from './Components/pages/Courses'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'
import CoursePage from './Components/pages/CoursePage'
import QuizPage from './Components/pages/QuizPage'
import Result from './Components/pages/Result'
import Answers from './Components/pages/Answers'
import CreateCoursePage from './Components/pages/CreateCoursePage'
import Quiz from './Components/pages/Quiz'

function App() {
  const { token, login, logout, userId, role } = useAuth()

  let routes
  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/courses/:title'>
          <CoursePage />
        </Route>
        <Route path='/courses'>
          <Courses />
        </Route>
        <Route path='/create/course'>
          <CreateCoursePage/>
        </Route>
        <Route
          path='/quiz/:id/result'
          render={(props) => <Result {...props} />}
        ></Route>
        <Route path='/quiz/:id'>
          <QuizPage />
        </Route>
        <Route path='/quiz'>
          <Quiz />
        </Route>
        <Route path='/create/quiz'>
          {role && <QuizCreate />}
          {!role && <Answers />}
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/auth/student' component={AuthStudent} />
        <Route path='/auth/professor' component={AuthProf} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        role: role,
      }}
    >
      <Router>
        <Navbar />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
